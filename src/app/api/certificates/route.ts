import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { displayOrder: "asc" },
  });
  return NextResponse.json(certificates);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const certificate = await prisma.certificate.create({ data });
  return NextResponse.json(certificate, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...rest } = data;
  const certificate = await prisma.certificate.update({
    where: { id },
    data: rest,
  });
  return NextResponse.json(certificate);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.certificate.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
