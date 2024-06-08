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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";

const storage = getStorage(app);

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
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          image: imageUrl, // Use the uploaded image URL
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Category created successfully");
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

  const uploadImage = (imageUrl: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      const file = await fetch(imageUrl).then((res) => res.blob());
      const name = new Date().getTime() + ".jpg";
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Error during upload:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <section className="flex flex-col">
      {/* Page information */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2 font-semibold">
          <IoStorefront size={20} />
          <p className="text-xl">Add new category</p>
        </div>
        <div>
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
            <div className="flex flex-col gap-4 p-2 rounded-xl">
              <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
                {image ? (
                  <div className="relative h-72 w-72">
                    <Image
                      className="rounded object-contain"
                      fill
                      src={image}
                      alt="Uploaded Image"
                    />
                    <MdDeleteForever
                      size={24}
                      className="absolute top-0 right-0 text-red-700 cursor-pointer"
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
