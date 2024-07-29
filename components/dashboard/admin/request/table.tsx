"use client";
import Link from "next/link"; // Use next/link for navigation
import { Request, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect } from "react";
import axios from "axios";

export default function EmergencyRequestPage({
  requestDetails,
}: {
  requestDetails: Request[];
}) {
  return (
    <main>
      <h1 className="flex items-center justify-center font-extrabold text-[40px] -mt-5">
        EMERGENCY REQUEST
      </h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={requestDetails} />
      </div>
    </main>
  );
}
