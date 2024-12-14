import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode/ModeToggle";

export default function Navbar() {
  return (
    <section className="flex justify-between items-center py-4 px-8">
      <SidebarTrigger />
      <div className="flex items-center space-x-4">
        <h1>Firstname Lastname</h1>
        <ModeToggle />
      </div>
    </section>
  );
}
