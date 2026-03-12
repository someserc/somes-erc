import dbConnect from "@/lib/mongodb";

import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import Committee from "@/models/Committee";
import handleSingleFileUpload from "@/utils/handleSingleFileUpload";

// Named export for GET method
export async function GET(req, res) {
  await dbConnect();
  try {
    const committee = await Committee.find(); // Fetch all notices from DB
    return new Response(JSON.stringify(committee), { status: 200 }); // Return all notices as JSON with status
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching committee" }), {
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
    const file = formData.get("photo"); // Get the file from formData
    const body = Object.fromEntries(formData.entries());
    // console.log(file);

    // const file = body.photo || null

    const photoUrl = formData.get("photo"); // this is a URL string
    // console.log(photoUrl);

    const newCommittee = new Committee({
      name: body.name,
      position: body.position,
      facebook: body.facebook,
      phone: body.phone,
      photo: photoUrl, // save the URL directly
    });
    handleSingleFileUpload;
    // let fileUrl = null;

    // if (file && file.name) {
    //   fileUrl = await handleSingleFileUpload(file, "committee");
    // }

    // const newCommittee = new Committee({
    //   name: body.name,
    //   position: body.position,
    //   facebook: body.facebook,
    //   photo: fileUrl, // Use the uploaded file URL
    // });

    // Save the notice to the database
    await newCommittee.save();

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Committee member created successfully",
      data: newCommittee,
    });
  } catch (error) {
    console.error("Error creating Committee member:", error);
    return NextResponse.json({
      success: false,
      message: "Error creating Committee member",
      error: error.message,
    });
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Committee member ID is required" },
        { status: 400 }
      );
    }

    const committeeMember = await Committee.findById(id);

    if (!committeeMember) {
      return NextResponse.json(
        { success: false, message: "Committee member not found" },
        { status: 404 }
      );
    }

    // Delete the photo file from storage if it exists
    if (committeeMember.photo) {
      const filePath = path.join(
        process.cwd(),
        "public",
        committeeMember.photo
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Committee.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Committee member deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting committee member:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting committee member",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function PUT(req) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const id = formData.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Committee member ID is required" },
        { status: 400 }
      );
    }

    const committeeMember = await Committee.findById(id);
    if (!committeeMember) {
      return NextResponse.json(
        { success: false, message: "Committee member not found" },
        { status: 404 }
      );
    }

    const updatedFields = {
      name: formData.get("name"),
      position: formData.get("position"),
      facebook: formData.get("facebook"),
      phone: formData.get("phone"),
    };

    const newPhoto = formData.get("photo");

    // Check if a new photo is provided
    if (typeof newPhoto === "object" && newPhoto?.name) {
      // Delete the old photo if it exists
      if (committeeMember.photo) {
        const oldPhotoPath = path.join(
          process.cwd(),
          "public",
          committeeMember.photo
        );
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }

      // Upload new photo
      const uploadedPhotoPath = await handleSingleFileUpload(
        newPhoto,
        "committee"
      );
      updatedFields.photo = uploadedPhotoPath;
    } else if (typeof newPhoto === "string") {
      // If it's just a string URL and not a file object
      updatedFields.photo = newPhoto;
    }

    // Update the document
    const updatedCommittee = await Committee.findByIdAndUpdate(
      id,
      updatedFields,
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Committee member updated successfully",
      data: updatedCommittee,
    });
  } catch (error) {
    console.error("Error updating committee member:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating committee member",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
