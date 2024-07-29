import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { id, imageUrl } = requestBody.userData;
  try {
    await prisma.user.update({
      where: { id: id },
      data: { image: imageUrl },
    });

    return NextResponse.json({
      code: 200,
      message: "Profile image  Uploaded",
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "Profile image  not uploaded",
    });
  }
}
