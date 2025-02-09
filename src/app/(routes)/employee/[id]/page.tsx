import Form from "@/components/form/FormEmployee";
import { Fetch } from "@/utils/Fetch";
import { redirect } from "next/navigation";

const prepareFetchData = async (id: string) => {
  const data = await Fetch("employee", id);
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

export default async function DetailEmployee({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coreData = await prepareFetchData((await params).id);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Detail Employee</h1>
      <Form back="/employee" coreData={coreData} />
    </section>
  );
}
