import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import ResetPassword from "@/emails/ResetPassword";
import bcrypt from "bcrypt";

import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { matric } = requestBody;

  try {
    const user = await prisma.user.findUnique({
      where: { matric },
    });

    if (!user?.email) {
      return NextResponse.json({
        code: 500,
        message: "Profile not updated",
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
  } catch {
    return NextResponse.json({
      code: 500,
      message: "Internal server error",
    });
  }
}

function generateRandomString(length: number): string {
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "@$!%*?&";

  const allChars = capitalLetters + smallLetters + numbers + specialChars;

  // Ensure each type of character is included
  const resultArray: string[] = [];
  resultArray.push(
    capitalLetters.charAt(Math.floor(Math.random() * capitalLetters.length))
  );
  resultArray.push(
    smallLetters.charAt(Math.floor(Math.random() * smallLetters.length))
  );
  resultArray.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
  resultArray.push(
    specialChars.charAt(Math.floor(Math.random() * specialChars.length))
  );

  // Fill the rest of the length with random characters from allChars
  for (let i = 4; i < length; i++) {
    resultArray.push(
      allChars.charAt(Math.floor(Math.random() * allChars.length))
    );
  }

  // Shuffle the resultArray
  for (let i = resultArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
  }

  return resultArray.join("");
}
