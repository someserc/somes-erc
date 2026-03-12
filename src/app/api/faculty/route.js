import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

export async function GET() {
  await connectToDatabase();
  const faculty = await Faculty.find().sort({ order: 1 });
  return NextResponse.json({ success: true, data: faculty });
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, post, qualification, image, phone, order } = body;

    if (!name || !post || !qualification || !image || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newFaculty = await Faculty.create({
      name,
      post,
      qualification,
      image,
      phone,
      order,
    });

    return NextResponse.json({ success: true, data: newFaculty });
  } catch {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
