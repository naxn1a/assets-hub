import prisma from "@/database";
import { SendHandler } from "@/utils/ErrorHandler";

export async function GET() {
  const result = await prisma.role.findMany();

  return SendHandler(result);
}
