"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="md:h-[300px] h-[400px] relative shadow-2xl rounded-lg p-5">
        {images && (
          <Image
            src={images[index]}
            alt={`Product image ${index + 1}`}
            fill
            sizes="50vw"
            className="object-contain rounded-md p-5"
          />
        )}
      </div>
      <div className="flex justify-between gap-4">
        {images &&
          images.map((image: string, i: number) => (
            <div
              className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer rounded-lg shadow-xl"
              key={i}
              onClick={() => setIndex(i)}>
              <Image
                src={image}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="30vw"
                className="object-contain rounded-md p-3"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductImages;
