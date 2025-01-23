import { NextResponse } from "next/server";
import prisma from "@/database";

export async function GET() {
  return NextResponse.json(await prisma.role.findMany());
}
