import { getPropertyById } from '@/actions/properties';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatPrice, formatArea } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Map } from '@/components/map';
import {
  MapPin,
  Home,
  Maximize,
  Sofa,
  User,
} from 'lucide-react';
import { ContactForm } from './contact-form';

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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                {property.images.length > 0 ? (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
                    <Image
                      src={property.images[0].url}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/9] bg-muted" />
                )}
                {property.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {property.images.slice(1, 5).map((image: { id: string; url: string }, index: number) => (
                      <div key={image.id} className="relative aspect-square overflow-hidden rounded">
                        <Image
                          src={image.url}
                          alt={`${property.title} ${index + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h1 className="mb-2 font-bold text-3xl">{property.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  {property.isFeatured && (
                    <Badge className="bg-amber-500">Featured</Badge>
                  )}
                </div>

                <div className="mb-6 text-3xl font-bold text-emerald-600">
                  {formatPrice(property.price)}
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg border bg-muted/50 p-4 text-center">
                    <Home className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="font-semibold">{property.bhk} BHK</p>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4 text-center">
                    <Maximize className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="font-semibold">{formatArea(property.area)}</p>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4 text-center">
                    <Sofa className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                    <p className="text-sm font-semibold">{property.furnishing}</p>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4 text-center">
                    <p className="text-sm font-semibold">{property.propertyType}</p>
                  </div>
                </div>

                {property.description && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h2 className="mb-3 font-semibold text-xl">Description</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {property.description}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 font-semibold text-xl">Location</h2>
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
                  className="h-[400px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold text-lg">Posted By</h3>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{property.user.name || 'Owner'}</p>
                    <p className="text-sm text-muted-foreground">
                      {property.user.role === 'BROKER' ? 'Verified Broker' : 'Property Owner'}
                    </p>
                  </div>
                </div>
                <ContactForm propertyId={property.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
