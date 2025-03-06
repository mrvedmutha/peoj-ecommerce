import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { Roles } from "./types/enum/enumExports";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  console.log("Token in middleware:");
  console.log(token);

  if (!token) {
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    "/admin/dashboard",
    "/cx/dashboard",
    "/login",
    "/register",
    "/verify",
  ],
};
