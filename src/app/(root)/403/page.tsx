import WidthContainer from "@/components/WidthContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <WidthContainer className="flex flex-col gap-5 items-center justify-center h-[80vh]">
      <div className="relative w-72 h-72">
        <Image src="/403Error.png" alt="403" fill />
      </div>
      <h1 className="text-4xl text-muted-foreground">
        Sorry, you&apos;re not authorized to perform this action.
      </h1>
      <Button variant={"link"} className="text-xl text-destructive">
        Go back home
      </Button>
    </WidthContainer>
  );
};

export default page;
