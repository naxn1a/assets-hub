import { hashPassword } from "@/utils/auth/Hash";
import prisma from ".";

const MasterData = [
  {
    name: "Admin",
    role: [{ name: "Admin" }],
  },
  {
    name: "HR",
    role: [
      { name: "Recruiter" },
      { name: "HR Manager" },
      { name: "Training Coordinator" },
    ],
  },
  {
    name: "Account",
    role: [
      { name: "Accountant" },
      { name: "Financial Analyst" },
      { name: "Auditor" },
    ],
  },
  {
    name: "IT",
    role: [
      { name: "Software Developer" },
      { name: "System Administrator" },
      { name: "IT Support" },
    ],
  },
];

async function main() {
  MasterData.forEach(async (department) => {
    await prisma.department.create({
      data: {
        name: department.name,
        role: {
          create: department.role,
        },
      },
    });
  });

  await prisma.employee.create({
    data: {
      username: "admin",
      email: "admin@assets.hub",
      password: await hashPassword("admin"),
      firstName: "admin",
      lastName: "admin",
      phone: "",
      hireDate: new Date(),
      department_id: 1,
      role_id: 1,
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
