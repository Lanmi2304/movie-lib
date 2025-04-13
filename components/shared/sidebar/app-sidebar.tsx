"use client";

import * as React from "react";
import { BookMarked, Heart, Popcorn, TvMinimalPlay } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="relative z-40 overflow-hidden rounded-xl bg-transparent"
    >
      <SidebarHeader className="bg-background">
        <div className="mt-2">
          <Popcorn />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
