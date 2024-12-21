import Sidebar from "@/components/sidebar/SidebarProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar>
      <div>{children}</div>
    </Sidebar>
  );
}
