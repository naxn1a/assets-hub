import FormUser from "@/components/form/FormUser";
import DeptTable from "@/components/table/DeptTable";

export default async function UserCreate() {
  return (
    <DeptTable dept={header.dept}>
      <h1 className="text-2xl font-semibold mb-4">{header.title}</h1>
      <FormUser
        back={header.href}
        coreData={header.coreData}
        disabled={header.disabled}
      />
    </DeptTable>
  );
}

const header = {
  title: "Create User",
  href: "/user",
  dept: ["Human resource"],
  coreData: {
    status: "Active",
    department: "",
    role: "",
  },
  disabled: ["status"],
};
