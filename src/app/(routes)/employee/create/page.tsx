import FormEmployee from "@/components/form/FormEmployee";

export default async function CreateEmployee() {
  const coreData = {
    status: "Active",
    department: "",
    role: "",
  };
  const disabled = ["status"];
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Create Employee</h1>
      <FormEmployee back="/employee" coreData={coreData} disabled={disabled} />
    </section>
  );
}
