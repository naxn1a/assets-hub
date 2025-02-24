"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ContainerForm from "@/components/form/ContainerForm";
import { Form, FormField } from "@/components/ui/form";
import { Button } from "../ui/button";
import { formSchema, Data as DataValue, Status } from "@/utils/data/User";
import { fetchData } from "@/utils/FetchData";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const prepareOptions = (data: any) => {
  return data.map((item: any) => {
    return { value: item.id.toString(), label: item.name };
  });
};

export default function FormUser({
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
      email: coreData?.email || "",
      firstname: coreData?.firstname || "",
      lastname: coreData?.lastname || "",
      phone: coreData?.phone || "",
      hiredate: coreData?.hiredate || "",
      status: coreData?.status || "",
      department: coreData?.department || "",
      role: coreData?.role || "",
    },
  });

  const prepareFetchDepartments = async () => {
    const res = await fetchData({ path: "/department" });
    return res.data;
  };

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
    };

    const res = await fetchData({
      path: `/user/${coreData.id ? coreData.id : ""}`,
      body: formData,
    });

    if (res.status === "error") {
      return toast({
        title: "Failed",
        description: res.message,
      });
    }

    toast({
      title: "Success",
      description: "Data has been saved",
    });

    redirect(back);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {DataValue.map((data: any, index: number) => (
            <section key={index}>
              <FormField
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
                              options?.find(
                                (option) => option.name === data.name
                              )?.state || []
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
            </section>
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
