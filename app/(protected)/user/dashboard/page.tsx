import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import { Dashboard } from "@/components/dashboard/dashboard";

const DashboardPage = async () => {
  const session = await auth();

  const userData = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  const requests = await prisma.request.findMany({
    where: { userId: userData?.id },
  });

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const isDoneCount = requests.filter(
    (request) => request.isDone === true
  ).length;

  const isDoneTodayCount = requests.filter(
    (request) =>
      request.isDone === true &&
      request.createdAt >= startOfDay &&
      request.createdAt < endOfDay
  ).length;

  const isProcessCount = requests.filter(
    (request) => request.isResponding === true
  ).length;

  const isProcessTodayCount = requests.filter(
    (request) =>
      request.isResponding === true &&
      request.createdAt >= startOfDay &&
      request.createdAt < endOfDay
  ).length;
  const isRequestCount = requests.filter(
    (request) => request.isRequest === true
  ).length;

  const isRequestTodayCount = requests.filter(
    (request) =>
      request.isRequest === true &&
      request.createdAt >= startOfDay &&
      request.createdAt < endOfDay
  ).length;

  if (session?.user?.id && session.user.role !== "USER")
    redirect("/admin/dashboard");

  if (userData?.email === null) {
    redirect("/user/profile");
  }
  return (
    <Dashboard
      isRequestCount={isRequestCount}
      isProcessCount={isProcessCount}
      isDoneCount={isDoneCount}
      isRequestTodayCount={isRequestTodayCount}
      isProcessTodayCount={isProcessTodayCount}
      isDoneTodayCount={isDoneTodayCount}
    />
  );
};

export default DashboardPage;
