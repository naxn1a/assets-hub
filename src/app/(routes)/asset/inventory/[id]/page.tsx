import Form from "@/components/form/FormAsset";
import { fetchData } from "@/utils/FetchData";
import { redirect } from "next/navigation";

const prepareFetchData = async (id: string) => {
  const res = await fetchData({ path: `/asset/${id}` });
  if (res.status === "error") redirect("/asset");
  return {
    ...res.data,
    lot: res.data.lot_number,
    serial: res.data.serial_number,
    purchasedate: res.data.purchase_date,
    warrantyexpiry: res.data.warranty_expiry,
  };
};

const header = {
  title: "Detail Asset",
  href: "/asset/inventory",
  role: ["It"],
};

export default async function DetailAsset({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const coreData = await prepareFetchData((await params).id);
  const disabled = ["lot", "serial", "name", "purchasedate"];
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">{header.title}</h1>
      <Form back={header.href} coreData={coreData} disabled={disabled} />
    </section>
  );
}
