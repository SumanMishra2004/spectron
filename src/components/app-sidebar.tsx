"use client"

import * as React from "react"
import {
  IconInnerShadowTop,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { getSidebarLinksByRole } from "@/types/dashboardSidebarLinks"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useUserRole } from "@/hooks/use-user-role"
import { SidebarUserHeader } from "@/components/dashboard/sidebar/sidebar-user-header"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    id: string;
    email: string | null;
    name: string | null;
    image: string | null;
    role: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const userRole = useUserRole();
  const sections = getSidebarLinksByRole(userRole);

  return (
    <Sidebar className="rouded-xl bg-[#f8d364]" collapsible="icon" {...props}>
      <SidebarHeader>
        
        
        {/* User Header */}
        <SidebarUserHeader user={user} />
      </SidebarHeader>
      <SidebarContent style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgb(148 163 184) transparent',
      }} className="[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-400 [&::-webkit-scrollbar-thumb]:rounded-full">
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
        <SidebarMenu>
          {section.links.map((link) => (
            <SidebarMenuItem key={link.href}>
          <SidebarMenuButton 
            asChild 
            isActive={pathname === link.href}
            className={link.variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
          >
            <Link href={link.href} className="font-medium">
              {link.icon}
              <span>{link.title}</span>
              {link.badge && (
            <Badge variant="secondary" className="ml-auto">
              {link.badge}
            </Badge>
              )}
            </Link>
          </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
   
    </Sidebar>
  )
}