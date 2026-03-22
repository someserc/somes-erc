import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import GalleryImage from "@/models/GalleryImage";

export async function GET() {
  await dbConnect();

  try {
    const galleries = await Gallery.find().populate("event_id").lean();

    const galleryIds = galleries.map((g) => g._id);

    const galleryImages = await GalleryImage.find({
      gallery_id: { $in: galleryIds },
    }).lean();

    const result = galleries.map((gallery) => ({
      ...gallery,
      images: galleryImages.filter(
        (img) => img.gallery_id.toString() === gallery._id.toString(),
      ),
    }));

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    if (!body.title || !body.thumbnail_url) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    const newGallery = new Gallery({
      title: body.title,
      event_id: body.event_id || undefined,
      thumbnail_url: body.thumbnail_url,
      drive_link: body.drive_link || "",
    });

    const savedGallery = await newGallery.save();

    return new Response(JSON.stringify(savedGallery), { status: 201 });
  } catch (error) {
    console.error("Error creating gallery:", error);

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
