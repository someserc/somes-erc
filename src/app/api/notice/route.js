import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { NextResponse } from "next/server";

// Named export for GET method
export async function GET(req, res) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 6;
  try {
    let allNotices;

    if (page === "all") {
      allNotices = await Notice.find().sort({ createdAt: -1 });
      return NextResponse.json(allNotices, { status: 200 });
    } else {
      allNotices = await Notice.paginate(
        {},
        {
          page: parseInt(page),
          limit: parseInt(limit),
          sort: { createdAt: -1 },
        }
      );
      return NextResponse.json(allNotices, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// Named export for POST method
export async function POST(req, res) {
  await dbConnect();
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    const newNotice = new Notice({
      title: body.title,
      description: body.description || "",
      image: body.image, // Set to null if no file was uploaded
    });

    // Save the notice to the database
    await newNotice.save();

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Notice created successfully",
      data: newNotice,
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    return NextResponse.json({
      success: false,
      message: "Error creating notice",
      error: error.message,
    });
  }
}
