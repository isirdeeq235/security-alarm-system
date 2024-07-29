import * as React from "react";
import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPassword = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
