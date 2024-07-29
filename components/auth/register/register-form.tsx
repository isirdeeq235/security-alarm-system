"use client";
import * as React from "react";
import * as Icon from "react-icons/io5";
import * as Schema from "@/schemas";
import * as Form from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedDots from "@/components/ui/animated-dot";
import { submitRegister, matricCheck } from "@/services/auth";
import toast from "react-hot-toast";

export const RegisterForm = () => {
  const form = useForm<Schema.RegisterType>({
    resolver: zodResolver(Schema.RegisterSchema),
    defaultValues: {
      matric: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const [matricError, setmatricError] = React.useState<string>("");

  const [isExist, setIsExist] = React.useState<boolean>(false);
  const [isSentEmail, setIsSentEmail] = React.useState<boolean>(false);

  const [isEmpty, setIsEmpty] = React.useState<boolean>(true);

  return (
    <CardWrapper
      title="Create an Account"
      description="Enter your information to create an account"
      BackButtonLabel="Already have an account?"
      BackButtonHref="/login"
      BackButtonLink="Login"
      showSocial
      showDivider
    >
      <Form.Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(async (data) => {
            if (matricError) {
              return;
            }

            const res = await submitRegister(data);

            if (res?.code === 409)
              return setmatricError(res.message), setIsExist(true);

            return res?.code === 200
              ? (toast.success(res!.message), form.reset(), setIsEmpty(true))
              : toast.error(res!.message);
          })}
          noValidate
        >
          <div className="space-y-4">
            <Form.FormField
              control={form.control}
              name="matric"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Matric Number</Form.FormLabel>
                  <Form.FormControl>
                    <Input
                      {...field}
                      placeholder="FCP/CSC/19/2009"
                      type="text"
                      name="matric"
                      suffix={
                        !isEmpty &&
                        (!isExist ? (
                          <Icon.IoCheckmarkCircle
                            className="text-emerald-50"
                            title="Email Verified"
                          />
                        ) : (
                          <Icon.IoWarning
                            className="text-red-500"
                            title="Email Exist"
                          />
                        ))
                      }
                      onBlur={() => {
                        if (!form.formState.errors.matric) {
                          matricCheck(
                            form,
                            setmatricError,
                            setIsExist,
                            setIsEmpty
                          );
                        }
                        setIsEmpty(true);
                      }}
                    />
                  </Form.FormControl>
                  <Form.FormMessage matricError={matricError} />
                </Form.FormItem>
              )}
            />
            <Form.FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Password</Form.FormLabel>
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
            <Form.FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Confirm Password</Form.FormLabel>
                  <Form.FormControl>
                    <Input
                      {...field}
                      placeholder="************"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      suffix={
                        showConfirmPassword ? (
                          <Icon.IoEyeOutline
                            className="select-none"
                            onClick={() => setShowConfirmPassword(false)}
                          />
                        ) : (
                          <Icon.IoEyeOffOutline
                            className="select-none"
                            onClick={() => setShowConfirmPassword(true)}
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
              "Create an Account"
            )}
          </Button>
        </form>
      </Form.Form>
    </CardWrapper>
  );
};
