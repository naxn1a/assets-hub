import Card from "@/components/card/Card";
import CardOverview from "@/components/card/CardOverview";
import { User, Package, Power, Wrench } from "lucide-react";
import ChartBar from "@/components/chart/ChartBar";
import ChartPie from "@/components/chart/ChartPie";

export default function Home() {
  return (
    <section>
      <div className="grid grid-cols-4 gap-8 mb-8">
        <Card>
          <CardOverview title="Users" Icon={User} value="10" />
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
