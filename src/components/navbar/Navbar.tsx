import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode/ModeToggle";
import Auth from "./Auth";

export default function Navbar() {
  return (
    <section className="flex justify-between items-center py-4 px-8">
      <SidebarTrigger />
      <div className="flex items-center space-x-4">
        <Auth />
        <ModeToggle />
      </div>
    </section>
  );
}
