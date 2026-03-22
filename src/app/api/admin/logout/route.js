import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 },
  );

  // Clear the cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
