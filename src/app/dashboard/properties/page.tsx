import { Suspense } from 'react';
import { PropertyCard } from '@/components/property-card';
import { PropertyFilters } from '@/components/property-filters';
import { PropertiesPageSkeleton } from '@/components/properties-skeleton';
import { getProperties } from '@/actions/properties';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Filter, 
  Search,
  TrendingUp,
  Sparkles,
  Grid3X3,
  List,
  PlusCircle,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPropertiesPage() {
  let properties = [];
  let user = null;

  try {
    const response = await getProperties();
    properties = response.data || [];
    user = await getCurrentUser();
  } catch (error) {
    console.error('Error fetching properties:', error);
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-spectron-teal/10 p-2">
              <Building2 className="h-6 w-6 text-spectron-teal" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Properties Dashboard</h1>
              <Badge className="mt-1 border-spectron-teal/30 bg-spectron-teal/10 text-spectron-teal">
                <Eye className="mr-1 h-3 w-3" />
                {properties.length} verified properties
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            Manage and explore verified properties across Kolkata
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/map">
            <Button variant="outline" className="gap-2 hover:bg-spectron-teal/10 hover:text-spectron-teal hover:border-spectron-teal">
              <MapPin className="h-4 w-4" />
              Map View
            </Button>
          </Link>
          {(user?.role === 'OWNER' || user?.role === 'BROKER') && (
            <Link href="/dashboard/properties/new">
              <Button className="gap-2 bg-gradient-to-r from-spectron-gold to-spectron-teal">
                <PlusCircle className="h-4 w-4" />
                Add Property
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="spectron-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <p className="text-3xl font-bold text-spectron-teal">{properties.length}</p>
              </div>
              <div className="rounded-full bg-spectron-teal/10 p-3">
                <Building2 className="h-6 w-6 text-spectron-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="spectron-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Price</p>
                <p className="text-3xl font-bold text-spectron-gold">₹4.2L</p>
              </div>
              <div className="rounded-full bg-spectron-gold/10 p-3">
                <TrendingUp className="h-6 w-6 text-spectron-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="spectron-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Areas</p>
                <p className="text-3xl font-bold text-spectron-crimson">12</p>
              </div>
              <div className="rounded-full bg-spectron-crimson/10 p-3">
                <MapPin className="h-6 w-6 text-spectron-crimson" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Results */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="spectron-card sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-spectron-teal" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading filters...</div>}>
                <PropertyFilters 
                  onFiltersChange={(filters) => {
                    console.log('Filters changed:', filters);
                  }}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {properties.length} Properties Found
              </h2>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3" />
                All Verified
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Grid3X3 className="h-4 w-4" />
                Grid
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <List className="h-4 w-4" />
                List
              </Button>
            </div>
          </div>

          <Suspense fallback={<PropertiesPageSkeleton />}>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {properties.length > 0 ? (
                properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <Card className="col-span-full border-2 border-dashed border-spectron-teal/30 spectron-card">
                  <CardContent className="py-16 text-center">
                    <Search className="mx-auto mb-4 h-16 w-16 text-spectron-teal/50" />
                    <h3 className="mb-2 text-xl font-semibold">No Properties Found</h3>
                    <p className="mb-6 text-muted-foreground">
                      Try adjusting your filters or be the first to list a property in this area.
                    </p>
                    {(user?.role === 'OWNER' || user?.role === 'BROKER') && (
                      <Link href="/dashboard/properties/new">
                        <Button className="gap-2 bg-gradient-to-r from-spectron-gold to-spectron-teal">
                          <Building2 className="h-4 w-4" />
                          List Your Property
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </Suspense>

          {/* Load More */}
          {properties.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="gap-2 hover:bg-spectron-teal/10 hover:text-spectron-teal hover:border-spectron-teal">
                Load More Properties
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}