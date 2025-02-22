import prisma from ".";
import masterData from "./master/data.json";
import { hashPassword } from "@/utils/auth/Hash";
import { UserStatus } from "@prisma/client";

async function main() {
  await prisma.$transaction(async (tx) => {
    masterData.forEach(async (dept) => {
      await tx.department.create({
        data: {
          name: dept.name,
          role: {
            create: dept.role,
          },
        },
      });
    });

    const dept = await tx.department.findFirst({
      where: {
        name: "Admin",
      },
      include: {
        role: true,
      },
    });

    await tx.user.create({
      data: {
        email: "admin@assets.hub",
        password: await hashPassword("admin"),
        firstname: "admin",
        lastname: "admin",
        phone: "00",
        hiredate: new Date(),
        status: UserStatus.Active,
        department_id: dept!.id,
        role_id: dept?.role.find((r) => r.name === "Admin")?.id || "",
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
