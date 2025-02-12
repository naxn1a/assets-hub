import Link from "next/link";
import Table from "@/components/table/Table";
import { EmployeeColumns as columns } from "./colums";
import { Button } from "@/components/ui/button";
import { filterEmployee } from "@/utils/data/Employee";

const fetchData = async (path: string) => {
  const data = await fetch(`${process.env.API_URL}/api/${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });

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
      hiredate: item.hire_date,
      status: item.status,
    };
  });
};

export default async function Employees() {
  const data = await prepareEmployee();
  const filterDept = filterEmployee(
    "department",
    await fetchData("department")
  );
  const filterRole = filterEmployee("role", await fetchData("role"));

  const option = {
    search: ["username"],
    filters: [filterDept, filterRole],
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold">Employee</h1>
      <Table columns={columns} data={data} option={option}>
        <div className="flex justify-end">
          <Link href="/employee/create">
            <Button>New</Button>
          </Link>
        </div>
      </Table>
    </div>
  );
}
