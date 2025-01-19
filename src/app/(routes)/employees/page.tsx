import Table from "@/components/table/Table";
import { EmployeeMock } from "@/utils/data/Employee";
import { EmployeeCol } from "./EmpCol";

export default function Employees() {
  const option = {
    search: "username",
    filters: [
      {
        name: "department",
        data: [
          "Engineering",
          "Management",
          "Design",
          "Quality Assurance",
          "Support",
          "Admin",
        ],
      },
      {
        name: "role",
        data: [
          "Developer",
          "Manager",
          "Designer",
          "Tester",
          "Support",
          "Admin",
        ],
      },
    ],
  };
  return (
    <div>
      <Table columns={EmployeeCol} data={EmployeeMock} option={option} />
    </div>
  );
}
