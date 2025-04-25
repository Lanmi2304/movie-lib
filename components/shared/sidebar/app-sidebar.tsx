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
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Watched",
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
      url: "#",
      icon: Heart,
    },
  ],
};

// TODO: refactor user type
export function AppSidebar({
  user,
  ...props
}: {
  user:
    | {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        image?: string | null | undefined | undefined;
      }
    | undefined;
  props?: React.ComponentProps<typeof Sidebar>;
}) {
  return (
    <Sidebar collapsible="icon" {...props} className="z-40">
      <SidebarHeader className="bg-background">
        <div className="mt-2">
          <Popcorn />
        </div>
      </SidebarHeader>
      {user ? (
        <SidebarContent className="bg-background">
          <NavMain items={data.navMain} />
        </SidebarContent>
      ) : (
        <SidebarContent className="bg-background">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton tooltip="Home" className="cursor-pointer">
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

      <SidebarFooter className="bg-background">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
