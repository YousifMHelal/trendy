import { IProduct } from "@/components/ProductCard";
import connectToDb from "@/lib/db";
import { IOrderBuyer, IOrderProduct, OrderModels } from "@/models/OrderModels";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const { totalAmount, products, buyer } = await req.json();

    console.log(totalAmount, products, buyer);

    await connectToDb();

    const validProducts: IOrderProduct[] = products.map(
      (product: IProduct) => ({
        _id: product._id,
        title: product.title,
        quantity: product.quantity,
      })
    );

    const newOrder = new OrderModels({
      totalAmount,
      product: validProducts,
      buyer: buyer as IOrderBuyer,
    });

    await newOrder.save();

    return new NextResponse(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error." }),
      { status: 500 }
    );
  }
};
