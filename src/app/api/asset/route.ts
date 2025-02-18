import prisma from "@/database";
import { AssetStatus } from "@prisma/client";
import { generateUUIDv4 } from "@/utils/GenerateUUID";

export async function GET() {
  return Response.json(
    await prisma.asset.findMany({
      orderBy: {
        created_at: "desc",
      },
    })
  );
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    let lotRecord = await prisma.asset.count({
      where: {
        created_at: {
          gte: new Date(currentYear, now.getMonth(), 1),
          lte: new Date(currentYear, currentMonth, 0),
        },
      },
    });

    const y = currentYear.toString().slice(2, 4);
    const m = `${currentMonth}`.padStart(2, "0");
    const c = `${lotRecord + 1}`.padStart(3, "0");

    const assets = [];
    for (let i = 0; i < data.amount; i++) {
      assets.push({
        lot_number: `LOT${y}${m}${c}`,
        serial_number: generateUUIDv4(),
        name: data.name,
        purchase_date: data.purchase_date,
        warranty_expiry: data.warranty_expiry || null,
        status: AssetStatus.Available,
      });
    }

    const result = await prisma.asset.createMany({
      data: assets,
    });

    if (!result) {
      return Response.json(
        { message: "Failed to create asset" },
        { status: 400 }
      );
    }

    return Response.json({ status: "ok", message: "Asset created" });
  } catch (error) {
    return Response.json({ error }, { status: 400 });
  }
}
