"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Search } from "lucide-react";
import { useSidebar } from "../sidebar/sidebar-provider";
import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { UserMenu } from "./user-menu";
import { NotificationsDropdown } from "./notifications-dropdown";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isOpen } = useSidebar();
  const { data: session } = useSession();

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "lg:pl-0"
        )}
      >
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search properties, leads, analytics..."
                className="pl-9 bg-muted/50"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <NotificationsDropdown />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
