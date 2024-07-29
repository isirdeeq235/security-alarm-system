"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export type Request = {
  sn: number;
  id: string;
  name: string;
  matric: string;
  department: string;
  needFor: string;
  status: "isRequest" | "isResponding" | "isDone" | null;
};

// Cell component for status column
const StatusCell: React.FC<{ row: any }> = ({ row }) => {
  const status = row.getValue("status") as string;

  return (
    <Badge
      className={`${
        status === `isDone`
          ? `bg-emerald-50`
          : status === `isResponding`
          ? `bg-purple-500`
          : `bg-red-500`
      } `}
    >
      {status === "isDone"
        ? "Completed"
        : status === "isResponding"
        ? "Processing"
        : "Need Help"}
    </Badge>
  );
};

// Cell component for action column
const ActionCell: React.FC<{ row: any }> = ({ row }) => {
  const [selectedStatus, setSelectedStatus] = React.useState<
    "none" | "onTheWay" | "success"
  >("none");

  const id = row.original.id as string;
  const status = row.getValue("status");
  const router = useRouter();

  const handleCheckboxChange = async (status: "onTheWay" | "success") => {
    try {
      const res = await axios.post("/api/dashboard/admin/emergency", {
        id,
        status,
      });

      if (res.data.message === "success") {
        router.refresh();
      }
      if (selectedStatus !== status) {
        setSelectedStatus(status);
      } else {
        setSelectedStatus("none");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios Error:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const isButtonDisabled = status === "isDone";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isButtonDisabled}>
          Set
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "onTheWay"}
          onCheckedChange={() => handleCheckboxChange("onTheWay")}
          disabled={status === "isResponding"}
        >
          Process
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedStatus === "success"}
          onCheckedChange={() => handleCheckboxChange("success")}
        >
          Complete
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: "sn",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        S/n
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "matric",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Matric Number
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "needFor",
    header: "Need For",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: StatusCell,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ActionCell,
  },
];
