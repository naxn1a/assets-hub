import Form from "@/components/form/FormUser";
import { fetchData } from "@/utils/FetchData";
import { redirect } from "next/navigation";

const prepareUser = async (id: string) => {
  const res = await fetchData({ path: `/user/${id}` });
  if (res.status === "error") redirect("/user");
  return {
    ...res.data,
    department: res.data.department.id,
    role: res.data.role.id,
  };
};

const resetPassword = async (id: string, password: string) => {
  const data = await fetchData({
    path: `/user/reset/password/${id}`,
    body: { password },
  });
};

export default async function UserDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coreData = await prepareUser((await params).id);
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Detail User</h1>
      <Form back="/user" coreData={coreData} />
    </section>
  );
}
