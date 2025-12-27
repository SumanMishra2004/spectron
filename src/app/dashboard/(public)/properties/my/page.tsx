"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Edit, Trash2, Eye, MapPin, Bed, Bath } from "lucide-react";

export default function MyListingsPage() {
  // const userRole = useUserRole();

  // if (userRole !== "OWNER" && userRole !== "BROKER") {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Access Denied</CardTitle>
  //         <CardDescription>
  //           This page is only available to property owners and brokers
  //         </CardDescription>
  //       </CardHeader>
  //     </Card>
  //   );
  // }

  const listings = [
    {
      id: 1,
      title: "3BHK Apartment in Salt Lake",
      price: "₹85 Lakhs",
      location: "Salt Lake, Sector V",
      beds: 3,
      baths: 2,
      area: "1,450 sqft",
      status: "active",
      views: 1240,
    },
    {
      id: 2,
      title: "2BHK Flat in Park Street",
      price: "₹1.2 Cr",
      location: "Park Street, Central",
      beds: 2,
      baths: 2,
      area: "1,200 sqft",
      status: "pending",
      views: 890,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            My Listings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your property listings
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-orange-500 to-orange-400">
          <a href="/dashboard/properties/new">Add New Property</a>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{listings.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Your properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listings.filter((l) => l.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Live properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {listings.reduce((sum, l) => sum + l.views, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Avg Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(listings.reduce((sum, l) => sum + l.views, 0) / listings.length)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per listing</p>
          </CardContent>
        </Card>
      </div>

      {/* Listings */}
      <div className="space-y-4">
        {listings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="w-full md:w-48 h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Building2 className="h-16 w-16 text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {listing.location}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={listing.status === "active" ? "default" : "secondary"}
                      className={
                        listing.status === "active"
                          ? "bg-green-500/10 text-green-700 border-green-500/20"
                          : ""
                      }
                    >
                      {listing.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-orange-600">
                      {listing.price}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {listing.beds} Beds
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {listing.baths} Baths
                      </div>
                      <div>{listing.area}</div>
                      <div className="flex items-center gap-1 ml-auto">
                        <Eye className="h-4 w-4" />
                        {listing.views} views
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
