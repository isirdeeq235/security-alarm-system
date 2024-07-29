"use server";
import { signOut } from "@/auth";

export const login = async () => {
  await signOut({ redirectTo: "/login" });
};
