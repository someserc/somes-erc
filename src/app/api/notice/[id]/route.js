import { NextRequest, NextResponse } from "next/server";
import Notice from "@/models/Notice"; // Your Notice model
import handleSingleFileUpload from "@/utils/handleSingleFileUpload"; // File upload utility
import dbConnect from "@/lib/mongodb"; // Connect to MongoDB

// Connect to the database
dbConnect();

export const GET = async (req, { params }) => {
  const { id } = await params;
  try {
    const notice = await Notice.findById(id);
    if (!notice) {
      return NextResponse.json({
        success: false,
        message: "Notice not found",
      });
    }
    return NextResponse.json({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.error("Error fetching notice:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching notice",
      error: error.message,
    });
  }
};

export const PUT = async (req, { params }) => {
  const { id } = await params;

  try {
    const formData = await req.formData();
    const file = formData.get("image"); // Get file or text

    // Extract other fields manually
    const title = formData.get("title");
    const description = formData.get("content");

    let updatedData = {
      title,
      description,
    };

    const existingNotice = await Notice.findById(id);
    if (!existingNotice) {
      return NextResponse.json({
        success: false,
        message: "Notice not found",
      });
    }

    // Only upload a new image if file is of type File (not string)
    if (file && typeof file === "object" && file instanceof Blob) {
      const imageUrl = await handleSingleFileUpload(file, "notices");
      updatedData.image = imageUrl;
    }

    const updatedNotice = await Notice.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Notice updated successfully",
      data: updatedNotice,
    });
  } catch (error) {
    console.error("Error updating notice:", error);
    return NextResponse.json({
      success: false,
      message: "Error updating notice",
      error: error.message,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = await params;
  try {
    const deletedNotice = await Notice.findByIdAndDelete(id);
    if (!deletedNotice) {
      return NextResponse.json({
        success: false,
        message: "Notice not found or could not be deleted",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting notice:", error);
    return NextResponse.json({
      success: false,
      message: "Error deleting notice",
      error: error.message,
    });
  }
};
