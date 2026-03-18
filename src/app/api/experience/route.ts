import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json(
    experiences.map((e) => ({
      ...e,
      description: JSON.parse(e.description),
    }))
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const experience = await prisma.experience.create({
    data: {
      ...data,
      description: JSON.stringify(data.description),
    },
  });
  return NextResponse.json(experience, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...rest } = data;
  const experience = await prisma.experience.update({
    where: { id },
    data: {
      ...rest,
      description: Array.isArray(rest.description)
        ? JSON.stringify(rest.description)
        : rest.description,
    },
  });
  return NextResponse.json(experience);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.experience.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
