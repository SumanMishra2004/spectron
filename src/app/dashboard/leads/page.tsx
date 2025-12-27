import { LeadsOverview } from "@/components/dashboard/leads/leads-overview"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LeadsPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/api/auth/signin')
  }

  // Only brokers and admins can access leads
  if (user.role !== 'BROKER' && user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return <LeadsOverview />
}