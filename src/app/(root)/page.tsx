import Categories from "@/components/Categories";
import Perks from "@/components/Perks";
import Slider from "@/components/Slider";
import WidthContainer from "@/components/WidthContainer";
import ProductReel from "@/components/productReel";
import { getProducts } from "@/data/getProducts";

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Slider />
      <Perks />
      <WidthContainer>
        <ProductReel title="Brand new" href="/products" products={products} />
      </WidthContainer>
      <Categories />
      <WidthContainer>
        <ProductReel title="Best Offers" href="/products" products={products} />
      </WidthContainer>
    </>
  );
}
