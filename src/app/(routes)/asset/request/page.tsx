import Table from "@/components/table/Table";
import { RequestColumns as columns } from "./colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchData } from "@/utils/FetchData";
import RoleTable from "@/components/table/RoleTable";

const prepareFetchData = async () => {
  const res = await fetchData({
    method: "GET",
    path: "/audit",
  });

  if (!res.data) return [];

  return res.data.map((item: any) => ({
    id: item.id,
    user: item.user?.email,
    serial: item.asset?.serial_number,
    name: item.asset?.name,
    type: item.type,
    status: item.status,
    reported_by: item.reported_by?.email,
    handled_by: item.handled_by?.email || "-",
  }));
};

const header = {
  title: "Request Asset",
  href: "/asset/request/create",
  button: "New Request",
  role: ["It"],
};

export default async function Request() {
  const data = await prepareFetchData();

  const option = {
    search: ["serial", "name"],
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      <RoleTable role="It">
        <h1 className="text-3xl font-semibold">{header.title}</h1>
        <Table columns={columns} data={data} option={option}>
          <div className="flex justify-end">
            <Link href={header.href}>
              <Button>{header.button}</Button>
            </Link>
          </div>
        </Table>
      </RoleTable>
    </div>
  );
}
