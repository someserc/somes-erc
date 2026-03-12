import mongoose, { Schema } from "mongoose";

const committeeSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    // registration: { type: String, required: true },
    facebook: { type: String },
    phone: { type: String, required: true },
    // date: { type: Date, required: true },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Committee ||
  mongoose.model("Committee", committeeSchema);
