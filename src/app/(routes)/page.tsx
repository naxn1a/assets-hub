import Card from "@/components/card/Card";
import CardOverview from "@/components/card/CardOverview";
import { User, Package, Power, Wrench } from "lucide-react";
import ChartBar from "@/components/chart/ChartBar";
import ChartPie from "@/components/chart/ChartPie";
import { fetchData } from "@/utils/FetchData";

export default async function Home() {
  const employee = await fetchData({ path: "/employee", auth: true });
  const asset = await fetchData({ path: "/asset", auth: true });

  return (
    <section>
      <div className="grid grid-cols-4 gap-8 mb-8">
        <Card>
          <CardOverview title="Employee" Icon={User} value={employee?.length} />
        </Card>
        <Card>
          <CardOverview
            title="Available"
            Icon={Package}
            value={asset?.length}
          />
        </Card>
        <Card>
          <CardOverview title="Assigned" Icon={Power} value={"0"} />
        </Card>
        <Card>
          <CardOverview title="Under Repair" Icon={Wrench} value={"0"} />
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <ChartBar />
        <ChartPie />
      </div>
    </section>
  );
}
