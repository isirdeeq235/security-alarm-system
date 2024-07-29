import * as z from "zod";

const passwordComplexity = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

//Login Schema
// export const LoginSchema = z.object({
//   matric: z.string().min(1, { message: "Matric Number is Required" }),
//   password: z
//     .string()
//     .min(1, { message: "Password is Required" })
//     .regex(passwordComplexity, {
//       message:
//         "Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.",
//     }),
// });

export const LoginSchema = z.object({
  login: z.union([
    z.string().min(1, { message: "Email / Matric Number is Required" }),
    z
      .string()
      .min(1, { message: "Email / Matric Number is Required" })
      .email({ message: "Email / Matric Number is Invalid" }),
  ]),
  password: z
    .string()
    .min(1, { message: "Password is Required" })
    .regex(passwordComplexity, {
      message:
        "Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.",
    }),
});

export type LoginType = z.infer<typeof LoginSchema>;


//Register Schema
export const RegisterSchema = z
  .object({
    matric: z.string().min(1, { message: "Matric Number is Required" }),
    password: z
      .string()
      .min(1, { message: "Password is Required" })
      .regex(passwordComplexity, {
        message:
          "Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is Required" })
      .regex(passwordComplexity, {
        message:
          "Confirm Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.  Please check and try again.",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof RegisterSchema>;

//Forgot password Schema

export const ForgotPasswordSchema = z.object({
  matric: z.string().min(1, { message: "Matric Number is Required" }),
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

//Profile  Schema

export const ProfileSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  email: z
    .string()
    .min(1, { message: "Email is Required" })
    .email({ message: "Email is Invalid" }),
});

export type ProfileType = z.infer<typeof ProfileSchema>;


//Profile Password Schema

export const ProfilePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current Password is Required" })
      .regex(passwordComplexity, {
        message:
          "Current Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.",
      }),
    newPassword: z
      .string()
      .min(1, { message: "New Password is Required" })
      .regex(passwordComplexity, {
        message:
          "New Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.",
      }),
    confirmNewPassword: z
      .string()
      .min(1, { message: "Confirm New Password is Required" })
      .regex(passwordComplexity, {
        message:
          "Confirm New Password must be at least 8 characters long, including uppercase, lowercase, number, and special character.",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.  Please check and try again.",
    path: ["confirmNewPassword"],
  });

export type ProfilePasswordType = z.infer<typeof ProfilePasswordSchema>;
