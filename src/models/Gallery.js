const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new mongoose.Schema(
  {
    title: String,
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    description: { type: String, default: "" },
    thumbnail_url: String,
    drive_link: String, // ✅ NEW
  },
  { timestamps: true },
);

// gallerySchema.index({ event_id: 1 });

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", gallerySchema);
