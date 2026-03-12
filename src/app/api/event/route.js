import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import handleSingleFileUpload from "@/utils/handleSingleFileUpload";

// Create Event
export async function POST(req) {
  await dbConnect();
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const registration = formData.get("registration");
    const facebook = formData.get("facebook");
    const event_date = formData.get("event_date");
    const fileUrl = formData.get("thumbnail_url");

    if (
      !title ||
      !content ||
      !registration ||
      !facebook ||
      !event_date ||
      !fileUrl
    ) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "All fields (title, content, registration, facebook, event_date) are required",
        },
        { status: 400 }
      );
    }

    const newEvent = new Event({
      title,
      content,
      registration,
      facebook,
      date: event_date,
      thumbnail_url: fileUrl,
    });

    const savedEvent = await newEvent.save();

    return NextResponse.json(
      { status: "success", data: savedEvent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

// Get All Events
export async function GET() {
  await dbConnect();
  try {
    const events = await Event.find();
    return NextResponse.json(
      { status: "success", data: events },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

// Update Event by ID
export async function PATCH(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const formData = await req.formData();
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json(
        { status: "error", message: "Event not found" },
        { status: 404 }
      );
    }

    const updateData = {
      title: formData.get("title") || event.title,
      content: formData.get("content") || event.content,
      registration: formData.get("registration") || event.registration,
      facebook: formData.get("facebook") || event.facebook,
      date: formData.get("event_date") || event.date,
    };

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return NextResponse.json(
        { status: "error", message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Event updated successfully",
        data: updatedEvent,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}

// Delete Event by ID
export async function DELETE(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json(
        { status: "error", message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Event deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
