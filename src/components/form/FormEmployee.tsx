"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "@/components/form/FormContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeData, formSchema } from "@/utils/data/Employee";
import { Form } from "@/components/ui/form";
import { formatDate } from "@/utils/format/Date";
import Alert from "@/components/alert/Alert";

const fetchDepartments = async () => {
  const res = await fetch(`${process.env.API_URL}/api/department`);
  return await res.json();
};

interface FormEmployeeProps {
  defaultEmployee?: {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    department: string;
    role: string;
    hiredate: string;
  };
}

export default function FormEmployee({ defaultEmployee }: FormEmployeeProps) {
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
      username: defaultEmployee?.username || "",
      email: defaultEmployee?.email || "",
      firstname: defaultEmployee?.firstname || "",
      lastname: defaultEmployee?.lastname || "",
      phone: defaultEmployee?.phone || "",
      department: defaultEmployee?.department || "",
      role: defaultEmployee?.role || "",
      hiredate: defaultEmployee?.hiredate || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      hiredate: formatDate(values.hiredate),
    };
    console.log(formData);
  }

  useEffect(() => {
    fetchDepartments().then((data) => {
      setDepartments(data);
      // if (defaultEmployee?.role && roles.length === 0) {
      //   data.forEach((dep: any) => {
      //     if (dep.id === defaultEmployee.department) {
      //       setRoles(dep.role);
      //     }
      //   });
      // }
    });
    setRoles(
      departments.find((dep) => dep.id === Number(selected))?.role || []
    );
  }, [selected]);

  return (
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
  );
}
