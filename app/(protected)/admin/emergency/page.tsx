import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EmergencyRequestPage from "@/components/dashboard/admin/request/table";
import prisma from "@/prisma/client";

const EmergencyPage = async () => {
  const session = await auth();

  const userdata = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  if (session?.user?.id && session.user.role !== "ADMIN") {
    redirect("/user/dashboard");
  }

  if (userdata?.email === null) {
    redirect("/admin/profile");
  }

  const requestData = await prisma.request.findMany();

  const userIds = requestData.map((request) => request.userId);
  const departments = requestData.map((request) => request.department);
  const details = requestData.map((request) => request.details);

  const getTrueField = (
    request: any
  ): "isRequest" | "isResponding" | "isDone" | null => {
    if (request.isRequest) return "isRequest";
    if (request.isResponding) return "isResponding";
    if (request.isDone) return "isDone";
    return null;
  };

  const status = requestData.map(getTrueField);

  const userData = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });

  const names = userData.map((user) => user.name ?? "");
  const matricNumbers = userData.map((user) => user.matric ?? "");

  const data = requestData.map((request, index) => ({
    sn: index + 1,
    id: request.userId,
    name: names[index],
    matric: matricNumbers[index],
    department: request.department,
    needFor: request.details,
    status: getTrueField(request),
  }));

  return <EmergencyRequestPage requestDetails={data} />;
};

export default EmergencyPage;
