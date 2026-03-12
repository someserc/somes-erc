import dbConnect from "@/lib/mongodb";
import LeadershipMessage from "@/models/LeadershipMessage";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    const updated = await LeadershipMessage.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    const deleted = await LeadershipMessage.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
