import Form from "@/components/form/FormEmployee";
import { redirect } from "next/navigation";

const prepareFetchData = async (id: string) => {
  const data = await fetch(`${process.env.API_URL}/api/employee/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });

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

const resetPassword = async (id: string, password: string) => {
  const data = await fetch(
    `${process.env.API_URL}/api/employee/reset/password/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    }
  ).then((res) => res.json());
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
