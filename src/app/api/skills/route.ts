import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const skills = await prisma.skillCategory.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json(
    skills.map((s) => ({
      ...s,
      items: s.items.split(",").map((i) => i.trim()),
    }))
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const skill = await prisma.skillCategory.create({
    data: {
      ...data,
      items: Array.isArray(data.items) ? data.items.join(", ") : data.items,
    },
  });
  return NextResponse.json(skill, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...rest } = data;
  const skill = await prisma.skillCategory.update({
    where: { id },
    data: {
      ...rest,
      items: Array.isArray(rest.items) ? rest.items.join(", ") : rest.items,
    },
  });
  return NextResponse.json(skill);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.skillCategory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
