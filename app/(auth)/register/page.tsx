import * as React from "react";
import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register/register-form";

export const metadata: Metadata = {
  title: "Register",
};

const Register = () => {
  return <RegisterForm />;
};

export default Register;
