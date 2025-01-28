import { hashPassword } from "@/utils/auth/Hash";
import prisma from ".";
import { generateUUIDv4 } from "@/utils/uuid/GenerateUUID";
import { getFullYear } from "@/utils/format/Date";

const MasterData = [
  {
    name: "Admin",
    role: [
      {
        name: "Admin",
      },
    ],
  },
  {
    name: "Human resource (HR)",
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
    name: "Information Technology (IT)",
    role: [
      { name: "Software Developer" },
      { name: "System Administrator" },
      { name: "IT Support" },
    ],
  },
];

const MockDevices = [
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: getFullYear(),
    warranty_expiry: getFullYear(),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: getFullYear(),
    warranty_expiry: getFullYear(),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: getFullYear(),
    warranty_expiry: getFullYear(),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Macbook Pro2025`,
    purchase_date: getFullYear(),
    warranty_expiry: getFullYear(),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Notebook 2019`,
    purchase_date: getFullYear(),
    warranty_expiry: getFullYear(),
    status: "Available",
  },
  {
    lot_number: "LOT2025010001",
    serial_number: generateUUIDv4(),
    name: `Notebook 2019`,
    purchase_date: getFullYear(),
    warranty_expiry: getFullYear(),
    status: "Available",
  },
];

const MasterAdmin = {
  username: "admin",
  email: "admin@assets.hub",
  password: await hashPassword("admin"),
  first_name: "admin",
  last_name: "admin",
  phone: "0000000000",
  hire_date: getFullYear(),
  status: "Active",
  department_id: 1,
  role_id: 1,
};

async function main() {
  await prisma.$transaction(async (tx) => {
    MasterData.forEach(async (dept) => {
      await tx.department.create({
        data: {
          name: dept.name,
          role: {
            create: dept.role,
          },
        },
      });
    });

    await tx.device.createMany({
      data: [...MockDevices],
    });

    await tx.employee.create({
      data: MasterAdmin,
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
