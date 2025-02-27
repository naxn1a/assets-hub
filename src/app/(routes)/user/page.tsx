import Link from "next/link";
import Table from "@/components/table/Table";
import { UserColumns as columns } from "./colums";
import { Button } from "@/components/ui/button";
import { filterUser } from "@/utils/data/User";
import { fetchData } from "@/utils/FetchData";
import { formatDate } from "@/utils/Date";
import DeptTable from "@/components/table/DeptTable";

const prepareFetchData = async () => {
  const res = await fetchData({ path: "/user" });
  if (!res.data) return [];
  return res.data.map((item: any) => {
    return {
      id: item.id,
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
      phone: item.phone,
      hiredate: formatDate(item.hiredate),
      status: item.status,
      department: item.department.name,
      role: item.role.name,
    };
  });
};

export default async function User() {
  const data = await prepareFetchData();
  const filterDept = filterUser(
    "department",
    (await fetchData({ path: "/department" })).data
  );
  const filterRole = filterUser(
    "role",
    (await fetchData({ path: "/role" })).data
  );

  const options = {
    search: ["email"],
    filters: [filterDept, filterRole],
  };

  return (
    <DeptTable dept={header.dept}>
      <h1 className="text-3xl font-semibold">{header.title}</h1>
      <Table columns={columns} data={data} option={options}>
        <div className="flex justify-end">
          <Link href={header.href}>
            <Button>{header.button}</Button>
          </Link>
        </div>
      </Table>
    </DeptTable>
  );
}

const header = {
  title: "User",
  href: "/user/create",
  button: "New User",
  dept: ["Human resource"],
};
