"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IProduct } from "./ProductCard";
import { useCart } from "@/store/useCart";

const AddToCartButton = ({ product }: { product: IProduct }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      disabled={product.quantity <= 0 || isSuccess}
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full">
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
