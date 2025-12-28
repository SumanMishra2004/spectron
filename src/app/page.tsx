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
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
        {/* Hero Section - Dark Techy Theme */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/90 to-purple-950/80">
          {/* Animated Tech Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Glowing orbs */}
            <div className="absolute -left-20 top-1/4 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
            <div className="absolute -right-20 bottom-1/4 h-[500px] w-[500px] animate-float rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-3xl delay-700" />
            <div className="absolute left-1/3 top-1/2 h-80 w-80 animate-float rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/15 blur-3xl delay-1000" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
            
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent animate-scan" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-cyan-400/60 animate-pulse" />
            <div className="absolute left-[80%] top-[30%] h-1.5 w-1.5 rounded-full bg-purple-400/60 animate-pulse delay-300" />
            <div className="absolute left-[60%] top-[60%] h-2 w-2 rounded-full bg-blue-400/60 animate-pulse delay-700" />
            <div className="absolute left-[20%] top-[80%] h-1.5 w-1.5 rounded-full bg-indigo-400/60 animate-pulse delay-1000" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-24 sm:py-32 lg:py-40">
            <div className="mx-auto max-w-5xl text-center">
              {/* Tech Badge */}
              <Badge className="mb-6 gap-2 border-cyan-500/30 bg-cyan-500/10 px-6 py-3 text-cyan-300 backdrop-blur-xl shadow-lg shadow-cyan-500/20 animate-pulse-glow">
                <Sparkles className="h-4 w-4" />
                AI-Powered Property Intelligence
              </Badge>

              {/* Main Heading */}
              <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                Next-Gen{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  Smart Properties
                </span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
AI-powered valuations, and community-driven transparency. The future of real estate is here.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/properties">
                  <Button 
                    size="lg" 
                    className="group relative h-14 gap-3 overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 px-8 text-base font-semibold shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    <Search className="relative h-5 w-5" />
                    <span className="relative">Explore Properties</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group h-14 gap-3 border-2 border-purple-500/50 bg-purple-500/10 px-8 text-base font-semibold text-purple-300 backdrop-blur-xl transition-all hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-200"
                  >
                    <TrendingUp className="h-5 w-5" />
                    List Property
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators - Tech Style */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span className="font-medium">AI Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-blue-400" />
                  <span className="font-medium">Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Anonymous</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-indigo-400 text-indigo-400" />
                  <span className="font-medium">Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Dark Tech Style */}
        <section className="border-y border-indigo-500/20 bg-slate-900/50 py-16 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <Card className="group relative overflow-hidden border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-950/30 backdrop-blur-xl transition-all hover:scale-105 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50">
                    <Home className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-white">1,200+</h3>
                  <p className="font-medium text-slate-400">Verified Listings</p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-slate-900/90 to-blue-950/30 backdrop-blur-xl transition-all hover:scale-105 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-white">5,000+</h3>
                  <p className="font-medium text-slate-400">Active Users</p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-slate-900/90 to-purple-950/30 backdrop-blur-xl transition-all hover:scale-105 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-white">300+</h3>
                  <p className="font-medium text-slate-400">Verified Brokers</p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-indigo-500/20 bg-gradient-to-br from-slate-900/90 to-indigo-950/30 backdrop-blur-xl transition-all hover:scale-105 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-6 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-1 text-3xl font-bold text-white">98%</h3>
                  <p className="font-medium text-slate-400">Trust Score</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section - Dark Tech Enhanced */}
        <section className="relative bg-gradient-to-b from-slate-950 via-indigo-950/50 to-slate-950 py-20">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          
          <div className="container relative mx-auto px-4">
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-cyan-500/30 bg-cyan-500/10 text-cyan-300 backdrop-blur-xl">
                Platform Features
              </Badge>
              <h2 className="mb-4 text-4xl font-bold text-white">Powered by Advanced Technology</h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Revolutionary property platform with AI, blockchain, and community intelligence
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group relative overflow-hidden border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-950/20 backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">Smart Location AI</h3>
                  <p className="mb-4 text-slate-400">
                    AI-powered location intelligence with real-time mapping and proximity analytics.
                  </p>
                  <Link href="/map" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                    Explore Map
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-slate-900/90 to-purple-950/20 backdrop-blur-xl transition-all hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">Anonymous Validation</h3>
                  <p className="mb-4 text-slate-400">
                    Blockchain-secured anonymous feedback system with zero-knowledge proofs.
                  </p>
                  <Link href="/dashboard/validation" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300">
                    Join Network
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-slate-900/90 to-blue-950/20 backdrop-blur-xl transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50">
                    <BadgeCheck className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">AI Verification</h3>
                  <p className="mb-4 text-slate-400">
                    Machine learning algorithms verify property authenticity and detect fraud.
                  </p>
                  <Link href="/properties" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300">
                    View Verified
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-indigo-500/20 bg-gradient-to-br from-slate-900/90 to-indigo-950/20 backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">Predictive Analytics</h3>
                  <p className="mb-4 text-slate-400">
                    Historical data from 1975-2030 with ML-powered growth predictions.
                  </p>
                  <Link href="/analytics" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                    View Analytics
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-pink-500/20 bg-gradient-to-br from-slate-900/90 to-pink-950/20 backdrop-blur-xl transition-all hover:border-pink-500/40 hover:shadow-xl hover:shadow-pink-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/50">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">Real-Time Alerts</h3>
                  <p className="mb-4 text-slate-400">
                    Instant push notifications powered by WebSocket technology.
                  </p>
                  <Link href="/dashboard/notifications" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-pink-400 hover:text-pink-300">
                    Enable Alerts
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-950/20 backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/50">
                    <Eye className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">Transparent Pricing</h3>
                  <p className="mb-4 text-slate-400">
                    Smart contracts ensure zero hidden fees and automated transactions.
                  </p>
                  <Link href="/pricing" className="group/link inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                    See Pricing
                    <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="relative bg-slate-950 py-20">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          
          <div className="container relative mx-auto px-4">
            <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <Badge className="mb-3 border-blue-500/30 bg-blue-500/10 text-blue-300 backdrop-blur-xl">
                  Featured Properties
                </Badge>
                <h2 className="mb-2 text-4xl font-bold text-white">Premium Verified Listings</h2>
                <p className="text-lg text-slate-400">
                  AI-verified properties with blockchain authentication
                </p>
              </div>
              <Link href="/properties">
                <Button variant="outline" size="lg" className="group gap-2 border-2 border-cyan-500/50 bg-cyan-500/10 text-cyan-300 backdrop-blur-xl hover:border-cyan-400 hover:bg-cyan-500/20">
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
                <Card className="col-span-full border-2 border-dashed border-cyan-500/30 bg-gradient-to-br from-slate-900/50 to-cyan-950/20 backdrop-blur-xl">
                  <CardContent className="py-20 text-center">
                    <Home className="mx-auto mb-4 h-16 w-16 text-cyan-400/50" />
                    <h3 className="mb-2 text-xl font-semibold text-white">No Properties Listed Yet</h3>
                    <p className="mb-6 text-slate-400">
                      Be the first to list your property and reach verified buyers!
                    </p>
                    <Link href="/dashboard">
                      <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
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

        {/* Testimonials Section - Dark Tech */}
        <section className="relative bg-gradient-to-b from-indigo-950/50 via-slate-950 to-purple-950/50 py-20">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl delay-700" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="mb-12 text-center">
              <Badge className="mb-4 border-purple-500/30 bg-purple-500/10 text-purple-300 backdrop-blur-xl">
                Community Stories
              </Badge>
              <h2 className="mb-4 text-4xl font-bold text-white">Trusted by Thousands</h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Real experiences from our community members
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="group relative overflow-hidden border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-cyan-950/20 backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-slate-300">
                    &quot;Found my dream flat within 2 weeks! The AI verification system gave me confidence. Revolutionary platform!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 font-bold text-white shadow-lg shadow-cyan-500/50">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold text-white">Sneha Kapoor</p>
                      <p className="text-sm text-slate-400">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-blue-500/20 bg-gradient-to-br from-slate-900/90 to-blue-950/20 backdrop-blur-xl transition-all hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-blue-400 text-blue-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-slate-300">
                    &quot;As a broker, the blockchain verification builds instant trust. The analytics are invaluable. Game changer!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg shadow-blue-500/50">
                      RD
                    </div>
                    <div>
                      <p className="font-semibold text-white">Rajesh Dutta</p>
                      <p className="text-sm text-slate-400">Licensed Broker</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden border-purple-500/20 bg-gradient-to-br from-slate-900/90 to-purple-950/20 backdrop-blur-xl transition-all hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-8">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-slate-300">
                    &quot;Sold my property through smart contracts. The AI verification gave buyers confidence. Transparent and trustworthy!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 font-bold text-white shadow-lg shadow-purple-500/50">
                      PM
                    </div>
                    <div>
                      <p className="font-semibold text-white">Priya Mukherjee</p>
                      <p className="text-sm text-slate-400">Property Owner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - Dark Premium */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-800 py-20">
          {/* Animated tech background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-full w-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          {/* Glowing orbs */}
          <div className="absolute left-0 top-0 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
          <div className="absolute right-0 bottom-0 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-purple-300/10 to-transparent blur-3xl delay-700" />

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center text-white">
              <Badge className="mb-6 border-white/30 bg-white/20 px-6 py-3 text-white backdrop-blur-xl shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Join the Future
              </Badge>
              
              <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
                Ready for Next-Gen Real Estate?
              </h2>
              
              <p className="mb-10 text-lg text-white/90 sm:text-xl">
                Join the most advanced property platform. List for free or explore AI-verified listings with blockchain security.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="group h-14 gap-3 border-2 border-white bg-white px-8 text-base font-semibold text-blue-700 hover:bg-white/90 shadow-xl shadow-white/20"
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
                    className="h-14 gap-3 border-2 border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 backdrop-blur-xl"
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
                  <span>AI Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="h-5 w-5" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <HeartHandshake className="h-5 w-5" />
                  <span>100% Transparent</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}