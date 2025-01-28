import { hashPassword } from "@/utils/auth/Hash";
import prisma from ".";

const MasterData = [
  {
    id: 1,
    name: "Admin",
    role: [
      {
        id: 1,
        name: "Admin",
      },
    ],
  },
  {
    id: 2,
    name: "Human resource (HR)",
    role: [
      { id: 2, name: "Recruiter" },
      { id: 3, name: "HR Manager" },
      { id: 4, name: "Training Coordinator" },
    ],
  },
  {
    id: 3,
    name: "Account",
    role: [
      { id: 5, name: "Accountant" },
      { id: 6, name: "Financial Analyst" },
      { id: 7, name: "Auditor" },
    ],
  },
  {
    id: 4,
    name: "Information Technology (IT)",
    role: [
      { id: 8, name: "Software Developer" },
      { id: 9, name: "System Administrator" },
      { id: 10, name: "IT Support" },
    ],
  },
];

async function main() {
  await prisma.$transaction((tx) => {
    return Promise.all(
      MasterData.map(async (department) => {
        await tx.department.create({
          data: {
            name: department.name,
            role: {
              create: department.role,
            },
          },
        });
      })
    );
  });

  await prisma.employee.create({
    data: {
      username: "admin",
      email: "admin@assets.hub",
      password: await hashPassword("admin"),
      first_name: "admin",
      last_name: "admin",
      phone: "0000000000",
      hire_date: new Date(),
      department_id: 2,
      role_id: 2,
    },
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
