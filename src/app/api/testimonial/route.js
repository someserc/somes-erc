import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const testimonial = await Testimonial.create(body);
    return Response.json({ success: true, data: testimonial });
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
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return Response.json({ success: true, data: testimonials });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
