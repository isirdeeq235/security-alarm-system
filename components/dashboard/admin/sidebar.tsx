import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Siren,
} from "lucide-react";

import Link from "next/link";
import { NavContent } from "@/components/dashboard/admin/nav-content";

export const Sidebar = () => {
  return (
    <div className="sticky top-0 flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 bg-muted/100">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Siren className="h-6 w-6 text-primary" />
          <span className="">Security Alert System</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start px-x py-1 text-sm font-medium lg:px-4">
          <NavContent />
        </nav>
      </div>
    </div>
  );
};
