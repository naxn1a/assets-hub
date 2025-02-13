import {
  Sidebar as SBar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidebarItem from "@/utils/SidebarItem";
import Link from "next/link";
import SignOut from "./SignOut";

export default function Sidebar() {
  return (
    <SBar className="shadow-2xl">
      <SidebarHeader className="text-2xl font-semibold select-none">
        <Link href="/">Assets Hub</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarItem.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="hover:bg-gray-100 rounded-xl duration-300"
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOut />
      </SidebarFooter>
    </SBar>
  );
}
