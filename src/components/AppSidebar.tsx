"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  LayoutDashboard,
  ShieldCheck,
  CalendarDays,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/NavMain";
import { NavUser } from "@/components/NavUser";
import { TeamSwitcher } from "@/components/TeamSwitcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User } from "@supabase/supabase-js";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User | null;
};

export const data = {
  teams: [
    {
      name: "EarlyDoors",
      logo: GalleryVerticalEnd,
      plan: "San Diego",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: CalendarDays,
    },
    {
      title: "Venues",
      url: "/dashboard/venues",
      icon: MapPin,
    },
    {
      title: "Clubs",
      url: "/dashboard/clubs",
      icon: Trophy,
    },
    {
      title: "Supporter Groups",
      url: "/dashboard/supportersGroups",
      icon: Users,
    },
    {
      title: "Moderation",
      url: "/dashboard/moderation",
      icon: ShieldCheck,
    },
  ],
};

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {props.user && <NavUser user={props.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
