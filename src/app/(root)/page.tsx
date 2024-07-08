import Categories from "@/components/Categories";
import Perks from "@/components/Perks";
import Slider from "@/components/Slider";
import WidthContainer from "@/components/WidthContainer";
import ProductReel from "@/components/productReel";

export default function Home() {
  return (
    <>
      <Slider />
      <Perks />
      <Categories />
      <WidthContainer>
        <ProductReel
          title="Brand new"
          href="/products/?category=mobiles"
          category="mobiles"
        />
      </WidthContainer>
    </>
  );
}
