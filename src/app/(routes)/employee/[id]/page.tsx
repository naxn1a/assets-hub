import Form from "@/components/form/FormEmployee";
import { fetchData } from "@/utils/FetchData";
import { redirect } from "next/navigation";

const prepareEmployee = async (id: string) => {
  const data = await fetchData({ path: `/employee/${id}`, auth: true });
  if (!data) redirect("/employee");
  return data.map((item: any) => {
    return {
      id: item.id,
      username: item.username,
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
      phone: item.phone,
      hiredate: item.hiredate,
      status: item.status,
      department: item.department.name,
      role: item.role.name,
    };
  });
};

const resetPassword = async (id: string, password: string) => {
  const data = await fetchData({
    path: `/employee/reset/password/${id}`,
    body: { password },
    auth: true,
  });
};

export default async function DetailEmployee({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coreData = await prepareEmployee((await params).id);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Detail Employee</h1>
      <Form back="/employee" coreData={coreData} />
    </section>
  );
}
