import prisma from ".";
import { EmployeeStatus } from "@prisma/client";
import Master from "@/database/master/data";

async function main() {
  const master = await Master();
  await prisma.$transaction(async (tx) => {
    master.data.forEach(async (dept) => {
      await tx.department.create({
        data: {
          name: dept.name,
          role: {
            create: dept.role,
          },
        },
      });
    });

    await tx.employee.create({
      data: {
        ...master.admin,
        status: master.admin.status as EmployeeStatus,
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
