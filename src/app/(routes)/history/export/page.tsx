"use client";
import MyField from "@/components/field/MyField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuditLogStatus, AuditLogType } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

function convertToOptions(obj: Record<string, string>) {
  return Object.keys(obj).map((key) => ({
    value: obj[key],
    label: obj[key],
  }));
}

const AuditLogTypeOptions = convertToOptions(AuditLogType);
const AuditLogStatusOptions = convertToOptions(AuditLogStatus);

export default function page() {
  const formSchema = z.object({
    audit_type: z.array(z.string()), // เพิ่มฟิลด์สำหรับเก็บ AuditLogTypeOptions
    audit_status: z.array(z.string()), // เพิ่มฟิลด์สำหรับเก็บ AuditLogStatusOptions
    start_date: z.string(),
    end_date: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audit_type: [], // กำหนดค่าเริ่มต้นเป็น Array ว่าง
      audit_status: [], // กำหนดค่าเริ่มต้นเป็น Array ว่าง
      start_date: "",
      end_date: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
    };

    console.log(formData);
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold">{header.title}</h1>
      <div className="my-8">
        <Form {...form}>
          <Button onClick={() => form.reset()}>Clear</Button>
          <hr className="my-4" />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p>Audit Type</p>
                {AuditLogTypeOptions.map((option) => (
                  <MyField
                    key={option.value}
                    form={form}
                    name="audit_type" // ใช้ชื่อฟิลด์เดียวกันสำหรับทุก checkbox
                    options={option}
                    type="checkbox"
                  />
                ))}
              </div>
              <div>
                <p>Audit Status</p>
                {AuditLogStatusOptions.map((option) => (
                  <MyField
                    key={option.value}
                    form={form}
                    name="audit_status" // ใช้ชื่อฟิลด์เดียวกันสำหรับทุก checkbox
                    options={option}
                    type="checkbox"
                  />
                ))}
              </div>
              <MyField
                form={form}
                name="start_date"
                placeholder="Start Date"
                type="date"
              />
              <MyField
                form={form}
                name="end_date"
                placeholder="End Date"
                type="date"
              />
            </div>
            <div className="my-8 flex gap-4">
              <Link href={header.href}>
                <Button variant="secondary">Back</Button>
              </Link>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

const header = {
  title: "Export History",
  href: "/history",
};
