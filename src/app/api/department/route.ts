import prisma from "@/database";
import { SendHandler } from "@/utils/ErrorHandler";

export async function GET() {
  const department = await prisma.department.findMany({
    include: {
      role: true,
    },
  });

  return SendHandler(department);
}
