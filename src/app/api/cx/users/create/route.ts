import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { cxService } from "@/service/cxService";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "@/utils/jsonResponse";
import { Roles } from "@/types/enum/enumExports";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const { username, name, email, password } = body;
    if (!username || !name || !email || !password) {
      return errorResponse("All fields are required", 403);
    }
    const userEmail = await cxService.getCxUserByEmail(email);
    const usernameExist = await cxService.getCxUserByUsername(username);
    if (usernameExist) {
      return errorResponse("Username already exists", 409);
    }
    if (userEmail) {
      return errorResponse("Email already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await cxService.createCxUser(
      username,
      name,
      email,
      hashedPassword,
      Roles.CUSTOMER
    );
    return successResponse("User registered successfully", 200);
  } catch (e) {
    return errorResponse("Error registering user", 500, e);
  }
}
