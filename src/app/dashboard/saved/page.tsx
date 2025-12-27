import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Building2, MapPin, Eye, Star } from "lucide-react"
import Link from "next/link"

export default function SavedPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-spectron-gold via-spectron-teal to-spectron-crimson bg-clip-text text-transparent">
            Saved Properties
          </h1>
          <p className="text-muted-foreground mt-1">
            Your favorite properties and watchlist
          </p>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-12 text-center">
          <Heart className="h-16 w-16 text-spectron-crimson mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Saved Properties Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start exploring properties and save your favorites to see them here
          </p>
          <Button asChild className="bg-gradient-to-r from-spectron-gold to-spectron-teal text-white">
            <Link href="/dashboard/properties">
              <Building2 className="h-4 w-4 mr-2" />
              Browse Properties
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}