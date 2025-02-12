import Table from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AssetColumns as columns } from "./colums";

const fetchData = async (path: string) => {
  const data = await fetch(`${process.env.API_URL}/api/${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });

  return data;
};

const prepareAsset = async () => {
  const data = await fetchData("device");
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
      <h1 className="text-3xl font-semibold">Assets</h1>
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
