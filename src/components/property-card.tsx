'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatArea } from '@/lib/utils';
import { MapPin, Home, Maximize } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { PropertyWithImages } from '@/types';

interface PropertyCardProps {
  property: PropertyWithImages & {
    user?: { name: string | null; role: string };
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.images[0]?.url || '/placeholder-property.jpg';

  return (
    <Link href={`/dashboard/properties/${property.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {property.isFeatured && (
            <Badge className="absolute left-3 top-3 bg-amber-500">
              Featured
            </Badge>
          )}
          <Badge className="absolute right-3 top-3 bg-slate-900/80">
            {property.propertyType}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold text-lg">
              {property.title}
            </h3>
            <span className="text-lg font-bold text-emerald-600 whitespace-nowrap">
              {formatPrice(property.price)}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{property.address}</span>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{property.bhk} BHK</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4 text-muted-foreground" />
              <span>{formatArea(property.area)}</span>
            </div>
            <Badge variant="outline">{property.furnishing}</Badge>
          </div>
        </CardContent>

        {property.user && (
          <CardFooter className="border-t bg-muted/50 px-4 py-2">
            <span className="text-xs text-muted-foreground">
              Listed by {property.user.name || 'Owner'}
              {property.user.role === 'BROKER' && ' • Verified Broker'}
            </span>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
