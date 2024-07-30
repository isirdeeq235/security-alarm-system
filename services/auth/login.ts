"use server";
import { signIn, auth } from "@/auth";
import {
  ADMIN_LOGGEDIN_REDIRECT,
  DEFAULT_LOGGEDIN_REDIRECT,
  USER_LOGGEDIN_REDIRECT,
} from "@/routes";
import { AuthError } from "next-auth";

const submitLogin = async (login: string, password: string) => {
  try {
    await signIn("credentials", {
      login,
      password,
      redirectTo: DEFAULT_LOGGEDIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { code: 401, message: "Invalid Matric or Password" };
        default:
          return { code: 500, message: "Something went wrong" };
      }
    }
    throw error;
  }
};

export { submitLogin };
