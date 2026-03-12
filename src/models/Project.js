const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

projectSchema.plugin(mongoosePaginate);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
