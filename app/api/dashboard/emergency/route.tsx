import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import RequestEmail from "@/emails/RequestEmail";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { userId, details, department, location } = requestBody.helpData;

  try {
    const findEmail = await prisma.user.findUnique({
      where: { id: userId },
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

    const emailHtml = render(
      <RequestEmail
        detail={details}
        department={department}
        location={location}
      />
    );

    const mailOptions = {
      from: `"${process.env.NEXT_PUBLIC_EMAIL_FROM_NAME}" <${process.env.NEXT_PUBLIC_EMAIL_FROM_ADDRESS}>`,
      to: findEmail?.email!,
      subject: "Emergency Request",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    const requestExist = await prisma.request.findUnique({
      where: { userId: userId, isDone: true },
    });
    if (!requestExist) {
      await prisma.request.create({
        data: {
          userId: userId,
          isRequest: true,
          department: department,
          details: details,
          location: location,
        },
      });
    } else {
      await prisma.request.update({
        where: { userId: userId },
        data: {
          isRequest: true,
          isDone: false,
          isResponding: false,
          department: department,
          details: details,
          location: location,
        },
      });
    }

    return NextResponse.json({ code: 200, message: "Help is requested" });
  } catch (error: any) {
    return NextResponse.json({ code: 500, message: error.message });
  }
}
