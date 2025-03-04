import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Roles } from "./types/enum/enumExports";
import * as jwt from "jsonwebtoken";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req: req, raw: true }).catch((err) => {
    console.error("Error fetching token in middleware: ", err);
  });
  console.log(`token in middleware ${token}`); //TODO remove
  const url = req.nextUrl;
  const urlPath = url.pathname;
  if (!token && urlPath !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token) {
    const decodedToken = jwt.decode(token) as { role: string };
    console.log("Decoded code in middleware: ");
    console.log(decodedToken);
    const userRole = decodedToken.role;
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
