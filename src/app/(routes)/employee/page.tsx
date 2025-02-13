import Link from "next/link";
import Table from "@/components/table/Table";
import { EmployeeColumns as columns } from "./colums";
import { Button } from "@/components/ui/button";
import { filterEmployee } from "@/utils/data/Employee";
import { fetchData } from "@/utils/FetchData";

const prepareEmployee = async () => {
  const data = await fetchData({ path: "/employee", auth: true });
  return data.map((item: any) => {
    return {
      id: item.id,
      username: item.username,
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
      phone: item.phone,
      hiredate: item.hiredate,
      status: item.status,
      department: item.department.name,
      role: item.role.name,
    };
  });
};

export default async function Employees() {
  const data = await prepareEmployee();
  const filterDept = filterEmployee(
    "department",
    await fetchData({ path: "/department", auth: true })
  );
  const filterRole = filterEmployee(
    "role",
    await fetchData({ path: "/role", auth: true })
  );

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
