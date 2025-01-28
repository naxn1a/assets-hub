import { z } from "zod";

export type EmployeeType = {
  id: string;
  username: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  department: string;
  phone: string;
  role: string;
  hiredate: string;
};

export const filterEmployee = (name: string, data: any[]) => {
  return {
    name,
    data: data.map((item) => item.name),
  };
};

export const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  phone: z.string().regex(/^[0-9]{10}$/, {
    message: "Invalid phone number",
  }),
  department: z.string().nonempty({ message: "Department is required" }),
  role: z.string().nonempty({ message: "Role is required" }),
  hiredate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid date",
  }),
});

export const EmployeeData = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
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
    name: "phone",
    placeholder: "Phone",
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
];
