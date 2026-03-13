import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

  return new Response(JSON.stringify({ message: "Login successful", token }), {
    status: 200,
  });
}
