import Link from "next/link";
import Table from "@/components/table/Table";
import { EmployeeMock } from "@/utils/data/Employee";
import { EmployeeColumns } from "./colums";
import { Button } from "@/components/ui/button";

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
      <h1 className="text-3xl font-semibold">Employees</h1>
      <Table
        columns={EmployeeColumns}
        data={EmployeeMock}
        search="username"
        option={option}
      >
        <div className="flex justify-end">
          <Link href="/employees/create">
            <Button>Create</Button>
          </Link>
        </div>
      </Table>
    </div>
  );
}
