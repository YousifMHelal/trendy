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

export const GET = async (req: any) => {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const min = parseInt(searchParams.get("min") || "0");
  const max = parseInt(searchParams.get("max") || "0");

  console.log("api: " + category, page, min, max);

  const PRODUCTS_PER_PAGE = 24;

  try {
    await connectToDb();

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (min !== undefined && min >= 0) {
      query.price = { ...query.price, $gte: min };
    }

    if (max !== undefined && max > 0) {
      query.price = { ...query.price, $lte: max };
    }

    const products = await Product.find(query)
      .skip(PRODUCTS_PER_PAGE * (page - 1))
      .limit(PRODUCTS_PER_PAGE);

    const count = await Product.countDocuments(query);

    if (!products.length) {
      return new NextResponse(
        JSON.stringify({ message: "No products found." }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ products, count }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error." }),
      { status: 500 }
    );
  }
};
