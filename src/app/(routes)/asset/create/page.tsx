"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MyField from "@/components/Field/MyField";
import { formatDate } from "@/utils/Date";

export default function CreateAsset() {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    amount: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => val > 0, { message: "Amount must be greater than 0" }),
    purchasedate: z.string().nonempty({ message: "Purchase date is required" }),
    warrantyexpiry: z.optional(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      purchasedate: "",
      warrantyexpiry: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      purchase_date: formatDate(values.purchasedate),
      warranty_expiry: values.warrantyexpiry
        ? formatDate(values.warrantyexpiry)
        : null,
    };

    const res = await fetch("/api/asset", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      form.reset();
      alert(data.message);
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Create Asset</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <MyField form={form} name="name" placeholder="Name" type="text" />
            <MyField
              form={form}
              name="amount"
              placeholder="Amount"
              type="text"
            />
            <MyField
              form={form}
              name="purchasedate"
              placeholder="Purchase Date"
              type="date"
            />
            <MyField
              form={form}
              name="warrantyexpiry"
              placeholder="Warranty Expiry"
              type="date"
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
