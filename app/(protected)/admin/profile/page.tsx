import React from "react";
import { auth } from "@/auth";
import Profile from "@/components/dashboard/admin/profile";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();

  const userId = session?.user.id;
  const userData = await prisma.user.findUnique({ where: { id: userId } });

  if (session?.user?.id && session.user.role !== "ADMIN")
    redirect("/user/dashboard");

  return <Profile id={userId} user={userData} />;
};

export default ProfilePage;
