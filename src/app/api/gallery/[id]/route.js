import Gallery from "@/models/Gallery";
import GalleryImage from "@/models/GalleryImage";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const gallery = await Gallery.findById(id).populate("event_id").exec();
    if (!gallery) {
      return new Response(JSON.stringify({ error: "Gallery not found" }), {
        status: 404,
      });
    }

    // Fetch images associated with the gallery
    const galleryImages = await GalleryImage.find({ gallery_id: id }).exec();

    // Add images to the gallery object
    const result = {
      ...gallery._doc,
      images: galleryImages,
    };
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// export async function PUT(req, { params }) {
//   const { id } = await params;
//   const { title, description, images } = await req.json();

//   try {
//     const gallery = await Gallery.findById(id).exec();
//     if (!gallery) {
//       return NextResponse.json(
//         { message: "Gallery not found" },
//         { status: 404 }
//       );
//     }

//     // Update gallery details
//     gallery.title = title || gallery.title;
//     gallery.description = description || gallery.description;
//     await gallery.save();

//     // Update gallery images
//     if (images && images.length > 0) {
//       await GalleryImage.deleteMany({ gallery_id: id }).exec();
//       const newImages = images.map((image) => ({ ...image, gallery_id: id }));
//       await GalleryImage.insertMany(newImages);
//     }

//     const updatedGallery = await Gallery.findById(id)
//       .populate("event_id")
//       .exec();
//     const updatedImages = await GalleryImage.find({ gallery_id: id }).exec();

//     const result = {
//       ...updatedGallery._doc,
//       images: updatedImages,
//     };

//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req, { params }) {
  const { id } = await params;
  const { title } = await req.json();

  try {
    const gallery = await Gallery.findById(id).exec();
    if (!gallery) {
      return NextResponse.json(
        { message: "Gallery not found" },
        { status: 404 }
      );
    }

    // Update gallery title
    gallery.title = title || gallery.title;
    await gallery.save();

    const updatedGallery = await Gallery.findById(id).populate("event_id").exec();
    const galleryImages = await GalleryImage.find({ gallery_id: id }).exec();

    const result = {
      ...updatedGallery._doc,
      images: galleryImages,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const deleted = await Gallery.findByIdAndDelete(id).exec();
    if (!deleted) {
      return NextResponse.json(
        { message: "Gallery not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Gallery deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
