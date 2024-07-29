import Emergency from "@/components/dashboard/emergency";
import React from "react";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

const EmergencyPage = async () => {
  const session = await auth();

  const userData = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  if (session?.user?.id && session.user.role !== "USER")
    redirect("/admin/dashboard");

  if (userData?.email === null) {
    redirect("/user/profile");
  }

  return <Emergency id={session!.user.id} />;
};

export default EmergencyPage;
