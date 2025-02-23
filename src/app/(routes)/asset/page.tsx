import Table from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AllAssetColumns,
  ApproveAssetColumns,
  RequestAssetColumns,
} from "./colums";
import { fetchData } from "@/utils/FetchData";
import RoleTable from "@/components/table/RoleTable";

const prepareAsset = async () => {
  const data = await fetchData({ path: "/asset" });
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

const prepareRequestAsset = async () => {
  const data = await fetchData({ path: "/request" });
  return data.map((item: any) => {
    return {
      id: item.id,
      employee: item.employee.email,
      serial: item.asset.serial_number,
      name: item.asset.name,
      type: item.type,
      status: item.status,
      requester: item.requester.email,
      approved: item?.approved?.email || "",
    };
  });
};

export default async function Asset() {
  const dataAsset = await prepareAsset();
  const dataRequestAsset = await prepareRequestAsset();

  const option = {
    search: ["serial", "name"],
  };

  return (
    <div className="flex flex-col gap-8 mb-8">
      <RoleTable role="It">
        <h1 className="text-3xl font-semibold">Asset</h1>
        <Table columns={AllAssetColumns} data={dataAsset} option={option}>
          <div className="flex justify-end">
            <Link href="/asset/create">
              <Button>New Asset</Button>
            </Link>
          </div>
        </Table>
      </RoleTable>
      <RoleTable role="It">
        <h1 className="text-3xl font-semibold">Report</h1>
        <Table
          columns={ApproveAssetColumns}
          data={dataRequestAsset.filter(
            (item: any) => item.status === "Pending"
          )}
          option={{
            search: ["employee"],
          }}
        ></Table>
      </RoleTable>
      <RoleTable role="Hr">
        <h1 className="text-3xl font-semibold">Request</h1>
        <Table
          columns={RequestAssetColumns}
          data={dataRequestAsset}
          option={{
            search: ["employee"],
          }}
        >
          <div className="flex justify-end">
            <Link href="/asset/request">
              <Button>New Request</Button>
            </Link>
          </div>
        </Table>
      </RoleTable>
    </div>
  );
}
