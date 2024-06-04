import connectToDb from "@/lib/db";
import { Product } from "@/models/ProductModels";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const { title, description, price, quantity, images, category } =
      await req.json();
    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-");

    await connectToDb();

    const isProductExist = await Product.findOne({ slug });

    if (isProductExist) {
      return new Response(
        JSON.stringify({
          message: "This Product is already exited.",
        }),
        { status: 409 } // Conflict
      );
    }
    const newProduct = new Product({
      title,
      description,
      price,
      quantity,
      images,
      category,
      slug,
    });

    await newProduct.save();
    return new NextResponse(JSON.stringify(newProduct), { status: 201 });
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
    const products = await Product.find();

    if (!products.length) {
      return new NextResponse(
        JSON.stringify({ message: "No products found." }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.error("Error fetching products:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error." }),
      { status: 500 }
    );
  }
};
