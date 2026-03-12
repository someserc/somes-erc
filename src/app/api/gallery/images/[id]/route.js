import Gallery from "@/models/Gallery";
import GalleryImage from "@/models/GalleryImage";
import { handleMultipleFileUpload } from "@/utils/handleMultipleFileUpload";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const gallery = await Gallery.findById(id).select("title");
    if (!gallery) {
      return res
        .status(404)
        .json({ status: "error", message: "Gallery not found" });
    }
    const galleryImages = await GalleryImage.find({ gallery_id: id }).exec();
    if (!galleryImages) {
      return new Response("Image not found", { status: 404 });
    }
    return NextResponse.json(
      {
        status: "success",
        data: {
          title: gallery.title,
          images: galleryImages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { id } = params;
  const { imageUrls } = await request.json();

  try {
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return new Response("Gallery not found", { status: 404 });
    }

    const newImages = imageUrls.map((url) => ({
      gallery_id: id,
      image_url: url,
    }));

    await GalleryImage.insertMany(newImages);

    return NextResponse.json(
      {
        status: "success",
        data: newImages,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving images:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { image_id } = await request.json();

  try {
    const galleryImage = await GalleryImage.findById(image_id);
    if (!galleryImage || galleryImage.gallery_id.toString() !== id) {
      return new Response("Image not found", { status: 404 });
    }

    await GalleryImage.findByIdAndDelete(image_id);

    return NextResponse.json(
      {
        status: "success",
        message: "Image deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
