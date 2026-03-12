import mongoose from "mongoose";

const LeadershipMessageSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.LeadershipMessage ||
  mongoose.model("LeadershipMessage", LeadershipMessageSchema);
