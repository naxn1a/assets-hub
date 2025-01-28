import FormEmployee from "@/components/form/FormEmployee";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/utils/fetchData";
import Link from "next/link";
import { redirect } from "next/navigation";

const getData = async (id: string) => {
  const data = await fetchData("employee", id);
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
    status: data.status,
  };
};

export default async function EditEmployee({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const defaultEmployee = await getData((await params).id);
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
