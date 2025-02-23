import Table from "@/components/table/Table";
import { InventoryColumns as columns } from "./colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchData } from "@/utils/FetchData";
import RoleTable from "@/components/table/RoleTable";
import { formatDate } from "@/utils/Date";

const prepareFetchData = async () => {
  const res = await fetchData({ path: "/asset" });
  return res.data.map((item: any) => {
    return {
      id: item.id,
      lot: item.lot_number,
      serial: item.serial_number,
      name: item.name,
      purchasedate: formatDate(item.purchase_date),
      warrantyexpiry: item.warranty_expiry && formatDate(item.warranty_expiry),
      status: item.status,
      user: item.user?.email || "",
    };
  });
};

const header = {
  title: "Inventory",
  href: "/asset/inventory/create",
  button: "New Asset",
  role: ["It"],
};

export default async function Asset() {
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
