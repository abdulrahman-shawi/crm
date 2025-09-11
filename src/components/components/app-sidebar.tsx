'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, Package, ShoppingCart, CalendarDays, LayoutDashboard } from "lucide-react";
import { ComboboxDemo } from "./combobox";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/utils/sys";


// Menu items can stay outside as they are static data
const items = [
  {
    title: "الصفحة الرئيسية",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "عملائي",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "المنتجات",
    url: "/dashboard/items",
    icon: Package,
  },
  {
    title: "الطلبات",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "التقويم",
    url: "/dashboard/calnder",
    icon: CalendarDays,
  },
  {
    title: "الصلاحيات",
    url: "/dashboard/permissions",
    icon: CalendarDays,
  },
  {
    title: "الموظفين",
    url: "/dashboard/employees",
    icon: CalendarDays,
  },
];

export function AppSidebar() {
  // 👇 All hooks and logic are now INSIDE the component function
  const {name, ID} = useUser();


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-center block my-4 text-xl ">SKYNOVA</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col justify-between h-[88vh]">
            <SidebarMenu className="mt-10">
              {items.map((item) => (
                <SidebarMenuItem className="hover:pr-3 duration-300" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <ComboboxDemo />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}