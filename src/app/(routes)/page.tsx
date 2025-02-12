import Card from "@/components/card/Card";
import CardOverview from "@/components/card/CardOverview";
import { User, Package, Power, Wrench } from "lucide-react";
import ChartBar from "@/components/chart/ChartBar";
import ChartPie from "@/components/chart/ChartPie";

const fetchData = async (path: string) => {
  const data = await fetch(`${process.env.API_URL}/api/${path}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    return res.json();
  });

  return data;
};

export default async function Home() {
  const employee = await fetchData("employee");
  const asset = await fetchData("device");
  const apply = await fetchData("borrowing");
  const repair = await fetchData("maintenance-request");

  return (
    <section>
      <div className="grid grid-cols-4 gap-8 mb-8">
        <Card>
          <CardOverview
            title="Employees"
            Icon={User}
            value={employee?.length}
          />
        </Card>
        <Card>
          <CardOverview title="Assets" Icon={Package} value={asset?.length} />
        </Card>
        <Card>
          <CardOverview title="Actives" Icon={Power} value={apply?.length} />
        </Card>
        <Card>
          <CardOverview
            title="Maintenances"
            Icon={Wrench}
            value={repair?.length}
          />
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <ChartBar />
        <ChartPie />
      </div>
    </section>
  );
}
