import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(
      JSON.stringify({ error: "Database connection failed" }),
      {
        status: 500,
      },
    );
  }
  const { username, password } = await req.json();

  const admin = await Admin.findOne({ username });
  if (!admin) {
    return new Response(JSON.stringify({ error: "Admin not found" }), {
      status: 404,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.NEXTAUTH_SECRET,
    {
      expiresIn: "2h",
    },
  );

  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 },
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return response;
}
