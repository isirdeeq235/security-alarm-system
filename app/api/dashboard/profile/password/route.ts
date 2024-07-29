import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const {
    id,
    data: { currentPassword, newPassword },
  } = requestBody.userData;

  try {
    const checkCurrentPassword = await prisma.user.findUnique({
      where: { id: id },
    });

    const passwordMatched = await bcrypt.compare(
      currentPassword,
      checkCurrentPassword!.password
    );

    if (!passwordMatched)
      return NextResponse.json({
        code: 400,
        message: "Invalid Current Password",
      });
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ code: 200, message: "Password Updated" });
  } catch {
    return NextResponse.json({ code: 200, message: "Internal server error" });
  }
}
