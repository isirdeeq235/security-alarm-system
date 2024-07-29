import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const {
    id,
    data: { name, email },
  } = requestBody.userData;
  try {
    const findEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (findEmail) {
      return NextResponse.json({ code: 409, message: "Email Exist" });
    }
    await prisma.user.update({
      where: { id: id },
      data: { name: name, email: email },
    });

    return NextResponse.json({ code: 200, message: "Acccount Updated" });
  } catch (error) {
    return NextResponse.json({ code: 500, message: error });
  }
}
