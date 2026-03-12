import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDatabase();
  const { username, password } = await req.json();

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return new Response(JSON.stringify({ error: "Admin already exists" }), {
      status: 400,
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const admin = await Admin.create({ username, password: hashedPassword });
  return new Response(
    JSON.stringify({ message: "Admin created successfully", admin }),
    { status: 201 }
  );
}
