import Link from "next/link";
import Table from "@/components/table/Table";
import { EmployeeColumns } from "./colums";
import { Button } from "@/components/ui/button";
import { filterEmployee } from "@/utils/data/Employee";

const fetchData = async (url: string) => {
  const res = await fetch(`${process.env.API_URL}/api/${url}`);
  const data = await res.json();
  return data;
};

export default async function Employees() {
  const employees = await fetchData("employee");
  const filterDep = filterEmployee("department", await fetchData("department"));
  const filterRole = filterEmployee("role", await fetchData("role"));
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
