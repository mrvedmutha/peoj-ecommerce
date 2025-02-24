import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import { userService } from "@/service/auth/userService";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const body = await request.json();
    const { username, fullname, email, password, confirmPassword, role } = body;
    if (!request.body) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Request body is missing",
      });
    }
    console.log(body); //TODO Remove
    if (token !== process.env.URL_TOKEN) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Invalid token",
      });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Password and confirm password do not match",
      });
    }
    const findUser = await userService.getUserbyUsername(username);
    if (findUser) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "User already exists",
      });
    }
    if (password.length < 8) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    if (
      !username ||
      !fullname ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return NextResponse.json({
        status: 401,
        success: false,
        message: "All fields are required",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(
      username,
      fullname,
      email,
      hashedPassword,
      role
    );
    return NextResponse.json({
      status: 200,
      success: true,
      message: "User created successfully",
      //user: user, //TODO Remove
    });
  } catch (e) {
    console.error("error creating user", e);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Database connection failed",
    });
  }
}
