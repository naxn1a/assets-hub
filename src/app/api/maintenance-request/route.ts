import prisma from "@/database";

export async function GET() {
  return Response.json(await prisma.maintenanceRequest.findMany());
}
