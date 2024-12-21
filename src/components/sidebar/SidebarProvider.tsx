import { SidebarProvider as SidebarProv } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";
import Navbar from "@/components/navbar/Navbar";

export default function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProv>
      <Sidebar />
      <main className="flex flex-col w-full h-full">
        <Navbar />
        <div className="mx-8">{children}</div>
      </main>
    </SidebarProv>
  );
}
