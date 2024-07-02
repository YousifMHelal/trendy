"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { IProduct } from "@/components/ProductCard";
import WidthContainer from "@/components/WidthContainer";
import { formatPrice } from "@/lib/utils";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutData {
  products: IProduct[];
}

const Page = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("total"));

  useEffect(() => {
    try {
      const data = localStorage.getItem("checkoutData");
      if (data) {
        setCheckoutData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to retrieve checkout data:", error);
    }
  }, []);

  const products = checkoutData?.products;

  const options: StripeElementsOptions = {
    mode: "payment",
    currency: "usd",
    amount: amount * 100,
  };

  return (
    <WidthContainer>
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-2 w-full mt-20 ">
        <div>
          <ul className="border-2 border-dashed px-5 py-3">
            {products &&
              products.map((product) => {
                const label = product.category.toString();
                const image = product.images[0];
                return (
                  <li key={product._id} className="flex py-2 sm:py-5 border-b">
                    <div className="flex-shrink-0">
                      <div className="relative h-14 w-14">
                        {image && (
                          <Image
                            fill
                            src={image}
                            alt="product image"
                            className="h-full w-full rounded-full object-cover object-center sm:h-48 sm:w-48"
                          />
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/products/${product.slug}`}
                                className="font-medium text-gray-700 hover:text-gray-800">
                                {product.title}
                              </Link>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-muted-foreground capitalize">
                              {label}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            <li className="text-center font-bold text-xl py-2">
              Total: {formatPrice(amount)}
            </li>
          </ul>
        </div>
        <div className="my-10 w-11/12 mx-auto">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm total={amount} />
          </Elements>
        </div>
      </section>
    </WidthContainer>
  );
};

export default Page;
