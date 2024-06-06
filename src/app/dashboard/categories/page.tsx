import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IoStorefront } from "react-icons/io5";

export const getCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch categories: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const page = async () => {
  const Categories = await getCategories();

  return (
    <section className="flex flex-col">
      {/* page information */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 font-semibold">
          <IoStorefront size={20} />
          <p className="text-xl">Categories</p>
        </div>
        <Button size={"lg"}>Add new</Button>
      </div>

      {/* products table */}
      <table className="w-full rounded-md bg-input">
        <thead>
          <tr className="font-semibold text-lg">
            <td className="py-2 px-3">Title</td>
            <td className="py-2 px-3">created at</td>
            <td className="py-2 px-3">Action</td>
          </tr>
        </thead>
        <tbody>
          {Categories ? (
            Categories.map(
              ({
                _id,
                image,
                name,
                createdAt,
              }: {
                _id: string;
                name: string;
                image: string;
                createdAt: Date;
              }) => (
                <tr className="border-t border-muted-foreground" key={_id}>
                  <td className="flex gap-2 px-4 py-3 text-base capitalize font-medium">
                    <div className="relative w-8 h-8">
                      {image && (
                        <Image
                          src={image}
                          alt=""
                          className="rounded-full"
                          fill
                        />
                      )}
                    </div>
                    <span>{name}</span>
                  </td>
                  <td className="px-4 py-2 text-base capitalize font-medium">
                    {new Date(createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
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
