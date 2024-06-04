import { IoStorefront } from "react-icons/io5";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/data/getProducts";
import { formatPrice } from "@/lib/utils";

const page = async () => {
  const products = await getProducts();

  return (
    <section className="flex flex-col">
      {/* page information */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 font-semibold">
          <IoStorefront size={20} />
          <p className="text-xl">Products</p>
        </div>
        <Button size={"lg"}>Add new</Button>
      </div>

      {/* products table */}
      <table className="w-full rounded-md bg-input">
        <thead>
          <tr className="font-semibold text-lg">
            <td className="py-2 px-3">Title</td>
            <td className="py-2 px-3">Description</td>
            <td className="py-2 px-3">Price</td>
            <td className="py-2 px-3">created at</td>
            <td className="py-2 px-3">Stock</td>
            <td className="py-2 px-3">Action</td>
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map(
              ({
                _id,
                images,
                title,
                description,
                price,
                quantity,
                createdAt,
              }: {
                _id: string;
                title: string;
                images: string[];
                description: string;
                price: number;
                quantity: number;
                createdAt: Date;
              }) => (
                <tr className="border-t border-muted-foreground" key={_id}>
                  <td className="flex gap-2 px-4 py-3 text-base capitalize font-medium">
                    <div className="relative w-8 h-8">
                      {images && (
                        <Image
                          src={images[1]}
                          alt=""
                          className="rounded-full"
                          fill
                        />
                      )}
                    </div>
                    <span>{title}</span>
                  </td>
                  <td className="px-4 py-2 text-base capitalize font-medium">
                    {description.substring(0, 50) + "..."}
                  </td>
                  <td className="px-4 py-2 text-base capitalize font-medium">
                    {formatPrice(price)}
                  </td>
                  <td className="px-4 py-2 text-base capitalize font-medium">
                    {new Date(createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-base capitalize font-medium">
                    {quantity}
                  </td>
                  <td className="px-4 py-2 text-base capitalize font-medium">
                    <div className="flex gap-2">
                      <Link
                        className={buttonVariants({ variant: "secondary" })}
                        href="/">
                        view
                      </Link>
                      <Link
                        className={buttonVariants({ variant: "destructive" })}
                        href="/">
                        delete
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )
          ) : (
            <h2 className="text-primary">No products yet!! Add new products</h2>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default page;
