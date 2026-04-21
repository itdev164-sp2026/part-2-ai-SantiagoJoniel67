"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Home, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Overview",
    href: "/",
    icon: Home,
    description: "Developer profile",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderOpen,
    description: "Work and case studies",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Preferences and account",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="gap-3 border-b border-sidebar-border/70 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary/15 text-sm font-semibold text-sidebar-primary">
            JS
          </div>
          <div className="grid flex-1 leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">
              Joniel Santiago
            </span>
            <span className="text-xs text-sidebar-foreground/70">
              ITDEV-164 Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(({ title, href, icon: Icon, description }) => {
                const isActive = pathname === href;

                return (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={description}
                    >
                      <Link href={href} aria-current={isActive ? "page" : undefined}>
                        <Icon />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn("border-t border-sidebar-border/70 p-4") }>
        <div className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
          Built with Next.js and shadcn/ui
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}