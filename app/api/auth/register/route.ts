import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import * as Schemas from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const body: Schemas.RegisterType = requestBody.data;

  try {
    const { matric, password } = await Schemas.RegisterSchema.parseAsync(body);
    const hashedPassword = await bcrypt.hash(password, 10);

    const findEmail = await prisma.user.findUnique({
      where: { matric },
    });

    if (findEmail) {
      return NextResponse.json({
        code: 409,
      });
    }

    await prisma.user.create({
      data: {
        matric,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      code: 200,
      message: "Account created Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      code: 500,
      message: error.message,
    });
  }
}
