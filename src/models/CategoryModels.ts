import mongoose from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: Date;
}

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: { type: "string", required: true },
    slug: { type: "string", required: true, unique: true },
    image: { type: "string", required: false },
  },
  {
    timestamps: true,
  }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", categorySchema);
