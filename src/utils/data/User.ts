import { z } from "zod";

export type UserType = {
  id: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  phone: string;
  hiredate: string;
  status: string;
  department: string;
  role: string;
};

export const filterUser = (name: string, data: any[]) => {
  return {
    name,
    data: data.map((item) => item.name),
  };
};

export const formSchema = z.object({
  email: z.string().email(),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  phone: z.string().min(2).max(50),
  hiredate: z.string().nonempty({ message: "Hire date is required" }),
  status: z.string().nonempty({ message: "Status is required" }),
  department: z.string().nonempty({ message: "Department is required" }),
  role: z.string().nonempty({ message: "Role is required" }),
});

export const Data = [
  {
    name: "email",
    placeholder: "Email",
    type: "text",
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "text",
  },
  {
    name: "firstname",
    placeholder: "Firstname",
    type: "text",
  },
  {
    name: "lastname",
    placeholder: "Lastname",
    type: "text",
  },
  {
    name: "hiredate",
    placeholder: "Hire Date",
    type: "date",
  },
  {
    name: "department",
    placeholder: "Department",
    type: "select",
    options: [],
  },
  {
    name: "role",
    placeholder: "Role",
    type: "select",
    options: [],
  },
  {
    name: "status",
    placeholder: "Status",
    type: "select",
    options: [],
  },
];

export const Status = [
  {
    id: "Active",
    name: "Active",
  },
  {
    id: "Inactive",
    name: "Inactive",
  },
];
