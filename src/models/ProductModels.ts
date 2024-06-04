import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  slug: string;
  images: { type: string }[];
  category?: mongoose.Schema.Types.ObjectId;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    slug: { type: String, required: true, unique: true },
    images: [{ type: String, required: false }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
