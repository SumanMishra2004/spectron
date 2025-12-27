import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property-card';
import { getProperties } from '@/actions/properties';
import { 
  Search, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Home,
  Building2,
  Users,
  Award,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  Clock,
  HeartHandshake,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <>
      <Navbar user={user} />
      <div className="min-h-screen">
        {/* Hero Section - Stunning & Modern */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-br from-amber-200/40 to-orange-200/40 blur-3xl" />
            <div className="absolute -right-4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-yellow-200/40 to-amber-200/40 blur-3xl delay-700" />
            <div className="absolute left-1/3 top-1/3 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-orange-200/30 to-amber-200/30 blur-3xl delay-1000" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-5xl text-center">
              {/* Badge */}
              <Badge className="mb-6 gap-2 border-amber-600/20 bg-white/80 px-4 py-2 text-amber-900 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                Premium Real Estate Platform
              </Badge>

              {/* Main Heading */}
              <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Discover Your Dream{' '}
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                  Home in Kolkata
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 sm:text-xl">
                Experience the future of real estate with verified properties, trusted brokers, and seamless transactions. Your perfect home is just a click away.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/properties">
                  <Button 
                    size="lg" 
                    className="group h-12 gap-2 bg-gradient-to-r from-amber-600 to-orange-600 px-8 text-base font-semibold shadow-lg shadow-amber-600/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-600/40"
                  >
                    <Search className="h-5 w-5" />
                    Explore Properties
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group h-12 gap-2 border-2 border-amber-600 bg-white/80 px-8 text-base font-semibold backdrop-blur-sm transition-all hover:bg-amber-50"
                  >
                    <TrendingUp className="h-5 w-5" />
                    List Your Property
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="font-medium">1000+ Properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Verified Listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span className="font-medium">4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <Card className="group border-none bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
                    <Home className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-gray-900">1,200+</h3>
                  <p className="font-medium text-gray-600">Active Listings</p>
                </CardContent>
              </Card>

              <Card className="group border-none bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-green-600 shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-gray-900">5,000+</h3>
                  <p className="font-medium text-gray-600">Happy Customers</p>
                </CardContent>
              </Card>

              <Card className="group border-none bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-orange-600 shadow-lg">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-gray-900">300+</h3>
                  <p className="font-medium text-gray-600">Verified Brokers</p>
                </CardContent>
              </Card>

              <Card className="group border-none bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-gray-900">98%</h3>
                  <p className="font-medium text-gray-600">Success Rate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section - Enhanced */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-amber-200 bg-amber-50 text-amber-900">
                Why Choose Us
              </Badge>
              <h2 className="mb-4 text-4xl font-bold">Everything You Need in One Place</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Experience seamless property search with our cutting-edge features designed for modern home seekers
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group border-2 transition-all hover:border-amber-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Smart Map Search</h3>
                  <p className="mb-4 text-muted-foreground">
                    Explore properties with our interactive map. Filter by location, price, and amenities in real-time.
                  </p>
                  <Link href="/properties" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                    Try it now
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-emerald-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">100% Verified</h3>
                  <p className="mb-4 text-muted-foreground">
                    Every property and broker is thoroughly verified by our expert team for your peace of mind.
                  </p>
                  <Link href="/properties" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    View verified listings
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-purple-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Instant Connect</h3>
                  <p className="mb-4 text-muted-foreground">
                    Connect with property owners and brokers instantly. Schedule visits within minutes.
                  </p>
                  <Link href="/properties" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-purple-600">
                    Get started
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-orange-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Quick Listings</h3>
                  <p className="mb-4 text-muted-foreground">
                    List your property in under 5 minutes. Reach thousands of verified buyers instantly.
                  </p>
                  <Link href="/dashboard" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                    List property
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-indigo-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg">
                    <HeartHandshake className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Zero Commission</h3>
                  <p className="mb-4 text-muted-foreground">
                    Direct deals between buyers and sellers. No hidden charges or surprise fees.
                  </p>
                  <Link href="/properties" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    Learn more
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-rose-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg">
                    <Star className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Premium Support</h3>
                  <p className="mb-4 text-muted-foreground">
                    24/7 customer support to help you every step of your property journey.
                  </p>
                  <Link href="/properties" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-rose-600">
                    Contact support
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <Badge className="mb-3 border-amber-200 bg-amber-50 text-amber-900">
                  Top Picks
                </Badge>
                <h2 className="mb-2 text-4xl font-bold">Featured Properties</h2>
                <p className="text-lg text-muted-foreground">
                  Handpicked premium properties across Kolkata
                </p>
              </div>
              <Link href="/properties">
                <Button variant="outline" size="lg" className="group gap-2 border-2">
                  View All Properties
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.length > 0 ? (
                featuredProperties.map((property, index) => (
                  <PropertyCard key={index} property={property} />
                ))
              ) : (
                <Card className="col-span-full border-2 border-dashed">
                  <CardContent className="py-20 text-center">
                    <Home className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                    <h3 className="mb-2 text-xl font-semibold">No Properties Yet</h3>
                    <p className="mb-6 text-muted-foreground">
                      Be the first to list your property and reach thousands of buyers!
                    </p>
                    <Link href="/dashboard">
                      <Button className="gap-2">
                        <TrendingUp className="h-4 w-4" />
                        List Your Property
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <Badge className="mb-4 border-emerald-200 bg-emerald-50 text-emerald-900">
                Testimonials
              </Badge>
              <h2 className="mb-4 text-4xl font-bold">What Our Clients Say</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Join thousands of satisfied customers who found their dream homes with us
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-2 transition-all hover:border-amber-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="mb-6 text-gray-700">
                    &quot;Found my dream apartment in just 2 weeks! The platform is so easy to use and all listings were verified. Highly recommended!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold">Sneha Kapoor</p>
                      <p className="text-sm text-muted-foreground">Property Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-amber-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="mb-6 text-gray-700">
                    &quot;As a broker, this platform has been a game-changer. I get quality leads and the commission structure is transparent.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 font-bold text-white">
                      RD
                    </div>
                    <div>
                      <p className="font-semibold">Rajesh Dutta</p>
                      <p className="text-sm text-muted-foreground">Real Estate Broker</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-amber-500 hover:shadow-xl">
                <CardContent className="p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="mb-6 text-gray-700">
                    &quot;Sold my flat within a month! The interface is modern and I received genuine inquiries from verified buyers.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 font-bold text-white">
                      PM
                    </div>
                    <div>
                      <p className="font-semibold">Priya Mukherjee</p>
                      <p className="text-sm text-muted-foreground">Property Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Premium */}
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)]" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-white">
              <Badge className="mb-6 border-white/20 bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Started Today
              </Badge>
              
              <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
                Ready to Find Your Perfect Home?
              </h2>
              
              <p className="mb-10 text-lg text-white/90 sm:text-xl">
                Join thousands of property seekers and sellers. List your property for free or start browsing verified listings now.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="group h-14 gap-2 border-2 border-white bg-white px-8 text-base font-semibold text-amber-700 hover:bg-white/90"
                  >
                    <TrendingUp className="h-5 w-5" />
                    List Your Property Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 gap-2 border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
                  >
                    <Search className="h-5 w-5" />
                    Browse Properties
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-white/20 pt-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="h-5 w-5" />
                  <span>Verified Properties</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HeartHandshake className="h-5 w-5" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}