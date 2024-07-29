import * as React from "react";

import { Spinner } from "@radix-ui/themes";
import AnimatedDots from "@/components/ui/animated-dot";

export const SubmittingRequest = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-inherit gap-5 -mx-auto">
      <h1 className="flex">
        Sending Help Request
        <AnimatedDots />
      </h1>
      <Spinner
        style={{ width: "100px", height: "100px" }}
        className="text-blue-500"
      />
    </div>
  );
};
