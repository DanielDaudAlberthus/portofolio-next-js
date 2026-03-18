import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const existing = await prisma.profile.findFirst();

  if (existing) {
    const profile = await prisma.profile.update({
      where: { id: existing.id },
      data,
    });
    return NextResponse.json(profile);
  }

  const profile = await prisma.profile.create({ data });
  return NextResponse.json(profile, { status: 201 });
}
