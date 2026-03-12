import mongoose from "mongoose"
const mongoosePaginate = require("mongoose-paginate-v2")

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    registration: { type: String, required: true },
    facebook: { type: String, required: true },
    date: { type: Date, required: true },
    thumbnail_url: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "events",
  }
)

EventSchema.plugin(mongoosePaginate)

export default mongoose.models.Event || mongoose.model("Event", EventSchema)
