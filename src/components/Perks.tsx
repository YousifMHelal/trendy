import { Check, Clover, Package, ShieldCheck } from "lucide-react";
import WidthContainer from "./WidthContainer";

const perks = [
  {
    name: "Instant Delivery",
    icon: Package,
    description:
      "Get your asset deliver to your email in seconds and download it right away.",
  },
  {
    name: "Guaranteed Quality",
    icon: ShieldCheck,
    description:
      "Every asset on our platform is verified by our team to ensure our hightest quality standards.",
  },
  {
    name: "For the planet",
    icon: Clover,
    description:
      "we've placed 1% of sales to the preservation and restoration of the natural environment.",
  },
  {
    name: "For the planet",
    icon: Check,
    description:
      "we've placed 1% of sales to the preservation and restoration of the natural environment.",
  },
];

const Perks = () => {
  return (
    <section className="border-t border-gray-200 bg-gray-50">
      <WidthContainer className="py-20">
        <div className="grid grid-cols-1 px-6 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:px-0 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk) => (
            <div
              key={perk.name}
              className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
              <div className="md:flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {<perk.icon className="w-1/3 h-1/3" />}
                </div>
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </WidthContainer>
    </section>
  );
};

export default Perks;
