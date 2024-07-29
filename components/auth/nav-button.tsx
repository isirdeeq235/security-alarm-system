"use client";
import { useRouter } from "next/navigation";
import { NavbuttonProps } from "@/types";

export const Navbutton = ({
  children,
  mode = "redirect",
  endPoint,
  asChild,
}: NavbuttonProps) => {
  const router = useRouter();

  return (
    <span
      onClick={() => {
        localStorage.clear();
        router.push(endPoint);
      }}
      className="flex flex-col items-center justify-center cursor-pointer"
    >
      {children}
    </span>
  );
};
