import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { userService } from "@/service/userService";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { successResponse, errorResponse } from "@/utils/jsonResponse";
import { Roles } from "@/types/enum/enumUser";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  try {
    const body = await request.json();
    const { username, fullname, email, password, role } = body;
    if (session) {
      const createdBy = session.user.fullname;
      const sessionRole = session.user.role;
      if (!username || !fullname || !email || !password || !role) {
        return errorResponse("All fields are required", 403);
      }
      if (
        sessionRole === Roles.CUSTOMER ||
        sessionRole === Roles.EDITOR ||
        sessionRole === Roles.INVENTORY ||
        sessionRole === Roles.MARKETER
      ) {
        return errorResponse("Unauthorized!", 403);
      }
      if (role === Roles.SUPERADMIN && sessionRole === Roles.ADMIN) {
        return errorResponse("Only Superadmin can create Superadmin!", 403);
      }
      const getUsername = await userService.getUserbyUsername(username);
      const getEmail = await userService.getUserbyEmail(email);
      if (getUsername) {
        return errorResponse("Username already exists", 409);
      }
      if (getEmail) {
        return errorResponse("Email already exists", 409);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await userService.createUser(
        username,
        fullname,
        email,
        hashedPassword,
        role,
        createdBy
      );
      return successResponse("User created successfully", 201);
    }
  } catch (e) {
    return errorResponse("Error creating user", 500, e);
  }
}
