"use client";

import * as React from "react";
import {
  BookMarked,
  Heart,
  Home,
  Popcorn,
  TvMinimalPlay,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { User as UserType } from "better-auth";
import { useIsMobile } from "@/hooks/use-mobile";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Watched list",
      url: "#",
      icon: BookMarked,
      isActive: true,
    },
    {
      title: "Watch Next",
      url: "#",
      icon: TvMinimalPlay,
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: Heart,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: {
  user?: UserType;

  props?: React.ComponentProps<typeof Sidebar>;
}) {
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <Sidebar collapsible="icon" {...props} className="z-40">
      <SidebarHeader className="bg-background/90">
        <div className="mt-2">
          <Popcorn />
        </div>
      </SidebarHeader>
      {user ? (
        <SidebarContent className="bg-background/90">
          <NavMain items={data.navMain} />
        </SidebarContent>
      ) : (
        <SidebarContent className="bg-background/90">
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
              <SidebarMenuItem>
                <Link href="/sign-in">
                  <SidebarMenuButton
                    tooltip="Sign in"
                    className="cursor-pointer"
                    onClick={() => {
                      if (isMobile) setOpenMobile(false);
                    }}
                  >
                    <User />
                    Sign in
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      )}

      {user ? (
        <SidebarFooter className="bg-background/90">
          <NavUser user={user} />
        </SidebarFooter>
      ) : null}
      <SidebarRail />
    </Sidebar>
  );
}
