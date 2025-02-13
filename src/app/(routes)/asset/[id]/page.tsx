import Form from "@/components/form/FormAsset";
import { fetchData } from "@/utils/FetchData";
import { redirect } from "next/navigation";

const prepareFetchData = async (id: string) => {
  const data = await fetchData({ path: `/asset/${id}`, auth: true });
  if (!data) redirect("/asset");
  return {
    id: data.id,
    lot: data.lot_number,
    serial: data.serial_number,
    name: data.name,
    purchasedate: data.purchase_date,
    warrantyexpiry: data.warranty_expiry,
    status: data.status,
  };
};

export default async function DetailAsset({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coreData = await prepareFetchData((await params).id);
  const disabled = ["lot", "serial", "name", "purchasedate", "status"];
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Detail Asset</h1>
      <Form back="/asset" coreData={coreData} disabled={disabled} />
    </section>
  );
}
