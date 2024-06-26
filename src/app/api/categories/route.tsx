import connectToDb from "@/lib/db";
import { Category } from "@/models/CategoryModels";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const { name, image } = await req.json();

    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    await connectToDb();

    const isCategoryExist = await Category.findOne({ slug });

    if (isCategoryExist) {
      return new Response(
        JSON.stringify({
          message: "This Category is already exited.",
        }),
        { status: 409 } // Conflict
      );
    }

    const newCategory = new Category({
      name,
      slug,
      image,
    });

    await newCategory.save();
    return new NextResponse(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error." }),
      {
        status: 500,
      }
    );
  }
};

export const GET = async () => {
  try {
    await connectToDb();
    const categories = await Category.find();

    if (!categories) {
      return new NextResponse(
        JSON.stringify({ message: "No categories found." }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error." }),
      {
        status: 500,
      }
    );
  }
};
