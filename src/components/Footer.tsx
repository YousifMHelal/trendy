import Image from "next/image";
import Link from "next/link";
import WidthContainer from "./WidthContainer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="bg-muted px-8 md:px-0 text-sm mt-10 text-primary py-8">
      <WidthContainer>
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between gap-20">
          {/* LEFT */}
          <div className="w-full md:w-1/3 lg:w-1/3 flex flex-col gap-8">
            <Link href="/">
              <div className="text-2xl font-semibold tracking-wide">Trendy</div>
            </Link>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              minima sed error optio obcaecati provident, reiciendis libero
              temporibus maiores non saepe laborum quis possimus inventore aut
              iste exercitationem, suscipit corporis.
            </p>
            <span className="font-semibold">contact@trendy.com</span>
            <span className="font-semibold">+1 234 567 890</span>
            <div className="flex gap-6">
              <Image src="/facebook.png" alt="" width={16} height={16} />
              <Image src="/instagram.png" alt="" width={16} height={16} />
              <Image src="/youtube.png" alt="" width={16} height={16} />
              <Image src="/pinterest.png" alt="" width={16} height={16} />
              <Image src="/x.png" alt="" width={16} height={16} />
            </div>
          </div>
          {/* CENTER */}
          <div className="hidden lg:flex gap-24 w-1/3">
            <div className="flex flex-col gap-10">
              <h1 className="font-medium text-lg">SHOP</h1>
              <div className="flex flex-col gap-6">
                <Link href="">New Arrivals</Link>
                <Link href="">Accessories</Link>
                <Link href="">Men</Link>
                <Link href="">Women</Link>
                <Link href="">All Products</Link>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <h1 className="font-medium text-lg">HELP</h1>
              <div className="flex flex-col gap-6">
                <Link href="">Customer Service</Link>
                <Link href="">My Account</Link>
                <Link href="">Find a Store</Link>
                <Link href="">Legal & Privacy</Link>
                <Link href="">Gift Card</Link>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full md:w-1/3 lg:w-1/3 flex flex-col gap-8">
            <h1 className="font-medium text-lg">SUBSCRIBE</h1>
            <p>
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Email address"
                className="p-4 w-3/4"
              />
              <Button className="w-1/4 text-white">JOIN</Button>
            </div>
            <span className="font-semibold">Secure Payments</span>
            <div className="flex justify-between">
              <Image src="/discover.png" alt="" width={40} height={20} />
              <Image src="/skrill.png" alt="" width={40} height={20} />
              <Image src="/paypal.png" alt="" width={40} height={20} />
              <Image src="/mastercard.png" alt="" width={40} height={20} />
              <Image src="/visa.png" alt="" width={40} height={20} />
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
          <div className="">&copy; {new Date().getFullYear()} Trendy store</div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="font-medium">United States | English</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="font-medium">$ USD</span>
            </div>
          </div>
        </div>
      </WidthContainer>
    </footer>
  );
};

export default Footer;
