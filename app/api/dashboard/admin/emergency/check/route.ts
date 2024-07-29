import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const allRequests = await prisma.request.findMany();

  for (const req of allRequests) {
    const { userId, isRequest, isResponding, isDone } = req;

    if (isResponding) {
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
  }

  await prisma.request.findMany();

  return NextResponse.json({});
}
