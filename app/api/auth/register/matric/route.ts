import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const matric = requestBody.matric;

  try {
    const checkMatric = await prisma.user.findUnique({
      where: { matric: matric },
    });
    if (checkMatric) return NextResponse.json({ status: 409 });

    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
