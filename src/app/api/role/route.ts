import prisma from "@/database";
import { SendHandler } from "@/utils/ErrorHandler";

export async function GET() {
  const role = await prisma.role.findMany();

  return SendHandler(role);
}
