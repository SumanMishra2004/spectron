"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dashboardSidebarLinks, getSidebarLinksByRole } from "@/types/dashboardSidebarLinks";
import { useUserRole } from "@/hooks/use-user-role";
import { useSidebar } from "./sidebar-provider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DashboardSidebar() {
  const pathname = usePathname();
  const userRole = useUserRole();
  const { isOpen, toggle } = useSidebar();
  // Show all links for now (testing mode)
  const sections = dashboardSidebarLinks;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed inset-y-0 left-0 z-50 border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          isOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo & Toggle */}
        <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
          {isOpen && (
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Home className="h-5 w-5 text-primary" />
              <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                Kolkata Realty
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-8 w-8 ml-auto"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-6">
            {sections.map((section, idx) => (
              <div key={section.label}>
                {isOpen && (
                  <h3 className="mb-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {section.label}
                  </h3>
                )}
                
                <div className="space-y-1">
                  {section.links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent",
                          isActive
                            ? "bg-gradient-to-r from-orange-500/10 to-orange-400/10 text-orange-600 dark:text-orange-400 border-l-2 border-orange-500"
                            : "text-muted-foreground hover:text-foreground",
                          link.variant === "primary" &&
                            "bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500",
                          !isOpen && "justify-center"
                        )}
                      >
                        <span className={cn("shrink-0", isOpen ? "h-5 w-5" : "h-6 w-6")}>
                          {Icon}
                        </span>
                        
                        {isOpen && (
                          <>
                            <span className="flex-1">{link.title}</span>
                            {link.badge && (
                              <Badge variant="secondary" className="ml-auto">
                                {link.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {idx < sections.length - 1 && isOpen && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        {isOpen && (
          <div className="border-t border-border/40 p-4">
            <p className="text-xs text-muted-foreground text-center">
              © 2025 Kolkata Realty
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
