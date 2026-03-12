import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Bloodgroup from "@/models/Bloodgroup";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const entry = await Bloodgroup.findById(id);
    if (!entry)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;
  const body = await req.json();
  try {
    const updatedEntry = await Bloodgroup.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEntry)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(updatedEntry);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;
  try {
    const deleted = await Bloodgroup.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
