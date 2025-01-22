"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "@/components/form/FormContainer";
import Alert from "@/components/Alert/Alert";
import { formatDate } from "@/utils/format/Date";
import { redirect } from "next/navigation";

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

export default function Create() {
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
    redirect("/employees");
  }

  const handleConfirm = () => {
    form.handleSubmit(onSubmit)();
  };

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
                options={[
                  {
                    value: "engineering",
                    label: "Engineering",
                  },
                  { value: "hr", label: "HR" },
                  { value: "finance", label: "Finance" },
                ]}
              />
              <FormContainer
                form={form}
                name="role"
                placeholder="Role"
                type="select"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                ]}
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
