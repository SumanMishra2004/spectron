import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Building2, MapPin, Bath, Bed } from "lucide-react";

export default function FavoritesPage() {
  const favorites = [
    {
      id: 1,
      title: "3BHK Apartment in Salt Lake",
      price: "₹85 Lakhs",
      location: "Salt Lake, Sector V",
      beds: 3,
      baths: 2,
      area: "1,450 sqft",
      image: "/placeholder.jpg",
    },
    {
      id: 2,
      title: "2BHK Flat in Park Street",
      price: "₹1.2 Cr",
      location: "Park Street, Central",
      beds: 2,
      baths: 2,
      area: "1,200 sqft",
      image: "/placeholder.jpg",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Saved Properties
          </h1>
          <p className="text-muted-foreground mt-1">
            Properties you&apos;ve bookmarked for later
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {favorites.length} Saved
        </Badge>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No saved properties yet</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Start exploring properties and save your favorites
            </p>
            <Button asChild className="mt-4 bg-gradient-to-r from-orange-500 to-orange-400">
              <a href="/dashboard/properties">Browse Properties</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Building2 className="h-16 w-16 text-muted-foreground" />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                >
                  <Bookmark className="h-4 w-4 fill-current" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {property.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-2xl font-bold text-orange-600">
                    {property.price}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.beds} Beds
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {property.baths} Baths
                    </div>
                    <div>{property.area}</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-400">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
