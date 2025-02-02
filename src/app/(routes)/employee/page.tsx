import Link from "next/link";
import Table from "@/components/table/Table";
import { fetchData } from "@/utils/fetchData";
import { EmployeeColumns } from "./colums";
import { Button } from "@/components/ui/button";
import { filterEmployee } from "@/utils/data/Employee";

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
      hiredate: item.hire_date,
      status: item.status,
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
      <h1 className="text-3xl font-semibold">Employee</h1>
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
