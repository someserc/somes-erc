import mongoose from "mongoose";
const mongoosePaginate = require("mongoose-paginate-v2");

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "notices",
  }
);
NoticeSchema.plugin(mongoosePaginate);
export default mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
