"use client";
import * as React from "react";
import * as Icon from "react-icons/io5";
import * as Form from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import * as Schema from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AnimatedDots from "@/components/ui/animated-dot";
import { submitLogin } from "@/services/auth/login";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export const LoginForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<Schema.LoginType>({
    resolver: zodResolver(Schema.LoginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [formError, setFormError] = React.useState({
    message: "",
  });
  const [formSuccess, setFormSuccess] = React.useState({
    message: "",
  });

  return (
    <CardWrapper
      title="Login"
      description="Enter your Matric No. below to login to your account"
      BackButtonLabel="Didn't have an account yet?"
      BackButtonHref="/register"
      BackButtonLink="Register"
      showSocial
      showDivider
    >
      <Form.Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            const { login, password } = data;
            const res = await submitLogin(login, password);
            if (res?.code) return toast.error(res.message);

            return toast.success("Login successful!");
          })}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-4">
            <Form.FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Email / Matric Number</Form.FormLabel>
                  <Form.FormControl>
                    <Input
                      {...field}
                      placeholder="FCP/CSC/19/2009"
                      type="text"
                      name="login"
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
            <Form.FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.FormItem>
                  <div className="flex items-center">
                    <Form.FormLabel>Password</Form.FormLabel>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-[0.8rem] text-primary font-medium "
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <Form.FormControl>
                    <Input
                      {...field}
                      placeholder="************"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      suffix={
                        showPassword ? (
                          <Icon.IoEyeOutline
                            className="select-none"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <Icon.IoEyeOffOutline
                            className="select-none"
                            onClick={() => setShowPassword(true)}
                          />
                        )
                      }
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full space-y-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                Please wait
                <AnimatedDots />
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form.Form>
    </CardWrapper>
  );
};
