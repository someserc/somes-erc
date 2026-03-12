import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

/* PUT: update faculty member */
export async function PUT(req, { params }) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const updated = await Faculty.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

/* DELETE: remove faculty member */
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const deleted = await Faculty.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
