import * as React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full justify-center items-center bg-slate-200">{children}</div>
  );
};

export default layout;
