"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider as SidebarProv,
} from "@/components/ui/sidebar";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import SidebarItem from "@/utils/SidebarItem";
import SignOut from "./SignOut";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>();

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
    });
  }, []);

  return (
    <SidebarProv>
      <Sidebar className="shadow-2xl">
        <SidebarHeader className="text-2xl font-semibold select-none">
          <Link href="/">Assets Hub</Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {SidebarItem.map(
                  (item) =>
                    item.role.includes(session?.user.role) && (
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
                    )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SignOut />
        </SidebarFooter>
      </Sidebar>
      <main className="flex flex-col w-full h-full">
        <Navbar />
        <div className="mx-8">{children}</div>
      </main>
    </SidebarProv>
  );
}
