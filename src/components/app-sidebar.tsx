"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Home, LogOut, Settings } from "lucide-react";

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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions";
import type { AppUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Overview",
    href: "/",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

type AppSidebarProps = {
  user: AppUser | null;
};

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader className="gap-3 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-sidebar-foreground/60">
            ITDEV-164
          </p>
          <h1 className="text-lg font-semibold tracking-tight text-sidebar-foreground">
            Course Dashboard
          </h1>
          <p className="text-sm text-sidebar-foreground/60">
            Organized workspace for coursework and project tracking.
          </p>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(({ title, href, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    tooltip={title}
                    className={cn(pathname === href && "bg-sidebar-accent")}
                  >
                    <Link href={href}>
                      <Icon />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-3 p-4">
        <SidebarSeparator />
        <div className="space-y-3">
          {user ? (
            <div className="space-y-2">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-sidebar-foreground/60">
                  Signed in
                </p>
                <p className="truncate text-sm text-sidebar-foreground/80">
                  {user.email ?? "Authenticated user"}
                </p>
              </div>
              <form action={signOutAction}>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full justify-start gap-2 border-sidebar-border bg-sidebar-accent/30 text-sidebar-foreground hover:bg-sidebar-accent/50"
                >
                  <LogOut />
                  Sign Out
                </Button>
              </form>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sidebar-foreground/60">
                Theme
              </p>
              <p className="text-sm text-sidebar-foreground/80">Switch appearance</p>
            </div>
            <ModeToggle />
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}