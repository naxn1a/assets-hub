import Card from "@/components/card/Card";
import CardOverview from "@/components/card/CardOverview";
import { User, Package, Power, Wrench } from "lucide-react";
import ChartBar from "@/components/chart/ChartBar";
import ChartPie from "@/components/chart/ChartPie";

const fetchData = async (url: string) => {
  const res = await fetch(`${process.env.API_URL}/api/${url}`);
  return await res.json();
};

export default async function Home() {
  const employee = await fetchData("employee");
  // const asset = await fetchData("asset");
  // const apply = await fetchData("apply");
  // const repair = await fetchData("repair");

  return (
    <section>
      <div className="grid grid-cols-4 gap-8 mb-8">
        <Card>
          <CardOverview title="Employees" Icon={User} value={employee.length} />
        </Card>
        <Card>
          <CardOverview title="Assets" Icon={Package} value="20" />
        </Card>
        <Card>
          <CardOverview title="Applies" Icon={Power} value="30" />
        </Card>
        <Card>
          <CardOverview title="Repairs" Icon={Wrench} value="40" />
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <ChartBar />
        <ChartPie />
      </div>
    </section>
  );
}
