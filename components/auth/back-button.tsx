"use client";

import { Button } from "@/components/ui/button";
import { BackButtonProps } from "@/types";
import Link from "next/link";

export const BackButton = ({
  href = "",
  label,
  link,
  onClick,
  disable,
}: BackButtonProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <span className="text-sm">{label}</span>
      <Button variant="link" className="font-medium -ml-3 " asChild>
        <Link
          href={!disable ? href : "#"}
          onClick={onClick}
          className={`${
            disable
              ? "cursor-progress opacity-70 no-underline hover:no-underline pointer-events-none select-none"
              : "cursor-submit"
          }`}
        >
          {link}
        </Link>
      </Button>
    </div>
  );
};
