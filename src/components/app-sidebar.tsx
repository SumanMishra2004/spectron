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


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const userRole = useUserRole();
  const sections = getSidebarLinksByRole(userRole);

  return (
    <Sidebar className="rouded-xl bg-[#f8d364]" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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