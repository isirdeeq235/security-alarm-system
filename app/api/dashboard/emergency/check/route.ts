import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { userId } = requestBody;
  try {
    const res = await prisma.request.findUnique({ where: { userId: userId } });
    const isRequest = res?.isRequest;
    const isRespond = res?.isResponding;
    const isDone = res?.isDone;

    if (isRespond) {
      await prisma.request.update({
        where: { userId: userId },
        data: { isRequest: false, isDone: false },
      });
    }
    if (isDone) {
      await prisma.request.update({
        where: { userId: userId },
        data: { isRequest: false, isResponding: false },
      });
    }

    return NextResponse.json({ isRequest, isRespond });
  } catch (error) {
    return NextResponse.json({ code: 500, message: error });
  }
}
