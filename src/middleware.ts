import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function middleware(req: NextRequest) {
  console.log("All Cookies in Middleware:", req.cookies.getAll());

  //   const token = await getToken({ req, raw: true });
  //   console.log("Token in middleware:", token);

  console.log(
    "Token in middleware: ",
    await getToken({ req, secureCookie: true })
  );
  //   if (!token) {
  //     console.log("No token found, redirecting to login.");
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard", "/cx/dashboard", "/register", "/verify"],
};
