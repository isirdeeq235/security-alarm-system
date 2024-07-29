"use client";
import Link from "next/link";
import { Home, UserSquare2, ShieldAlert } from "lucide-react";

import { usePathname } from "next/navigation";

export const NavContent = () => {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/user/dashboard"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
          pathname === `/user/dashboard`
            ? "bg-muted border-l-4 rounded-none border-l-blue-500 text-primary"
            : ""
        }`}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/user/emergency"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
          pathname === `/user/emergency`
            ? "bg-muted border-l-4 rounded-none border-l-blue-500 text-primary"
            : ""
        }`}
      >
        <ShieldAlert className="h-4 w-4" />
        Emergency
      </Link>
      <Link
        href="/user/profile"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
          pathname === `/user/profile`
            ? "bg-muted border-l-4 rounded-none border-l-blue-500 text-primary"
            : ""
        }`}
      >
        <UserSquare2 className="h-4 w-4" />
        Profile
      </Link>
    </>
  );
};
