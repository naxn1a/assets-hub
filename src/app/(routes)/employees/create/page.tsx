"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "@/components/form/FormContainer";
import Alert from "@/components/Alert/Alert";
import { formatDate } from "@/utils/format/Date";

const formSchema = z.object({
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

const fetchDepartments = async () => {
  const res = await fetch(`${process.env.API_URL}/api/department`);
  return res.json();
};

export default function Create() {
  const [departments, setDepartments] = useState<
    {
      id: number;
      name: string;
      role: { id: number; name: string }[];
    }[]
  >([]);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [selected, setSelected] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
      department: "",
      role: "",
      hiredate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      hiredate: formatDate(new Date(values.hiredate)),
    };
    console.log(formData);
  }

  const handleConfirm = () => {
    form.handleSubmit(onSubmit)();
  };

  useEffect(() => {
    fetchDepartments().then((data) => setDepartments(data));
    setRoles(
      departments.find((dep) => dep.id === Number(selected))?.role || []
    );
  }, [selected]);

  return (
    <section>
      <Link className="flex my-4" href="/employees">
        <Button>Back</Button>
      </Link>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormContainer
                form={form}
                name="username"
                placeholder="Username"
                type="text"
              />
              <FormContainer
                form={form}
                name="email"
                placeholder="Email"
                type="text"
              />
              <FormContainer
                form={form}
                name="firstname"
                placeholder="First Name"
                type="text"
              />
              <FormContainer
                form={form}
                name="lastname"
                placeholder="Last Name"
                type="text"
              />
              <FormContainer
                form={form}
                name="phone"
                placeholder="Phone"
                type="text"
              />
            </div>
            <div className="grid gap-4">
              <FormContainer
                form={form}
                name="department"
                placeholder="Department"
                type="select"
                options={departments.map((dep: any) => ({
                  value: dep.id,
                  label: dep.name,
                }))}
                setSelected={setSelected}
              />
              <FormContainer
                form={form}
                name="role"
                placeholder="Role"
                type="select"
                options={roles?.map((role: any) => ({
                  value: role.id,
                  label: role.name,
                }))}
              />
              <FormContainer
                form={form}
                name="hiredate"
                placeholder="Hire Date"
                type="date"
              />
            </div>

            <div className="flex justify-end my-4">
              <Alert
                label="Create Employee"
                title="Are you sure?"
                description="Create employee"
                action={handleConfirm}
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
