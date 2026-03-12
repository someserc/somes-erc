import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const note = await Note.create(body);
    return Response.json({ success: true, data: note });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const courseType = searchParams.get("courseType");
    const semester = searchParams.get("semester");

    const filter = {};
    if (courseType) filter.courseType = courseType;
    if (semester) filter.semester = semester;

    const notes = await Note.find(filter).sort({ subject: 1 });

    return Response.json({ success: true, data: notes });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
