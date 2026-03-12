import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import GalleryImage from "@/models/GalleryImage";

export async function GET(req, res) {
  await dbConnect();
  try {
    const galleries = await Gallery.find().populate("event_id").exec();
    const galleryImages = await GalleryImage.find().exec();

    const result = galleries?.map((gallery) => {
      return {
        ...gallery._doc,
        images: galleryImages?.filter(
          (image) => image.gallery_id.toString() === gallery._id.toString()
        ),
      };
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req, res) {
  await dbConnect();
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    console.log(body);
    if (!body.title || !body.thumbnail_url) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    let newGallery;
    if (body.event_id) {
      newGallery = new Gallery({
        title: body.title,
        // description: body.description,
        event_id: body.event_id,
        thumbnail_url: body.thumbnail_url,
      });
    } else {
      newGallery = new Gallery({
        title: body.title,
        // description: body.description,
        thumbnail_url: body.thumbnail_url,
      });
    }
    const savedGallery = await newGallery.save();

    return new Response(JSON.stringify(savedGallery), { status: 201 });
  } catch (error) {
    console.error("Error creating gallery:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
