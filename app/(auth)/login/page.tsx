import * as React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login/login-form";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return <LoginForm />;
};

export default LoginForm;
