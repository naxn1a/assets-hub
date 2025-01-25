import Link from "next/link";
import Table from "@/components/table/Table";
import { EmployeeColumns } from "./colums";
import { Button } from "@/components/ui/button";
import { filterEmployee } from "@/utils/data/Employee";
import { formatDate } from "@/utils/format/Date";

const fetchData = async (url: string) => {
  const res = await fetch(`${process.env.API_URL}/api/${url}`);
  const data = await res.json();
  return data;
};

const prepareEmployee = async () => {
  const data = await fetchData("employee");
  return data.map((item: any) => {
    return {
      id: item.id,
      username: item.username,
      email: item.email,
      firstname: item.first_name,
      lastname: item.last_name,
      phone: item.phone,
      department: item.department.name,
      role: item.role.name,
      hiredate: formatDate(item.hire_date),
    };
  });
};

export default async function Employees() {
  const employees = await prepareEmployee();
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
          <Link href="/employee/create">
            <Button>Create</Button>
          </Link>
        </div>
      </Table>
    </div>
  );
}
