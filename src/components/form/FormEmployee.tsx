"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ContainerForm from "@/components/form/ContainerForm";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "../ui/button";
import { formSchema, Data as DataValue, Status } from "@/utils/data/Employee";
import { formatDate } from "@/utils/Date";
import { Fetch } from "@/utils/Fetch";
import { redirect } from "next/navigation";

const prepareOptions = (data: any) => {
  return data.map((item: any) => {
    return { value: item.id.toString(), label: item.name };
  });
};

export default function FormEmployee({
  back,
  coreData,
  disabled,
}: {
  back: string;
  coreData?: any;
  disabled?: string[];
}) {
  const [departments, setDepartments] = useState<any[]>([]);
  const [roles, setRoles] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: coreData?.username || "",
      email: coreData?.email || "",
      firstname: coreData?.firstname || "",
      lastname: coreData?.lastname || "",
      phone: coreData?.phone || "",
      department: coreData?.department.toString() || "",
      role: coreData?.role.toString() || "",
      hiredate: coreData?.hiredate || "",
      status: coreData?.status || "",
    },
  });

  const prepareFetchDepartments = async () => await Fetch("department");

  const handleDepartmentChange = (value: string) => {
    const department = departments.find((dept: any) => dept.id == value);
    department ? setRoles(department.role) : setRoles([]);
    form.setValue("role", "");
  };

  const options = [
    {
      name: "department",
      state: departments,
    },
    {
      name: "role",
      state: roles,
    },
    {
      name: "status",
      state: Status,
    },
  ];

  useEffect(() => {
    prepareFetchDepartments().then((dept) => {
      setDepartments(dept);
      if (coreData) {
        const department = dept.find((d: any) => d.id == coreData.department);
        department ? setRoles(department.role) : setRoles([]);
      }
    });
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      hiredate: formatDate(values.hiredate),
    };

    const res = await fetch(`/api/employee/${coreData.id ? coreData.id : ""}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.status === "ok") {
      alert(data.message);
      // redirect("/employee");
    } else {
      alert(data.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {DataValue.map((data: any, index: number) => (
            <FormField
              key={index}
              control={form.control}
              name={data.name}
              render={({ field }) => {
                return (
                  <ContainerForm
                    field={field}
                    name={data.name}
                    placeholder={data.placeholder}
                    type={data.type}
                    options={
                      data.type === "select"
                        ? prepareOptions(
                            options?.find((option) => option.name === data.name)
                              ?.state || []
                          )
                        : []
                    }
                    onSelected={
                      data.name === "department"
                        ? handleDepartmentChange
                        : undefined
                    }
                    disabled={disabled?.includes(data.name)}
                  />
                );
              }}
            />
          ))}
        </div>
        <div className="my-8 flex gap-4">
          {back && (
            <Link href={back}>
              <Button variant={"secondary"}>Back</Button>
            </Link>
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
