import FormUser from "@/components/form/FormUser";

export default async function UserCreate() {
  const coreData = {
    status: "Active",
    department: "",
    role: "",
  };
  const disabled = ["status"];

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Create User</h1>
      <FormUser back="/user" coreData={coreData} disabled={disabled} />
    </section>
  );
}
