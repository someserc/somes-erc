import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET(_, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return Response.json(
        { success: false, error: "Not Found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true, data: testimonial });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const formData = await req.formData();
    console.log(id);
    console.log(formData);

    // Build update object
    const updatedData = {
      name: formData.get("name"),
      post: formData.get("post"),
      facebook: formData.get("facebook"),
      content: formData.get("content"),
    };

    const newImage = formData.get("image");

    // Only include image if it's present (non-empty string)
    if (newImage && newImage.trim() !== "") {
      updatedData.image = newImage;
    }

    const updated = await Testimonial.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return Response.json(
        { success: false, error: "Not Found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: updated });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json(
        { success: false, error: "Not Found" },
        { status: 404 }
      );
    }
    return Response.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
