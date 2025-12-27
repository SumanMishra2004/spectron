import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property-card';
import { getProperties } from '@/actions/properties';
import { Search, MapPin, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { getCurrentUser } from '@/lib/auth';

// Make this page dynamic to avoid database calls during build
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let properties = [];
  let user = null;

  try {
    const response = await getProperties();
    properties = response.data || [];
    user = await getCurrentUser();
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Continue with empty data rather than crashing the page
  }

  const featuredProperties = properties.slice(0, 6);
  return ( 
  <><Navbar user={user} />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Find Your Perfect Home in{' '}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Kolkata
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Discover apartments, houses, and plots across Kolkata. Connect with verified
              brokers and property owners.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/properties">
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link href="/post-property">
                <Button size="lg" variant="outline" className="gap-2">
                  <TrendingUp className="h-5 w-5" />
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <MapPin className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Map-Based Search</h3>
              <p className="text-muted-foreground">
                Find properties by location using our interactive map
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Verified Listings</h3>
              <p className="text-muted-foreground">
                All properties verified by our team and trusted brokers
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">Easy Listing</h3>
              <p className="text-muted-foreground">
                List your property in minutes with our simple process
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-3xl">Featured Properties</h2>
              <p className="text-muted-foreground">
                Handpicked properties across Kolkata
              </p>
            </div>
            <Link href="/properties">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.length > 0 ? (
              featuredProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">
                  No properties available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-br from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-bold text-3xl">Ready to List Your Property?</h2>
            <p className="mb-6 text-muted-foreground text-lg">
              Join hundreds of property owners and brokers. Get verified and start
              receiving leads today.
            </p>
            <Link href="/post-property">
              <Button size="lg" className="gap-2">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div></>
  );
}