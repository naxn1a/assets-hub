import Table from "@/components/table/Table";
import { ReportColumns as columns } from "./colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchData } from "@/utils/FetchData";
import RoleTable from "@/components/table/RoleTable";
import { AuditLogStatus } from "@prisma/client";

const prepareFetchData = async () => {
  const res = await fetchData({
    method: "POST",
    path: "/audit/status",
    body: { status: [AuditLogStatus.Pending] },
  });

  if (!res.data) return [];

  return res.data.map((item: any) => {
    return {
      ...res.data,
      user: item.user?.email,
      serial: item.asset?.serial_number,
      name: item.asset?.name,
      type: item.type,
      status: item.status,
      reported_by: item.reported_by?.email,
    };
  });
};

const header = {
  title: "Report",
  href: "/asset/inventory/create",
  button: "New Asset",
  role: ["It"],
};

export default async function Report() {
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
