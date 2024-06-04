/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Loader2, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name)
      setError((prev) => ({
        ...prev,
        name: "Field is required",
      }));

    if (!email)
      setError((prev) => ({
        ...prev,
        email: "Field is required",
      }));

    if (!password)
      setError((prev) => ({
        ...prev,
        password: "Field is required",
      }));

    if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Your password must be at least 8 character",
      }));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully. Login now...");
        router.push("./sign-in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while registering. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Store className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in">
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": error.name,
                    })}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Username"
                  />
                  {error.name && (
                    <p className="text-sm text-red-500">{error.name}</p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": error.email,
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="You@example.com"
                  />
                  {error.email && (
                    <p className="text-sm text-red-500">{error.email}</p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": error.password,
                    })}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                  />
                  {error.password && (
                    <p className="text-sm text-red-500">{error.password}</p>
                  )}
                </div>
                {loading ? (
                  <Loader2 className="animate-spin mx-auto h-8 w-8 text-muted-background" />
                ) : (
                  <Button>Sign up</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
