"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dashboardSidebarLinks, getSidebarLinksByRole } from "@/types/dashboardSidebarLinks";
import { useUserRole } from "@/hooks/use-user-role";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Home } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const userRole = useUserRole();
  // Show all links for now (testing mode)
  const sections = dashboardSidebarLinks;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border/40 p-4">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <Home className="h-5 w-5 text-primary" />
            <SheetTitle className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Kolkata Realty
            </SheetTitle>
          </Link>
        </SheetHeader>

        <ScrollArea className="flex-1 px-3 py-4 h-[calc(100vh-5rem)]">
          <nav className="space-y-6">
            {sections.map((section, idx) => (
              <div key={section.label}>
                <h3 className="mb-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </h3>
                
                <div className="space-y-1">
                  {section.links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent",
                          isActive
                            ? "bg-gradient-to-r from-orange-500/10 to-orange-400/10 text-orange-600 dark:text-orange-400 border-l-2 border-orange-500"
                            : "text-muted-foreground hover:text-foreground",
                          link.variant === "primary" &&
                            "bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500"
                        )}
                      >
                        <span className="h-5 w-5 shrink-0">{Icon}</span>
                        <span className="flex-1">{link.title}</span>
                        {link.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {link.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {idx < sections.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
