import mongoose from "mongoose";

interface Icategrey {
  name: string;
  slug: string;
  image: string;
}

const categorySchema = new mongoose.Schema<Icategrey>(
  {
    name: { type: "string", required: true},
    slug: { type: "string", required: true, unique: true},
    image: { type: "string", required: false },
  },
  {
    timestamps: true,
  }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<Icategrey>("Category", categorySchema);
