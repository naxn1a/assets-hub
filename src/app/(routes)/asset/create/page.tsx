import FormAsset from "@/components/form/FormAsset";

export default async function CreateAsset() {
  const coreData = {
    status: "Available",
  };
  const disabled = ["lot", "serial", "status"];
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Create Asset</h1>
      <FormAsset back="/asset" disabled={disabled} coreData={coreData} />
    </section>
  );
}
