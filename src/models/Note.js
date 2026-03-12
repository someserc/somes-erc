import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    courseType: {
      type: String,
      enum: ["New Course", "Old Course"],
      required: true,
    },
    semester: {
      type: String,
      required: true, // e.g. "Semester 1"
    },
    subject: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    pdfs: [
      {
        title: String,
        url: String,
      },
    ],
    youtubeLinks: [
      {
        title: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
