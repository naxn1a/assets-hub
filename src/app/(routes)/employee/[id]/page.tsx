import FormEmployee from "@/components/form/FormEmployee";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

const fetchData = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/employee/${id}`);
  const data = await res.json();
  if (!data) redirect("/employee");
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstname: data.first_name,
    lastname: data.last_name,
    phone: data.phone,
    department: data.department.id,
    role: data.role.id,
    hiredate: data.hire_date,
  };
};

export default async function EditEmployee({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const defaultEmployee = await fetchData((await params).id);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Edit Employee</h1>
      <FormEmployee
        defaultEmployee={defaultEmployee}
        buttonName="Update Employee"
      >
        <Link href="/employee">
          <Button variant={"secondary"}>Back</Button>
        </Link>
      </FormEmployee>
    </section>
  );
}
