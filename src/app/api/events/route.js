import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { createRouter } from "next-connect"; // Correct import for ESM
import multer from "multer";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import handleSingleFileUpload from "@/utils/handleSingleFileUpload";
import Event from "@/models/Event";

// Initialize next-connect handler using createRouter
const handler = createRouter();

// Connect to the database
handler.use(async (req, res, next) => {
  await dbConnect();
  console.log("db connected");
  next();
});

// Set up multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/events"); // Store files in 'public/uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Named export for GET method
export async function GET(req, res) {
  await dbConnect();
  try {
    const events = await Event.find(); // Fetch all notices from DB
    return new Response(JSON.stringify(events), { status: 200 }); // Return all notices as JSON with status
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching events" }), {
      status: 500,
    });
  }
}

// Named export for POST method
export async function POST(req, res) {
  await dbConnect();
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    console.log("Form data inside here:", formData);
    const body = Object.fromEntries(formData);
    const file = body.image || null;

    const fileUrl = await handleSingleFileUpload(file, "events");

    const newEvent = new Event({
      title: body.title,
      description: body.description,
      image: fileUrl || null, // Set to null if no file was uploaded
    });

    // Save the notice to the database
    await newEvent.save();

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
}
