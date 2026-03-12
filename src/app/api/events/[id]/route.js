import { NextRequest, NextResponse } from "next/server";
import Notice from "@/models/Notice"; // Your Notice model
import handleSingleFileUpload from "@/utils/handleSingleFileUpload"; // File upload utility
import dbConnect from "@/lib/mongodb"; // Connect to MongoDB
import Event from "@/models/Event";

// Connect to the database
dbConnect();

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({
        success: false,
        message: "Event not found",
      });
    }
    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching event",
      error: error.message,
    });
  }
};

export const PUT = async (req, { params }) => {
  const { id } = params;
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = body.image || null;

    let updatedData = { ...body };

    const existingEvent = await Event.findById(id);
    if (!existingEvent) {
      return NextResponse.json({
        success: false,
        message: "Event not found",
      });
    }

    // Handle file upload if a new file is provided
    if (file) {
      const imageUrl = await handleSingleFileUpload(file, "events");
      updatedData.image = imageUrl; // Update the image field with the new file's URL
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on updated fields
    });

    if (!updatedEvent) {
      return NextResponse.json({
        success: false,
        message: "Event not found or could not be updated",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
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
  const { id } = params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return NextResponse.json({
        success: false,
        message: "Event not found or could not be deleted",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({
      success: false,
      message: "Error deleting notice",
      error: error.message,
    });
  }
};
