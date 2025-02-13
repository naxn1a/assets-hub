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
