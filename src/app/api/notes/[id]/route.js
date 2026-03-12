import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updated = await Note.findByIdAndUpdate(id, body, {
      new: true,
    });

    return Response.json({ success: true, data: updated });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Note.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
