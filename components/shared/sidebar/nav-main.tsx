"use client";

import { Home, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href="/">
            <SidebarMenuButton
              tooltip="Home"
              className="cursor-pointer"
              onClick={() => {
                if (isMobile) setOpenMobile(false);
              }}
            >
              <Home />
              Home
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              className="cursor-pointer"
              onClick={() => {
                if (isMobile) setOpenMobile(false);
              }}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
