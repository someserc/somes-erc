const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
