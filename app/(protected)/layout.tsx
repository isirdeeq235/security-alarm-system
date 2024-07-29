import * as React from "react";
import { Theme } from "@radix-ui/themes";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Theme> {children}</Theme>;
};

export default layout;
