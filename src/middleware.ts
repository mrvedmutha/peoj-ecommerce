import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./types/enum/enumExports";
import { checkUserSession } from "./utils/sessionCheck";

export async function middleware(req: NextRequest) {
  const token = await checkUserSession();
  console.log("--------------" + "\n" + "Token in middleware:");
  console.log(token);
  const url = req.nextUrl;
  const urlPath = url.pathname;
  if (!token && urlPath !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token) {
    const userRole = token.user.role;
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
    } else if (userRole === Roles.CUSTOMER) {
      if (
        urlPath === "/login" ||
        urlPath === "/register" ||
        urlPath === "/admin/dashboard" ||
        urlPath === "/verify"
      ) {
        console.log("customer access");
        return NextResponse.redirect(new URL("/cx/dashboard", req.url));
      } else {
        return NextResponse.next();
      }
    }
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
