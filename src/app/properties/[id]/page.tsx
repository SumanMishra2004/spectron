import { getPropertyById } from '@/actions/properties';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatPrice, formatArea } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Map } from '@/components/map';
import {
  MapPin,
  Home,
  Maximize,
  Sofa,
  User,
  Building2,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  Share2,
  Heart,
  TrendingUp,
  BedDouble,
  Bath,
  Car,
  Wifi,
  Zap,
  Droplet,
  Shield,
} from 'lucide-react';
import { UrbanSprawlChart } from '@/components/urban-sprawl-chart';
import Link from 'next/link';

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  // Format date
  const postedDate = new Date(property.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with Image Gallery */}
      <div className="relative">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-foreground">Properties</Link>
            <span>/</span>
            <span className="text-foreground">{property.title}</span>
          </div>

          {/* Image Gallery */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {property.images.length > 0 ? (
                <div className="grid gap-2 md:grid-cols-4">
                  {/* Main Image */}
                  <div className="relative aspect-[16/9] md:col-span-3 md:row-span-2">
                    <Image
                      src={property.images[0].url}
                      alt={property.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Thumbnail Grid */}
                  {property.images.slice(1, 5).map((image: { id: string; url: string }, index: number) => (
                    <div key={image.id} className="relative aspect-square overflow-hidden">
                      <Image
                        src={image.url}
                        alt={`${property.title} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {property.images.length > 5 && (
                    <div className="relative aspect-square overflow-hidden bg-black/70">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-semibold text-2xl text-white">
                          +{property.images.length - 5}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative aspect-[16/9] bg-muted" />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Property Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Title & Price Section */}
            <div>
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="mb-2 font-bold text-4xl">{property.title}</h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{property.address}</span>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      Posted {postedDate}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-bold text-4xl text-emerald-600">
                  {formatPrice(property.price)}
                </span>
                {property.status === 'ACTIVE' && (
                  <Badge className="bg-green-500">Available</Badge>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Property Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-3 rounded-lg border bg-blue-50/50 p-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Home className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Type</p>
                      <p className="font-semibold text-sm">{property.propertyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border bg-emerald-50/50 p-4">
                    <div className="rounded-full bg-emerald-100 p-2">
                      <BedDouble className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Bedrooms</p>
                      <p className="font-semibold text-sm">{property.bhk} BHK</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border bg-amber-50/50 p-4">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Maximize className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Area</p>
                      <p className="font-semibold text-sm">{formatArea(property.area)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border bg-purple-50/50 p-4">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Sofa className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Furnishing</p>
                      <p className="font-semibold text-sm">{property.furnishing}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description || 
                    `This ${property.bhk} BHK ${property.propertyType.toLowerCase()} is located in ${property.address}. 
                    It offers ${formatArea(property.area)} of living space and comes ${property.furnishing.toLowerCase().replace('_', ' ')}. 
                    This property is perfect for those looking for a comfortable and modern living space in a prime location.`
                  }
                </p>
              </CardContent>
            </Card>

            {/* Amenities & Features */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">{property.furnishing} Property</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">24/7 Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Power Backup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Water Supply</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Parking Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Prime Location</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Location & Neighborhood
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground text-sm">
                  {property.address}
                </p>
                <Map
                  center={{ lat: property.latitude, lng: property.longitude }}
                  zoom={15}
                  markers={[
                    {
                      id: property.id,
                      lat: property.latitude,
                      lng: property.longitude,
                      title: property.title,
                      price: property.price,
                    },
                  ]}
                  className="h-[400px] rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Urban Sprawl Analysis */}
            <UrbanSprawlChart data={property.urbanSprawlData || []} />
          </div>

          {/* Right Sidebar - Contact & Info */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-6">
              <CardHeader className="bg-gradient-to-br from-amber-50 to-orange-50">
                <CardTitle>Interested in this property?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {/* Owner Info */}
                <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{property.user.name || 'Property Owner'}</p>
                    <p className="text-muted-foreground text-sm">
                      {property.user.role === 'BROKER' ? '🏢 Verified Broker' : '🏠 Property Owner'}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <Button className="w-full gap-2" size="lg">
                    <Phone className="h-4 w-4" />
                    Call Owner
                  </Button>
                  <Button variant="outline" className="w-full gap-2" size="lg">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Link href="/dashboard/properties" className="block">
                    <Button variant="outline" className="w-full gap-2">
                      <Building2 className="h-4 w-4" />
                      View All Properties
                    </Button>
                  </Link>
                </div>

                <Separator />

                {/* Quick Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-mono font-semibold">{property.id.slice(0, 8)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={property.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Posted</span>
                    <span className="font-medium">{postedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Price Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Price</span>
                  <span className="font-bold text-emerald-600">{formatPrice(property.price)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Price per sq ft</span>
                  <span className="font-semibold">{formatPrice(Math.round(property.price / property.area))}/sq ft</span>
                </div>
                <Separator />
                <p className="text-muted-foreground text-xs">
                  💡 This property is competitively priced for the area
                </p>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="h-5 w-5 text-amber-600" />
                  Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  • Always verify property documents
                </p>
                <p className="text-muted-foreground">
                  • Visit the property in person
                </p>
                <p className="text-muted-foreground">
                  • Don&apos;t make advance payments
                </p>
                <p className="text-muted-foreground">
                  • Check for legal clearances
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
