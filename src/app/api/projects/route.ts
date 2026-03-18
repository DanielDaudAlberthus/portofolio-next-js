import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json(
    projects.map((p) => ({
      ...p,
      tech: p.tech.split(",").map((t) => t.trim()),
    }))
  );
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const project = await prisma.project.create({
    data: {
      ...data,
      tech: Array.isArray(data.tech) ? data.tech.join(", ") : data.tech,
    },
  });
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...rest } = data;
  const project = await prisma.project.update({
    where: { id },
    data: {
      ...rest,
      tech: Array.isArray(rest.tech) ? rest.tech.join(", ") : rest.tech,
    },
  });
  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
