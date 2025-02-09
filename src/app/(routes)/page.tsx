import Card from "@/components/card/Card";
import CardOverview from "@/components/card/CardOverview";
import { User, Package, Power, Wrench } from "lucide-react";
import ChartBar from "@/components/chart/ChartBar";
import ChartPie from "@/components/chart/ChartPie";
import { Fetch } from "@/utils/Fetch";

export default async function Home() {
  const employee = await Fetch("employee");
  const asset = await Fetch("device");
  const apply = await Fetch("borrowing");
  const repair = await Fetch("maintenance-request");

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
          <CardOverview title="Maintenances" Icon={Wrench} value={repair?.length} />
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <ChartBar />
        <ChartPie />
      </div>
    </section>
  );
}
