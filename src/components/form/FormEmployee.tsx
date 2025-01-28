"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "@/components/form/FormContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmployeeData,
  EmployeeStatus,
  EmployeeType,
  formSchema,
} from "@/utils/data/Employee";
import { Form, FormField } from "@/components/ui/form";
import { formatDate } from "@/utils/format/Date";
import Alert from "@/components/alert/Alert";
import { Button } from "../ui/button";
import { fetchData } from "@/utils/fetchData";

const prepareFetchDepartments = async () => await fetchData("department");

const prepareOptions = (data: any) => {
  return data.map((item: any) => {
    return { value: item.id, label: item.name };
  });
};

export default function FormEmployee({
  children,
  buttonName,
  defaultEmployee,
}: {
  children?: React.ReactNode;
  buttonName?: string;
  defaultEmployee?: EmployeeType;
}) {
  const [departments, setDepartments] = useState<any[]>([]);
  const [roles, setRoles] = useState([]);

  const handleDepartmentChange = (value: string) => {
    const department = departments.find((dept: any) => dept.id == value);
    department ? setRoles(department.role) : setRoles([]);
    form.setValue("role", "");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: defaultEmployee?.username || "",
      email: defaultEmployee?.email || "",
      firstname: defaultEmployee?.firstname || "",
      lastname: defaultEmployee?.lastname || "",
      phone: defaultEmployee?.phone || "",
      department: defaultEmployee?.department.toString() || "",
      role: defaultEmployee?.role.toString() || "",
      hiredate: defaultEmployee?.hiredate || "",
      status: defaultEmployee?.status || "",
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
    prepareFetchDepartments().then((data) => {
      setDepartments(data);
      if (defaultEmployee) {
        const department = data.find(
          (dept: any) => dept.id == defaultEmployee.department
        );
        department ? setRoles(department.role) : setRoles([]);
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {EmployeeData.map((data: any, index: number) => (
            <FormField
              key={index}
              control={form.control}
              name={data.name}
              render={({ field }) => {
                return (
                  <FormContainer
                    field={field}
                    name={data.name}
                    placeholder={data.placeholder}
                    type={data.type}
                    options={
                      data.type === "select"
                        ? prepareOptions(
                            data.name === "department"
                              ? departments
                              : data.name === "role"
                              ? roles
                              : data.name === "status"
                              ? EmployeeStatus
                              : []
                          )
                        : []
                    }
                    onSelected={
                      data.name === "department"
                        ? handleDepartmentChange
                        : undefined
                    }
                  />
                );
              }}
            />
          ))}
        </div>
        <div className="my-8 flex gap-4">
          {children}
          <Button type="submit">{buttonName}</Button>
          {/* <Alert
            label="Create Employee"
            title="Are you sure?"
            description="Create employee"
            action={() => form.handleSubmit(onSubmit)()}
          /> */}
        </div>
      </form>
    </Form>
  );
}
