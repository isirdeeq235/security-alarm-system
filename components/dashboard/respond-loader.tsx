import * as React from "react";

import { Spinner } from "@radix-ui/themes";

export const RespondLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-inherit gap-5 -mx-auto">
      <h1>HELP IS ON THE WAY</h1>
      <Spinner
        style={{ width: "100px", height: "100px" }}
        className="text-blue-500"
      />
      <h1>ARRIVED IN ANY TIME SOON</h1>
    </div>
  );
};
