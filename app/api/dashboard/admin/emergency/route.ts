import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const statusBody = await request.json();
  const { id, status } = statusBody;

  try {
    const existingRequest = await prisma.request.findUnique({
      where: { userId: id },
    });

    if (!existingRequest) {
      return NextResponse.json(
        { message: `Record not found` },
        { status: 404 }
      );
    }

    if (status === "onTheWay") {
      await prisma.request.update({
        where: { userId: id },
        data: { isResponding: true, isRequest: false },
      });
    } else if (status === "success") {
      await prisma.request.update({
        where: { userId: id },
        data: { isResponding: false, isRequest: false, isDone: true },
      });
    } else {
      return NextResponse.json(
        { message: `Invalid status: ${status}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "success" });
  } catch (error: any) {
    console.log(id, status);
    return NextResponse.json({ code: 500, message: error.message });
  }
}
