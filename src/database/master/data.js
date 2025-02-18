import { hashPassword } from "@/utils/auth/Hash";
import { formatDate } from "@/utils/Date";

export default async function () {
  const data = [
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
      role: [{ name: "Hr" }],
    },
    {
      name: "Account",
      role: [{ name: "Account" }],
    },
    {
      name: "Information Technology (IT)",
      role: [{ name: "It" }],
    },
  ];

  const admin = {
    username: "admin",
    email: "admin@assets.hub",
    password: await hashPassword("admin"),
    firstname: "admin",
    lastname: "admin",
    phone: "00",
    hiredate: formatDate(new Date()),
    status: "Active",
    department_id: 1,
    role_id: 1,
  };

  return {
    data,
    admin,
  };
}
