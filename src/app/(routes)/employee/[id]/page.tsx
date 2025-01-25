import FormEmployee from "@/components/form/FormEmployee";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fetchData = async (params: string) => {
  const res = await fetch(`${process.env.API_URL}/api/employee/${params}`);
  const data = await res.json();
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
      <div className="flex my-4">
        <Link href="/employee">
          <Button>Back</Button>
        </Link>
      </div>
      <FormEmployee defaultEmployee={defaultEmployee} />
    </section>
  );
}
