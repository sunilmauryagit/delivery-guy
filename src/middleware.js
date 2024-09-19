import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";
  const isPrivatePath = path === "/admin/:path*";
  const token = request.cookies.get("_token")?.value || "";

  if (isPrivatePath && (!token || token === "")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPublicPath && (token || token !== "")) {
    return NextResponse.redirect(new URL("/my-account", request.nextUrl));
  }
  if (!isPublicPath && (!token || token === "")) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Matching Paths
export const config = {
  matcher: [
    "/my-account",
    "/my-account/:path*",
    "/login",
    "/signup",
    "/orders",
    "/admin/:path*",
  ],
};
