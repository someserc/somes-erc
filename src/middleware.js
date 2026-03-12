import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

const publicApiRoutes = ["/api/admin/login", "/api/admin/register"]; // Add more public API routes here

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  const protectedPaths = ["/admin", "/api"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  // ✅ Allow unauthenticated access to public API routes
  if (publicApiRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Allow unauthenticated GET requests to /api/*
  if (pathname.startsWith("/api") && method === "GET") {
    return NextResponse.next();
  }

  let token = req.cookies.get("token")?.value;

  if (!token && req.headers.get("authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("authorization")?.replace("Bearer ", "");
  }

  if (!token) {
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ message: "Invalid token" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
