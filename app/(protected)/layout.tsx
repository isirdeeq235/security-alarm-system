import * as React from "react";
import { Theme } from "@radix-ui/themes";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Theme> {children}</Theme>
    </main>
  );
};

export default layout;
