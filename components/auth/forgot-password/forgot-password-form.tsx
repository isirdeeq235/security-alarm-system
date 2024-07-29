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
import AnimatedDots from "@/components/ui/animated-dot";
import toast from "react-hot-toast";
import axios from "axios";

export const ForgotPasswordForm = () => {
  const form = useForm<Schema.ForgotPasswordType>({
    resolver: zodResolver(Schema.ForgotPasswordSchema),
    defaultValues: {
      matric: "",
    },
  });

  return (
    <CardWrapper
      title="Forgot Password"
      description="Enter your matric number to receive your new password."
      BackButtonHref="/login"
      BackButtonLink="Back to Login"
      showSocial
      showDivider
    >
      <Form.Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            const { matric } = data;
            try {
              const response = await axios.post("/api/auth/forgot-password", {
                matric,
              });
              if (response.data.code === 200)
                return toast.success(response.data.message), form.reset();

              return toast.error(response.data.message);
            } catch {
              toast.error("Internal Server Error");
            }
          })}
          className="space-y-4"
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
                      placeholder="0086CSC2122"
                      type="text"
                      name="matric"
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full space-y-2" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                Please wait
                <AnimatedDots />
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form.Form>
    </CardWrapper>
  );
};
