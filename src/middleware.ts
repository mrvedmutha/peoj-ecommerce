import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Roles } from "../src/types/enum/enumExports";
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const url = req.nextUrl;
  const urlPath = url.pathname;
  if (!token && urlPath !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token) {
    const userRole = token.role;
    if (
      userRole === Roles.SUPERADMIN ||
      userRole === Roles.ADMIN ||
      userRole === Roles.EDITOR ||
      userRole === Roles.INVENTORY ||
      userRole === Roles.MARKETER
    ) {
      if (
        urlPath === "/login" ||
        urlPath === "/register" ||
        urlPath === "/cx/dashboard" ||
        urlPath === "/verify"
      ) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }
    if (userRole === Roles.CUSTOMER) {
      if (
        urlPath === "/login" ||
        urlPath === "/admin/dashboard" ||
        urlPath === "/register"
      ) {
        return NextResponse.redirect(new URL("/cx/dashboard", req.url));
      }
    }
    if (token.isVerified === false) {
      return NextResponse.redirect(new URL("/verify", req.url));
    }
  } else {
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
