import Link from "next/link";
import Table from "@/components/table/Table";
import { EmployeeColumns } from "./colums";
import { Button } from "@/components/ui/button";
import { filterEmployee } from "@/utils/data/Employee";

const fetchEmployees = async () => {
  const res = await fetch(`${process.env.API_URL}/api/employee`);
  return res.json();
};

const fetchDepartments = async () => {
  const res = await fetch(`${process.env.API_URL}/api/department`);
  return res.json();
};

const fetchRoles = async () => {
  const res = await fetch(`${process.env.API_URL}/api/role`);
  return res.json();
};

export default async function Employees() {
  const employees = await fetchEmployees();
  const filterDep = filterEmployee("department", await fetchDepartments());
  const filterRole = filterEmployee("role", await fetchRoles());
  const option = {
    search: "username",
    filters: [filterDep, filterRole],
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold">Employees</h1>
      <Table
        columns={EmployeeColumns}
        data={employees}
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
