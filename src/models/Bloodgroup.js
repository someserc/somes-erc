import mongoose, { Schema } from "mongoose";

const BloodGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this entry."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  bloodgroup: {
    type: String,
    required: [true, "Please specify the blood group."],
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  address: {
    type: String,
    required: [true, "Please provide an address."],
    maxlength: [200, "Address cannot be more than 200 characters"],
  },
  contactNo: {
    type: String,
    required: [true, "Please provide a contact number."],
    maxlength: [20, "Contact number cannot be more than 20 characters"],
  },
});
export default mongoose.models.Bloodgroup ||
  mongoose.model("Bloodgroup", BloodGroupSchema);
