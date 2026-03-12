import mongoose, { Schema, models } from "mongoose";

const FacultySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    post: {
      type: String,
      required: true, // HOD, Deputy HOD, Lecturer, Coordinator, etc.
    },

    qualification: {
      type: String,
      required: true, // Professor, Associate Professor, etc.
    },

    image: {
      type: String,
      required: true, // ImageKit URL
    },

    phone: { type: String, required: true, trim: true },

    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Faculty || mongoose.model("Faculty", FacultySchema);
