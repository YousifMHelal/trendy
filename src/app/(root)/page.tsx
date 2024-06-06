import Categories from "@/components/Categories";
import Perks from "@/components/Perks";
import Slider from "@/components/Slider";
import WidthContainer from "@/components/WidthContainer";
import ProductReel from "@/components/productReel";

export default async function Home() {
  return (
    <>
      <Slider />
      <Perks />
      <WidthContainer>
        <ProductReel title="Brand new" href="/products" />
      </WidthContainer>
      <Categories />
      <WidthContainer>
        <ProductReel title="Best Offers" href="/products" />
      </WidthContainer>
    </>
  );
}
