import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  const isPath = pathname === "/login" || pathname === "/signup";
  const token = req.cookies.get("token");
  if (isPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup"],
};
