import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import handleSingleFileUpload from "@/utils/handleSingleFileUpload";

// Handle GET request for fetching projects
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 6;

  try {
    let allProjects;

    if (page === "all") {
      allProjects = await Project.find().sort({ createdAt: -1 });
      return NextResponse.json(allProjects, { status: 200 });
    } else {
      allProjects = await Project.paginate(
        {},
        {
          page: parseInt(page),
          limit: parseInt(limit),
          sort: { createdAt: -1 },
        }
      );
      return NextResponse.json(allProjects, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    console.log(body);
    const newProject = new Project({
      title: body.title,
      category: body.category || "no category",

      file: body.content,
    });
    console.log(newProject);

    await newProject.save();

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({
      success: false,
      message: "Error creating project",
      error: error.message,
    });
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message: "Project ID is required",
        },
        { status: 400 }
      );
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
