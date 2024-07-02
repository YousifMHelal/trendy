"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { app } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import useCategoriesStore from "@/store/useCategoriesStore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const storage = getStorage(app);

const Page = () => {
  const [error, setError] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Handle image preview and delete
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);
    setImages((prevImages) => [...prevImages, ...files]);

    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleDeleteImage = (index: number) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Upload images to Firebase and return URLs
  const uploadImages = async (): Promise<string[]> => {
    const newMedia: string[] = [];
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      const name = new Date().getTime() + image.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, image);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload ${index + 1} is ${progress}% done`);
            switch (snapshot.state) {
              case "paused":
                console.log(`Upload ${index + 1} is paused`);
                break;
              case "running":
                console.log(`Upload ${index + 1} is running`);
                break;
            }
          },
          (error) => {
            console.error("Error while uploading:", error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(`File ${index + 1} available at`, downloadURL);
              newMedia.push(downloadURL);
              resolve();
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    }
    return newMedia;
  };

  // Add new product to DB
  const handleAddNewProduct = async () => {
    setLoading(true);
    setError({
      title: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
    });

    let isValid = true;
    if (!title.trim()) {
      setError((prev) => ({
        ...prev,
        title: "Title is required",
      }));
      isValid = false;
    }
    if (!description.trim()) {
      setError((prev) => ({
        ...prev,
        description: "Description is required",
      }));
      isValid = false;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) < 0) {
      setError((prev) => ({
        ...prev,
        price: "Valid price is required",
      }));
      isValid = false;
    }
    if (!quantity.trim() || isNaN(Number(quantity)) || Number(quantity) < 0) {
      setError((prev) => ({
        ...prev,
        quantity: "Valid quantity is required",
      }));
      isValid = false;
    }
    if (!category.trim()) {
      setError((prev) => ({
        ...prev,
        category: "Category is required",
      }));
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const uploadedMedia = await uploadImages();
      setMedia(uploadedMedia);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          quantity: Number(quantity),
          images: uploadedMedia,
          category,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Product created successfully");
        setImages([]);
        setMedia([]);
        setImagePreviews([]);
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

  // Fetch the categories
  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="flex flex-col">
      {/* Page information */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 font-semibold">
          <IoStorefront size={20} />
          <p className="text-xl">Add new product</p>
        </div>
        <div>
          {loading ? (
            <Loader2 className="animate-spin mr-10 h-8 w-8 text-muted-background" />
          ) : (
            <Button size={"lg"} onClick={handleAddNewProduct}>
              <IoIosCheckmark size={30} />
              Add
            </Button>
          )}
        </div>
      </div>

      {/* Add new product */}
      <div>
        <div className="grid grid-cols-[58%,40%] gap-5">
          {/* General information */}
          <div className="flex flex-col rounded-xl p-8 bg-input">
            <h2 className="font-bold text-xl pb-4">General Information</h2>
            <div className="grid gap-1 py-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                className={cn({
                  "focus-visible:ring-red-500": error.title,
                })}
                placeholder="Name"
                id="productName"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {error.title && (
              <p className="text-sm text-red-500">{error.title}</p>
            )}

            <div className="grid gap-1 py-2">
              <Label htmlFor="productDescription">Product Description</Label>
              <Textarea
                className={cn("resize-none", {
                  "focus-visible:ring-red-500": error.description,
                })}
                placeholder="Description"
                id="productDescription"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {error.description && (
              <p className="text-sm text-red-500">{error.description}</p>
            )}
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
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            {/* The image preview */}
            <div className="flex flex-col gap-4 p-5 rounded-xl">
              <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
                {imagePreviews ? (
                  imagePreviews.map((image, index) => (
                    <div key={index} className="relative h-28 w-28">
                      <Image
                        className="rounded object-contain"
                        fill
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                      />
                      <MdDeleteForever
                        size={24}
                        className="absolute top-0 right-0 cursor-pointer text-red-700"
                        onClick={() => handleDeleteImage(index)}
                      />
                    </div>
                  ))
                ) : (
                  <h2 className="text-2xl">Upload</h2>
                )}
              </div>
            </div>
          </div>
          {/* Pricing And Stock */}
          <div className="flex flex-col rounded-xl p-8 bg-input">
            <h2 className="font-bold text-xl pb-4">Pricing And Stock</h2>
            <div className="grid grid-flow-col gap-4">
              {/* price */}
              <div className="grid gap-1 py-2">
                <Label htmlFor="productName">Base Pricing</Label>
                <Input
                  type="number"
                  min={0}
                  className={cn({
                    "focus-visible:ring-red-500": error.price,
                  })}
                  placeholder="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                {error.price && (
                  <p className="text-sm text-red-500">{error.price}</p>
                )}
                {/* Stock */}
              </div>
              <div className="grid gap-1 py-2">
                <Label htmlFor="productName">Stock</Label>
                <Input
                  type="number"
                  min={0}
                  className={cn({
                    "focus-visible:ring-red-500": error.quantity,
                  })}
                  placeholder="stock"
                  id="stock"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {error.quantity && (
                  <p className="text-sm text-red-500">{error.quantity}</p>
                )}
              </div>
            </div>
          </div>
          {/* Category */}
          <div className="flex flex-col rounded-xl p-8 bg-input">
            <h2 className="font-bold text-xl pb-4">Category</h2>
            <div className="grid gap-1 py-2">
              <Label htmlFor="productName">Product Category</Label>
              <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map(
                      ({
                        _id,
                        name,
                        slug,
                      }: {
                        _id: string;
                        name: string;
                        slug: string;
                      }) => (
                        <SelectItem key={_id} value={slug}>
                          {name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {error.category && (
              <p className="text-sm text-red-500">{error.category}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
