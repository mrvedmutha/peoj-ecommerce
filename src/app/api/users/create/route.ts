import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { userService } from "@/service/userService";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const { username, fullname, email, password, role, createdBy } = body;
    const getUserRole = await userService.getUserbyRole(role);
    const getUsername = await userService.getUserbyUsername(username);

    if (getUserRole && role == "superadmin") {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Super admin is already created",
      });
    }
    if (!username || !fullname || !email || !password || !role || !createdBy) {
      return NextResponse.json({
        status: 403,
        success: false,
        message: "All fields are required",
      });
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
    return NextResponse.json({
      status: 200,
      success: true,
      message: "User created successfully",
    });
  } catch (e) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong",
      error: e,
    });
  }
}
