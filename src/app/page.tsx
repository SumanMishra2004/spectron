import { Button } from '@/components/ui/button';

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
  HeartHandshake,
  BadgeCheck,
  ChevronRight,
  BarChart3,
  Eye,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PropertyCard } from '@/components/property-card';

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
        {/* Hero Section - Spectron Kolkata Themed */}
        <section className="relative overflow-hidden bg-gradient-to-br from-heritage-cream via-background to-heritage-cream/50">
          {/* Kolkata-inspired Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 top-1/4 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-spectron-gold/30 to-spectron-teal/30 blur-3xl" />
            <div className="absolute -right-4 bottom-1/4 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-spectron-teal/20 to-spectron-crimson/20 blur-3xl delay-700" />
            <div className="absolute left-1/3 top-1/3 h-64 w-64 animate-float rounded-full bg-gradient-to-br from-spectron-crimson/20 to-spectron-gold/20 blur-3xl delay-1000" />
          </div>

          {/* Heritage Pattern Overlay */}
          <div className="absolute inset-0 heritage-pattern opacity-30" />

          <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-5xl text-center">
              {/* Spectron Badge */}
              <Badge className="mb-6 gap-2 border-spectron-gold/30 bg-white/90 px-6 py-3 text-spectron-teal backdrop-blur-sm shadow-lg">
                <Sparkles className="h-4 w-4" />
                Spectron - Kolkata's Premier Property Platform
              </Badge>

              {/* Main Heading */}
              <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                Discover Authentic{' '}
                <span className="bg-gradient-to-r from-spectron-gold via-spectron-teal to-spectron-crimson bg-clip-text text-transparent animate-heritage-shimmer">
                  Kolkata Properties
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 sm:text-xl">
                Experience transparent property transactions with community-verified listings, anonymous feedback, and admin-approved authenticity. Your trusted home in the City of Joy awaits.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/properties">
                  <Button 
                    size="lg" 
                    className="group h-14 gap-3 bg-gradient-to-r from-spectron-gold to-spectron-teal px-8 text-base font-semibold shadow-xl shadow-spectron-gold/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-spectron-teal/40 animate-pulse-glow"
                  >
                    <Search className="h-5 w-5" />
                    Explore Verified Properties
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group h-14 gap-3 border-2 border-spectron-teal bg-white/90 px-8 text-base font-semibold backdrop-blur-sm transition-all hover:bg-spectron-teal/10 colonial-border"
                  >
                    <TrendingUp className="h-5 w-5" />
                    List Your Property
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators - Kolkata Themed */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-spectron-teal" />
                  <span className="font-medium">Community Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-spectron-gold" />
                  <span className="font-medium">Admin Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-spectron-crimson" />
                  <span className="font-medium">Anonymous Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-spectron-gold text-spectron-gold" />
                  <span className="font-medium">Trusted Platform</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Heritage Style */}
        <section className="border-y border-border/50 bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <Card className="group spectron-card transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-spectron-teal to-primary shadow-lg">
                    <Home className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-foreground">1,200+</h3>
                  <p className="font-medium text-muted-foreground">Verified Listings</p>
                </CardContent>
              </Card>

              <Card className="group spectron-card transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-spectron-gold to-accent shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-foreground">5,000+</h3>
                  <p className="font-medium text-muted-foreground">Community Members</p>
                </CardContent>
              </Card>

              <Card className="group spectron-card transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-spectron-crimson to-destructive shadow-lg">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-foreground">300+</h3>
                  <p className="font-medium text-muted-foreground">Trusted Brokers</p>
                </CardContent>
              </Card>

              <Card className="group spectron-card transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-spectron-teal shadow-lg">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-foreground">98%</h3>
                  <p className="font-medium text-muted-foreground">Trust Score</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section - Spectron Enhanced */}
        <section className="bg-gradient-to-b from-background to-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-spectron-teal/30 bg-spectron-teal/10 text-spectron-teal">
                Spectron Features
              </Badge>
              <h2 className="mb-4 text-4xl font-bold">Transparency Meets Technology</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Revolutionary property platform designed for Kolkata's unique real estate landscape
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group border-2 transition-all hover:border-spectron-gold hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-spectron-teal to-primary shadow-lg">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Smart Location Mapping</h3>
                  <p className="mb-4 text-muted-foreground">
                    Explore Kolkata properties with precision mapping. Find homes near metro stations, schools, and heritage sites.
                  </p>
                  <Link href="/map" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-spectron-teal">
                    Explore Map
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-spectron-crimson hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-spectron-crimson to-destructive shadow-lg">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Anonymous Community Feedback</h3>
                  <p className="mb-4 text-muted-foreground">
                    Get honest neighborhood opinions on pricing and property authenticity while maintaining complete privacy.
                  </p>
                  <Link href="/dashboard/validation" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-spectron-crimson">
                    Join Community
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-spectron-gold hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-spectron-gold to-accent shadow-lg">
                    <BadgeCheck className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Admin Verification</h3>
                  <p className="mb-4 text-muted-foreground">
                    Every property undergoes rigorous admin verification ensuring authenticity and accurate information.
                  </p>
                  <Link href="/properties" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-spectron-gold">
                    View Verified
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-primary hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-spectron-teal shadow-lg">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Urban Growth Analytics</h3>
                  <p className="mb-4 text-muted-foreground">
                    Track Kolkata's urban development from 1975-2030. Make informed decisions with historical growth data.
                  </p>
                  <Link href="/analytics" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View Analytics
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-accent hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-spectron-gold shadow-lg">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Instant Notifications</h3>
                  <p className="mb-4 text-muted-foreground">
                    Get notified when properties are listed in your area. Never miss opportunities in your neighborhood.
                  </p>
                  <Link href="/dashboard/notifications" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Enable Alerts
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group border-2 transition-all hover:border-muted-foreground hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-muted-foreground to-primary shadow-lg">
                    <Eye className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">Transparent Pricing</h3>
                  <p className="mb-4 text-muted-foreground">
                    No hidden fees or commissions. Direct connections between buyers, sellers, and verified brokers.
                  </p>
                  <Link href="/pricing" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                    See Pricing
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="bg-background py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <Badge className="mb-3 border-spectron-gold/30 bg-spectron-gold/10 text-spectron-gold">
                  Featured Properties
                </Badge>
                <h2 className="mb-2 text-4xl font-bold">Handpicked Kolkata Homes</h2>
                <p className="text-lg text-muted-foreground">
                  Premium verified properties across the City of Joy
                </p>
              </div>
              <Link href="/properties">
                <Button variant="outline" size="lg" className="group gap-2 border-2 border-spectron-teal hover:bg-spectron-teal/10">
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
                <Card className="col-span-full border-2 border-dashed border-spectron-teal/30 spectron-card">
                  <CardContent className="py-20 text-center">
                    <Home className="mx-auto mb-4 h-16 w-16 text-spectron-teal/50" />
                    <h3 className="mb-2 text-xl font-semibold">No Properties Listed Yet</h3>
                    <p className="mb-6 text-muted-foreground">
                      Be the first to list your Kolkata property on Spectron and reach verified buyers!
                    </p>
                    <Link href="/dashboard">
                      <Button className="gap-2 bg-gradient-to-r from-spectron-gold to-spectron-teal">
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

        {/* Testimonials Section - Kolkata Themed */}
        <section className="bg-gradient-to-b from-muted/30 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <Badge className="mb-4 border-spectron-crimson/30 bg-spectron-crimson/10 text-spectron-crimson">
                Community Stories
              </Badge>
              <h2 className="mb-4 text-4xl font-bold">What Kolkata Says About Spectron</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Real experiences from our community members across the City of Joy
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-2 transition-all hover:border-spectron-gold hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-spectron-gold text-spectron-gold" />
                    ))}
                  </div>
                  <p className="mb-6 text-foreground/80">
                    &quot;Found my dream flat in Salt Lake within 2 weeks! The anonymous feedback system helped me understand the real market value. Spectron is revolutionary!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-spectron-teal to-primary font-bold text-white">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold">Sneha Kapoor</p>
                      <p className="text-sm text-muted-foreground">Software Engineer, Salt Lake</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-spectron-teal hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-spectron-gold text-spectron-gold" />
                    ))}
                  </div>
                  <p className="mb-6 text-foreground/80">
                    &quot;As a broker, Spectron's verification system builds trust with clients. The community feedback is invaluable for accurate pricing. Game changer!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-spectron-gold to-accent font-bold text-white">
                      RD
                    </div>
                    <div>
                      <p className="font-semibold">Rajesh Dutta</p>
                      <p className="text-sm text-muted-foreground">Licensed Broker, Park Street</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:border-spectron-crimson hover:shadow-xl spectron-card">
                <CardContent className="p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-spectron-gold text-spectron-gold" />
                    ))}
                  </div>
                  <p className="mb-6 text-foreground/80">
                    &quot;Sold my ancestral home in North Kolkata through Spectron. The admin verification gave buyers confidence. Transparent and trustworthy platform!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-spectron-crimson to-destructive font-bold text-white">
                      PM
                    </div>
                    <div>
                      <p className="font-semibold">Priya Mukherjee</p>
                      <p className="text-sm text-muted-foreground">Property Owner, Shyambazar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Spectron Premium */}
        <section className="relative overflow-hidden bg-gradient-to-br from-spectron-gold via-spectron-teal to-spectron-crimson py-20">
          {/* Heritage Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)]" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-white">
              <Badge className="mb-6 border-white/30 bg-white/20 px-6 py-3 text-white backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Join Spectron Today
              </Badge>
              
              <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
                Ready to Experience Transparent Real Estate?
              </h2>
              
              <p className="mb-10 text-lg text-white/90 sm:text-xl">
                Join Kolkata's most trusted property platform. List your property for free or start exploring verified listings with community insights.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="group h-14 gap-3 border-2 border-white bg-white px-8 text-base font-semibold text-spectron-teal hover:bg-white/90 shadow-xl"
                  >
                    <TrendingUp className="h-5 w-5" />
                    List Property Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-14 gap-3 border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 backdrop-blur-sm"
                  >
                    <Search className="h-5 w-5" />
                    Explore Properties
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-white/20 pt-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Community Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="h-5 w-5" />
                  <span>Admin Approved</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HeartHandshake className="h-5 w-5" />
                  <span>Transparent Process</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}