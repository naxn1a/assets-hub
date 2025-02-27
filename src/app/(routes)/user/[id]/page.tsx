import Form from "@/components/form/FormUser";
import DeptTable from "@/components/table/DeptTable";
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
  const data = await prepareUser((await params).id);

  return (
    <DeptTable dept={header.dept}>
      <h1 className="text-2xl font-semibold mb-4">{header.title}</h1>
      <Form back={header.href} coreData={data} />
    </DeptTable>
  );
}

const header = {
  title: "Detail User",
  href: "/user",
  dept: ["Human resource"],
};
