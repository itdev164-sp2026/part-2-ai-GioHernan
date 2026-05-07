"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { AppUser } from "@/lib/auth";

type AppShellProps = {
  children: ReactNode;
  user: AppUser | null;
};

export function AppShell({ children, user }: AppShellProps) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return children;
  }

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <BreadcrumbNav />
          </div>
        </header>
        <div className="flex-1 px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
