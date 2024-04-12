import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema(
  {
    catagory_name: {
      type: String,
      required: true,
    },
    parentCatagory: {
      type: mongoose.Types.ObjectId,
      ref: "catagory",
    },
    properties: {
      type: [{ type: Object }],
    },
  },
  { timestamps: true }
);

const catagory =
  mongoose.models.catagory || mongoose.model("catagory", catagorySchema);
export default catagory;
