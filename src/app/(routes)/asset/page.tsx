import Table from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AssetColumns as columns } from "./colums";
import { fetchData } from "@/utils/FetchData";

const prepareAsset = async () => {
  const data = await fetchData({ path: "/asset", auth: true });
  return data.map((item: any) => {
    return {
      id: item.id,
      lot: item.lot_number,
      serial: item.serial_number,
      name: item.name,
      purchasedate: item.purchase_date,
      warrantyexpiry: item.warranty_expiry,
      status: item.status,
    };
  });
};

export default async function Asset() {
  const data = await prepareAsset();

  const option = {
    search: ["serial", "name"],
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Asset</h1>
      <Table columns={columns} data={data} option={option}>
        <div className="flex justify-end">
          <Link href="/asset/create">
            <Button>New</Button>
          </Link>
        </div>
      </Table>
    </div>
  );
}
