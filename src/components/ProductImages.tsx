"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="md:h-[300px] h-[400px] relative">
        {images && (
          <Image
            src={images[index]}
            alt={`Product image ${index + 1}`}
            fill
            sizes="50vw"
            className="object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex justify-between gap-4">
        {images &&
          images.map((image: string, i: number) => (
            <div
              className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
              key={i}
              onClick={() => setIndex(i)}>
              <Image
                src={image}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="30vw"
                className="object-cover rounded-md"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductImages;
