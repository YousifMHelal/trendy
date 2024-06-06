import connectToDb from "@/lib/db";
import { Category } from "@/models/CategoryModels";
import { NextResponse } from "next/server";

interface Params {
  slug: string;
}

export async function GET(req: any, { params }: { params: Params }) {
  const { slug } = params;

  try {
    await connectToDb();
    if (!slug) {
      return NextResponse.json(
        { message: "slug parameter is required." },
        { status: 400 }
      );
    }

    const category = await Category.findOne({ slug });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.error("Error fetching Category:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
