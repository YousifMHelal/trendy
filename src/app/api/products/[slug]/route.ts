import connectToDb from "@/lib/db";
import { Product } from "@/models/ProductModels";
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

    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { message: "product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("Error fetching product:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any, { params }: { params: Params }) {
  const { slug } = params;

  try {
    await connectToDb();

    if (!slug) {
      return NextResponse.json(
        { message: "slug parameter is required." },
        { status: 400 }
      );
    }

    const product = await Product.findOneAndDelete({ slug });

    if (!product) {
      return NextResponse.json(
        { message: "product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting product:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
