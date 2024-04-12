import mongoose from "mongoose";
import catagory from "./CatagoryModel";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    catagory: {
      type: mongoose.Types.ObjectId,
      ref: catagory,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const product =
  mongoose?.models?.product || mongoose.model("product", productSchema);
export default product;
