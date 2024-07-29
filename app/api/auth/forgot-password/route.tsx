import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import ResetPassword from "@/emails/ResetPassword";
import bcrypt from "bcrypt";

import generateRandomString from "@/services/passwordGenerator";
export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { matric } = requestBody;

  try {
    const user = await prisma.user.findUnique({
      where: { matric },
    });

    if (!user?.email) {
      return NextResponse.json({
        code: 404,
        message: "User not found",
      });
    }

    const newPassword = generateRandomString(8);
    const password = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { matric },
      data: { password },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
      },
    });

    const emailHtml = render(<ResetPassword newPassword={newPassword} />);

    const mailOptions = {
      from: `"${process.env.NEXT_PUBLIC_EMAIL_FROM_NAME}" <${process.env.NEXT_PUBLIC_EMAIL_FROM_ADDRESS}>`,
      to: user.email,
      subject: "Reset Password",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      code: 200,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in forgot-password route:", error);
    return NextResponse.json({
      code: 500,
      message: "Internal server error",
    });
  }
}

