
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/api/auth/signin');
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
          
        } as React.CSSProperties
      }
      className="dark"
    >
      <AppSidebar variant="inset" className="rounded-md" user={user} />
      <SidebarInset className="bg-sidebar-primary">
        <SiteHeader />
        <div className="flex flex-1 flex-col ">
          <div className="@container/main flex flex-1 flex-col gap-2 p-6! md:p-8! lg:p-10!">
             {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

