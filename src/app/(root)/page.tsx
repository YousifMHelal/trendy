import Categories from "@/components/Categories";
import Perks from "@/components/Perks";
import Slider from "@/components/Slider";
import WidthContainer from "@/components/WidthContainer";
import ProductReel from "@/components/productReel";
import { getCategories } from "@/data/getCategories";

export default async function Home() {
  const categories = await getCategories();
  return (
    <>
      <Slider />
      <Perks />
      <WidthContainer>
        <ProductReel title="Brand new" href="/products" />
      </WidthContainer>
      <Categories categories={categories} />
      <WidthContainer>
        <ProductReel title="Best Offers" href="/products" />
      </WidthContainer>
    </>
  );
}
