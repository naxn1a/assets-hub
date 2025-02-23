import SidebarLayout from "@/components/sidebar/SidebarLayout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
