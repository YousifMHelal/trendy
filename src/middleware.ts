// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/sign-in`);
  }

  if (!token.isAdmin) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/403`);
  }

  return NextResponse.next();
}

export const config = {
  api: {
    bodyParser: false,
  },
  matcher: [
    "/dashboard",
    "/dashboard/products",
    "/dashboard/add-new-product",
    "/dashboard/categories",
    "/dashboard/add-new-category",
  ],
};
