import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

const publicApiRoutes = ["/api/admin/login"];

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  let token = req.cookies.get("token")?.value;

  if (!token && req.headers.get("authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("authorization")?.replace("Bearer ", "");
  }

  // ✅ Prevent logged-in users from accessing login page
  if (pathname === "/login" && token) {
    try {
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL("/admin", req.url));
    } catch {
      // invalid token → allow login page
    }
  }

  const protectedPaths = ["/admin", "/api"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Allow public APIs
  if (publicApiRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow public GET APIs
  if (pathname.startsWith("/api") && method === "GET") {
    return NextResponse.next();
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
  } catch {
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
  matcher: ["/admin/:path*", "/api/:path*", "/login"], // include login
};
