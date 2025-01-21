import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const user = await client.users.create({
   // @ts-ignore
    data: {
      username: body.username,
      password: body.password,
    },
  });

  console.log(user.id);

  return NextResponse.json({ message: "Signed up" });
}