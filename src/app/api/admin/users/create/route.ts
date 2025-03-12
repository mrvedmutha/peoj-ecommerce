import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { userService } from "@/service/userService";
import bcrypt from "bcryptjs";
import { checkUserSession } from "@/utils/sessionCheck";
import { successResponse, errorResponse } from "@/utils/jsonResponse";
import { Roles } from "@/types/enum/enumExports";
import { error } from "console";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const session = await checkUserSession();
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  try {
    const body = await request.json();
    const { username, name, email, password, role } = body;
    const sessionUser = session.user;
    if (!username || !name || !email || !password || !role) {
      return errorResponse("All fields are required", 403);
    }
    if (!Object.values(Roles).includes(role)) {
      return errorResponse("Invalid role", 403);
    }
    if (
      sessionUser.role !== Roles.SUPERADMIN &&
      sessionUser.role !== Roles.ADMIN
    ) {
      return errorResponse("Access Denied! You are not authorized.", 403);
    }
    if (role === Roles.SUPERADMIN && sessionUser.role === Roles.ADMIN) {
      return errorResponse("Access Denied! You are not authorized.", 403);
    }
    const getUsername = await userService.getUserbyUsername(username);
    const getEmail = await userService.getUserbyEmail(email);
    if (getUsername) {
      return errorResponse("Username already exists", 409);
    }
    if (getEmail) {
      return errorResponse("Email already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    await userService.createUser(
      username,
      name,
      email,
      hashedPassword,
      role,
      sessionUser.name,
      new Date()
    );
    return successResponse("User created successfully", 201);
  } catch (e) {
    return errorResponse("Error creating user", 500, e);
  }
}
