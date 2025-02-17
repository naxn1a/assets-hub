import SidebarLayout from "@/components/sidebar/SidebarLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
