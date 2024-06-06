"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { IoIosCheckmark } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Page = () => {
  const [error, setError] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleAddNewCategory = async () => {
    setLoading(true);
    setError({
      name: "",
    });

    if (!name.trim()) {
      setError((prev) => ({
        ...prev,
        name: "Title is required",
      }));
      setLoading(false);
      return;
    }

    try {
      console.log(name, image);

      const res = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Product created successfully");
        setName("");
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong while adding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col">
      {/* Page information */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 font-semibold">
          <IoStorefront size={20} />
          <p className="text-xl">Add new category</p>
        </div>
        <div >
          {loading ? (
            <Loader2 className="animate-spin mr-10 h-8 w-8 text-muted-background" />
          ) : (
            <Button size={"lg"} onClick={handleAddNewCategory}>
              <IoIosCheckmark size={30} />
              Add
            </Button>
          )}
        </div>
      </div>

      {/* Add new product */}
      <div>
        <div className="grid grid-cols-1 w-4/5 mx-auto gap-5">
          {/* General information */}
          <div className="flex flex-col rounded-xl p-8 bg-input">
            <h2 className="font-bold text-xl pb-4">General Information</h2>
            <div className="grid gap-1 py-2">
              <Label htmlFor="productName">Category Name</Label>
              <Input
                className={cn({
                  "focus-visible:ring-red-500": error.name,
                })}
                placeholder="Name"
                id="productName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {error.name && <p className="text-sm text-red-500">{error.name}</p>}
          </div>
          {/* Image preview */}
          <div className="flex flex-col rounded-xl p-8 bg-input">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl pb-4">Upload an Image</h2>
              <div className="flex items-center justify-center">
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center w-10 h-10 bg-white/50 rounded-full cursor-pointer font-bold text-2xl">
                  +
                  <input
                    required
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            {/* The image preview */}
            <div className="flex flex-col gap-4 p-5 rounded-xl">
              <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
                {image ? (
                  <div className="relative h-28 w-28">
                    <Image
                      className="rounded object-cover"
                      fill
                      src={image}
                      alt="Uploaded Image"
                    />
                    <MdDeleteForever
                      size={24}
                      className="absolute top-0 right-0 cursor-pointer"
                      onClick={handleDeleteImage}
                    />
                  </div>
                ) : (
                  <h2 className="text-2xl">Upload</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
