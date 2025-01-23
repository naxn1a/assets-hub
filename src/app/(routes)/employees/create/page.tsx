"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmployeeData, formSchema } from "@/utils/data/Employee";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formatDate } from "@/utils/format/Date";
import FormContainer from "@/components/form/FormContainer";
import Alert from "@/components/Alert/Alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const fetchDepartments = async () => {
  const res = await fetch(`${process.env.API_URL}/api/department`);
  return await res.json();
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
              {EmployeeData.map((data) => {
                if (data.name === "department") {
                  return (
                    <FormContainer
                      key={data.name}
                      form={form}
                      name={data.name}
                      placeholder={data.placeholder}
                      type={data.type}
                      options={departments.map((dep: any) => ({
                        value: dep.id,
                        label: dep.name,
                      }))}
                      setSelected={setSelected}
                    />
                  );
                }
                if (data.name === "role") {
                  return (
                    <FormContainer
                      key={data.name}
                      form={form}
                      name={data.name}
                      placeholder={data.placeholder}
                      type={data.type}
                      options={roles.map((role: any) => ({
                        value: role.id,
                        label: role.name,
                      }))}
                    />
                  );
                }
                return (
                  <FormContainer
                    key={data.name}
                    form={form}
                    name={data.name}
                    placeholder={data.placeholder}
                    type={data.type}
                  />
                );
              })}
            </div>
            <div className="flex justify-end my-4">
              <Alert
                label="Create Employee"
                title="Are you sure?"
                description="Create employee"
                action={() => form.handleSubmit(onSubmit)()}
              />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
