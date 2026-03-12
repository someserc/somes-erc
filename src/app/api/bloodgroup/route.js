import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bloodgroup from "@/models/Bloodgroup";

export async function GET() {
  await dbConnect();
  const data = await Bloodgroup.find();
  return NextResponse.json(data);
}

export async function POST(req) {
  await dbConnect();

  try {
    const { name, bloodgroup, address, contactNo } = await req.json();

    const newEntry = new Bloodgroup({ name, bloodgroup, address, contactNo });
    await newEntry.save();
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
