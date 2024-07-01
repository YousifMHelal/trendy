"use client";

import { IProduct } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { items, removeItem } = useCart();
  const router = useRouter();
  const checkoutProducts = items.map(({ product }) => product);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [totalPrices, setTotalPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setIsMounted(true);

    const initialQuantities: { [key: string]: number } = {};
    const initialTotalPrices: { [key: string]: number } = {};

    items.forEach(({ product }) => {
      initialQuantities[product._id] = 1;
      initialTotalPrices[product._id] = product.price;
    });

    setProductQuantities(initialQuantities);
    setTotalPrices(initialTotalPrices);
  }, [items]);

  const cartTotal = items.reduce(
    (total, { product }) => total + totalPrices[product._id],
    0
  );

  const createCheckout = async () => {
    const checkoutData = {
      products: checkoutProducts,
      total: cartTotal + fee,
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    router.push("/checkout");
  };

  const handleCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: IProduct
  ) => {
    const quantity = Number(e.target.value);
    setProductQuantities((prev) => ({
      ...prev,
      [product._id]: quantity,
    }));
    setTotalPrices((prev) => ({
      ...prev,
      [product._id]: quantity * product.price,
    }));
  };

  const fee = 1;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && items.length === 0,
            })}>
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div className="relative h-34 w-60 text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-20 mx-auto mt-3">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}
            <ul
              className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200":
                  isMounted && items.length > 0,
              })}>
              {isMounted &&
                items.map(({ product }) => {
                  const label = product.category.toString();
                  const image = product.images[0];
                  return (
                    <li key={product._id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          {image && (
                            <Image
                              fill
                              src={image}
                              alt="product image"
                              className="h-full w-full rounded-md object-contain object-center sm:h-48 sm:w-48"
                            />
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:pr-0">
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
                                Category: {label}
                              </p>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                          <div className="w-full mt-2 gap-5 md:gap-0 md:mt-0 items-center flex md:flex-col">
                            <div className="text-center md:mx-auto p-1">
                              <Input
                                type="number"
                                className="w-20 m-0"
                                min={1}
                                max={product.quantity}
                                value={productQuantities[product._id] || 1}
                                onChange={(e) => handleCountChange(e, product)}
                              />
                            </div>
                            <p className="md:mt-2 text-sm font-medium text-gray-900">
                              {"Total: " +
                                formatPrice(
                                  totalPrices[product._id] || product.price
                                )}
                            </p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeItem(product._id)}
                                variant="ghost">
                                <X className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Delivery within 3 days</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction Fee</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order Total
                </div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                disabled={items.length === 0}
                onClick={createCheckout}
                className="w-full"
                size="lg">
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
