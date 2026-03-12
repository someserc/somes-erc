import dbConnect from "@/lib/mongodb";
import LeadershipMessage from "@/models/LeadershipMessage";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    const message = await LeadershipMessage.create(body);

    return Response.json({ success: true, data: message });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const messages = await LeadershipMessage.find().sort({
      createdAt: -1,
    });

    return Response.json({ success: true, data: messages });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
