import FormEmployee from "@/components/form/FormEmployee";

export default async function CreateEmployee() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Create Employee</h1>
      <FormEmployee back="/employee" />
    </section>
  );
}
