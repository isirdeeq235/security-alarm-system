import * as React from "react";

import { Spinner } from "@radix-ui/themes";
import { AnimatedDots } from "@/components/ui/animated-dot";

export const RequestLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-transparent gap-5">
      <h1 className="flex ">
        WAITING
        <AnimatedDots />
      </h1>
      <Spinner
        style={{ width: "100px", height: "100px" }}
        className="text-blue-500"
      />
      <h1> Please standby, we are currently requesting for help</h1>
    </div>
  );
};
