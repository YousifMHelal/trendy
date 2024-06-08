"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, Loader2, Store } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Page = () => {
  const { data } = useSession();
  const isAdmin = data?.user.isAdmin;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0 overflow-hidden">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Store className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5 text-muted-foreground",
              })}
              href="/sign-up">
              Don&apos;t have an account? Sign-up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className={cn({
                      "focus-visible:ring-red-500": error.email,
                    })}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="You@example.com"
                  />
                </div>
                {error.email && (
                  <p className="text-sm text-red-500">{error.email}</p>
                )}

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
                  <Button>Sign in</Button>
                )}
              </div>
              <div className="my-4 relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">or</span>
              </div>

              <div className="flex align-center gap-4">
                <p>Login in with :</p>
                <FcGoogle
                  onClick={() => signIn("google")}
                  className="text-xl cursor-pointer mt-1 flex align-center"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
