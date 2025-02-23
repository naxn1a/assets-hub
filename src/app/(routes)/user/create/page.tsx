import FormUser from "@/components/form/FormUser";

const header = {
  title: "Create User",
  href: "/user",
  role: ["HR"],
};

export default async function UserCreate() {
  const coreData = {
    status: "Active",
    department: "",
    role: "",
  };
  const disabled = ["status"];

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">{header.title}</h1>
      <FormUser back={header.href} coreData={coreData} disabled={disabled} />
    </section>
  );
}
