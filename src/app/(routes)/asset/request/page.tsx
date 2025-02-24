"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyField from "@/components/field/MyField";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const prepareFetchEmployees = async () => {
  const res = await fetch("http://localhost:3000/api/employee");
  const data = await res.json();
  return data.map((item: any) => {
    return { value: item.id, label: item.email };
  });
};

const prepareFetchAssets = async () => {
  const res = await fetch("http://localhost:3000/api/asset/available");
  const data = await res.json();

  const uniqueNames = new Set();
  const removeDup = data.filter((item: any) => {
    if (!uniqueNames.has(item.name)) {
      uniqueNames.add(item.name);
      return true;
    }
    return false;
  });

  return removeDup.map((item: any) => {
    return { value: item.id, label: item.name };
  });
};

export default function RequestAsset() {
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);

  const formSchema = z.object({
    employee: z.string().nonempty({ message: "Employee is required" }),
    asset: z.string().nonempty({ message: "Asset is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee: "",
      asset: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
    };

    const res = await fetch("/api/request", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Request submitted successfully");
      redirect("/asset");
    } else {
      alert("Failed to submit request");
    }
  };

  useEffect(() => {
    prepareFetchEmployees().then((data) => {
      setEmployees(data);
    });
    prepareFetchAssets().then((data) => {
      setAssets(data);
    });
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Request Asset</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <MyField
              form={form}
              name="employee"
              placeholder="Employee"
              type="select"
              options={employees}
            />
            <MyField
              form={form}
              name="asset"
              placeholder="Asset"
              type="select"
              options={assets}
            />
          </div>
          <div className="my-8 flex gap-4">
            <Link href="/asset">
              <Button variant="secondary">Back</Button>
            </Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
