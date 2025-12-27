'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PropertyCard } from '@/components/property-card';
import dynamic from 'next/dynamic';
import type { SearchFilters, PropertyWithImages } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  MapIcon, 
  LayoutGrid, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Search,
  X,
  Home,
  Building,
  DollarSign,
  Bed,
  Maximize,
  Sofa,
  Filter,
  RotateCcw,
  List
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PROPERTY_TYPES, FURNISHING_STATUS, BHK_OPTIONS, PRICE_RANGES } from '@/config/constants';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/map').then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted rounded-lg">
      <div className="text-center">
        <MapIcon className="mx-auto mb-2 h-12 w-12 animate-pulse text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading map...</span>
      </div>
    </div>
  ),
});

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

type ViewMode = 'grid' | 'map' | 'list';
type SortOption = 'createdAt' | 'price' | 'area';

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyWithImages[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [tempFilters, setTempFilters] = useState<SearchFilters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000]);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 10000]);
  const [mapFilterBounds, setMapFilterBounds] = useState<{
    north: number;
    south: number;
    east: number;
    west: number;
  } | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0,
    hasMore: false,
  });
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    limit: number;
    remaining: number;
    reset: string;
  } | null>(null);

  const loadProperties = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
      });

      // Add search query
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      // Add status to show both active and pending properties
      params.append('status', 'ACTIVE,PENDING');

      // Add filters
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.bhk?.length) params.append('bhk', filters.bhk.join(','));
      if (filters.propertyType?.length) params.append('propertyType', filters.propertyType.join(','));
      if (filters.furnishing?.length) params.append('furnishing', filters.furnishing.join(','));
      if (filters.minArea) params.append('minArea', filters.minArea.toString());
      if (filters.maxArea) params.append('maxArea', filters.maxArea.toString());
      
      // Add map boundary filtering
      if (filters.bounds) {
        params.append('north', filters.bounds.north.toString());
        params.append('south', filters.bounds.south.toString());
        params.append('east', filters.bounds.east.toString());
        params.append('west', filters.bounds.west.toString());
      }

      const response = await fetch(`/api/properties?${params.toString()}`);
      console.log('Fetch response ', response);
      // Extract rate limit headers
      const rateLimitHeader = {
        limit: parseInt(response.headers.get('X-RateLimit-Limit') || '0'),
        remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '0'),
        reset: response.headers.get('X-RateLimit-Reset') || '',
      };
      setRateLimitInfo(rateLimitHeader);

      if (response.status === 429) {
        const data = await response.json();
        setError(`Rate limit exceeded. Please try again in ${data.retryAfter} seconds.`);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      console.log('Properties data ', data);
      setProperties(data.data || []);
      setPagination(data.pagination || pagination);
    } catch (err) {
      console.error('Error loading properties:', err);
      setError(err instanceof Error ? err.message : 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.limit, sortBy, sortOrder, searchQuery]);

  useEffect(() => {
    loadProperties(1);
  }, [filters, sortBy, sortOrder, searchQuery]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    loadProperties(newPage);
    
    // Safely scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split('-') as [SortOption, 'asc' | 'desc'];
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleMapBoundsChange = (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => {
    setFilters(prev => ({ ...prev, bounds }));
  };

  const clearFilters = () => {
    setFilters({});
    setTempFilters({});
    setSearchQuery('');
    setPriceRange([0, 100000000]);
    setAreaRange([0, 10000]);
    setMapFilterBounds(null);
  };

  const applyFilters = () => {
    const newFilters: SearchFilters = { ...tempFilters };
    
    // Apply price range
    if (priceRange[0] > 0 || priceRange[1] < 100000000) {
      newFilters.minPrice = priceRange[0];
      newFilters.maxPrice = priceRange[1];
    }
    
    // Apply area range  
    if (areaRange[0] > 0 || areaRange[1] < 10000) {
      newFilters.minArea = areaRange[0];
      newFilters.maxArea = areaRange[1];
    }
    
    // Apply map bounds filter
    if (mapFilterBounds) {
      newFilters.bounds = mapFilterBounds;
    }
    
    setFilters(newFilters);
    setDialogOpen(false);
  };

  const handleFilterMapBoundsChange = (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => {
    setMapFilterBounds(bounds);
  };

  const clearMapFilter = () => {
    setMapFilterBounds(null);
    setTempFilters({ ...tempFilters, bounds: undefined });
  };

  const toggleBHK = (bhk: number) => {
    const current = tempFilters.bhk || [];
    const updated = current.includes(bhk) 
      ? current.filter(b => b !== bhk)
      : [...current, bhk];
    setTempFilters({ ...tempFilters, bhk: updated });
  };

  const togglePropertyType = (type: string) => {
    const current = tempFilters.propertyType || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    setTempFilters({ ...tempFilters, propertyType: updated });
  };

  const toggleFurnishing = (furnishing: string) => {
    const current = tempFilters.furnishing || [];
    const updated = current.includes(furnishing)
      ? current.filter(f => f !== furnishing)
      : [...current, furnishing];
    setTempFilters({ ...tempFilters, furnishing: updated });
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.bhk?.length) count++;
    if (filters.propertyType?.length) count++;
    if (filters.furnishing?.length) count++;
    if (filters.minArea || filters.maxArea) count++;
    if (filters.bounds) count++;
    if (searchQuery) count++;
    return count;
  }, [filters, searchQuery]);

  const markers = useMemo(() => 
    properties.map(p => ({
      id: p.id,
      lat: p.latitude,
      lng: p.longitude,
      title: p.title,
      price: p.price,
    })), [properties]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      {/* Modern Hero Header */}
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container relative mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text font-bold text-5xl text-transparent md:text-6xl lg:text-7xl">
              Discover Your Perfect Home
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Browse through {pagination.total} premium properties tailored just for you
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative mx-auto mb-8 max-w-3xl">
              <Search className="absolute top-1/2 left-5 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by location, property name, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 rounded-2xl border-2 pl-14 pr-14 text-lg shadow-xl transition-all hover:border-primary/50 focus:border-primary"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Modern Filter Button */}
            <div className="flex items-center justify-center gap-3">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg">
                    <Filter className="h-5 w-5" />
                    Advanced Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Filter Properties</DialogTitle>
                    <DialogDescription>
                      Narrow down your search with advanced filters
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* Price Range */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-base font-semibold">
                          <DollarSign className="h-5 w-5 text-primary" />
                          Price Range
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          ₹{(priceRange[0] / 100000).toFixed(1)}L - ₹{(priceRange[1] / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <Slider
                        value={priceRange}
                        onValueChange={(value: [number, number]) => setPriceRange(value)}
                        min={0}
                        max={100000000}
                        step={500000}
                        className="py-4"
                      />
                      <div className="grid grid-cols-5 gap-2">
                        {PRICE_RANGES.map((range) => (
                          <Button
                            key={range.label}
                            variant="outline"
                            size="sm"
                            onClick={() => setPriceRange([range.min, range.max])}
                            className="text-xs"
                          >
                            {range.label.replace('₹', '')}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* BHK Selection */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Bed className="h-5 w-5 text-primary" />
                        Bedrooms (BHK)
                      </Label>
                      <div className="grid grid-cols-5 gap-3">
                        {BHK_OPTIONS.map((bhk) => (
                          <Button
                            key={bhk}
                            variant={tempFilters.bhk?.includes(bhk) ? 'default' : 'outline'}
                            onClick={() => toggleBHK(bhk)}
                            className="h-16 text-lg font-semibold"
                          >
                            {bhk}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Property Type */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Home className="h-5 w-5 text-primary" />
                        Property Type
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {PROPERTY_TYPES.map((type) => (
                          <Button
                            key={type.value}
                            variant={tempFilters.propertyType?.includes(type.value) ? 'default' : 'outline'}
                            onClick={() => togglePropertyType(type.value)}
                            className="h-20 flex-col gap-2"
                          >
                            <Building className="h-6 w-6" />
                            {type.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Furnishing Status */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Sofa className="h-5 w-5 text-primary" />
                        Furnishing Status
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        {FURNISHING_STATUS.map((status) => (
                          <Button
                            key={status.value}
                            variant={tempFilters.furnishing?.includes(status.value) ? 'default' : 'outline'}
                            onClick={() => toggleFurnishing(status.value)}
                            className="h-16"
                          >
                            {status.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Area Range */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-base font-semibold">
                          <Maximize className="h-5 w-5 text-primary" />
                          Area (sq.ft)
                        </Label>
                        <span className="text-sm text-muted-foreground">
                          {areaRange[0]} - {areaRange[1]} sq.ft
                        </span>
                      </div>
                      <Slider
                        value={areaRange}
                        onValueChange={(value: [number, number]) => setAreaRange(value)}
                        min={0}
                        max={10000}
                        step={100}
                        className="py-4"
                      />
                    </div>

                    <Separator />

                    {/* Map Location Filter */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2 text-base font-semibold">
                          <MapIcon className="h-5 w-5 text-primary" />
                          Filter by Location
                        </Label>
                        {mapFilterBounds && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearMapFilter}
                            className="h-7 gap-1 text-xs"
                          >
                            <X className="h-3 w-3" />
                            Clear
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Pan and zoom the map to select your desired area. Properties within the visible map area will be shown.
                        </p>
                        <div className="relative h-[400px] overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/20">
                          <Map
                            center={{ lat: 22.5726, lng: 88.3639 }}
                            zoom={11}
                            markers={[]}
                            onBoundsChange={handleFilterMapBoundsChange}
                            className="h-full"
                          />
                          {mapFilterBounds && (
                            <div className="absolute top-2 left-2 right-2 z-[1000] rounded-lg bg-background/95 p-3 shadow-lg backdrop-blur">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <MapIcon className="h-4 w-4 text-primary" />
                                  <span className="font-medium text-sm">Location filter active</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  Selected Area
                                </Badge>
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Showing properties in the selected map area
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => {
                      clearFilters();
                      setDialogOpen(false);
                    }} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Reset All
                    </Button>
                    <Button onClick={applyFilters} size="lg" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Apply Filters
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={clearFilters}
                  className="gap-2 rounded-full"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Control Bar */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Results Count */}
            <div className="flex items-center gap-4">
              {loading ? (
                <Skeleton className="h-8 w-40" />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-primary">{pagination.total}</span>
                  <span className="text-sm text-muted-foreground">results found</span>
                </div>
              )}
              
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Filter className="h-3 w-3" />
                  {activeFiltersCount} active
                </Badge>
              )}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Select onValueChange={handleSortChange} defaultValue="createdAt-desc">
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest</SelectItem>
                  <SelectItem value="price-asc">Price ↑</SelectItem>
                  <SelectItem value="price-desc">Price ↓</SelectItem>
                  <SelectItem value="area-asc">Area ↑</SelectItem>
                  <SelectItem value="area-desc">Area ↓</SelectItem>
                </SelectContent>
              </Select>

              <ToggleGroup type="single" value={viewMode} onValueChange={(val) => val && setViewMode(val as ViewMode)}>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="list" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="map" aria-label="Map view">
                  <MapIcon className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limit & Error Alerts */}
      {(rateLimitInfo?.remaining ?? 999) < 10 && (
        <div className="container mx-auto px-4 pt-4">
          <Alert>
            <AlertDescription>
              API rate limit: {rateLimitInfo?.remaining} requests remaining
            </AlertDescription>
          </Alert>
        </div>
      )}

      {error && (
        <div className="container mx-auto px-4 pt-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'map' ? (
          <Card className="overflow-hidden shadow-xl">
            <div className="h-[calc(100vh-280px)]">
              <Map
                center={{ lat: 22.5726, lng: 88.3639 }}
                zoom={12}
                markers={markers}
                onBoundsChange={handleMapBoundsChange}
              />
            </div>
          </Card>
        ) : loading ? (
          <div className={cn(
            'grid gap-6',
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
          )}>
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-24">
              <div className="rounded-full bg-muted p-6 mb-6">
                <Home className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-bold text-2xl">No properties found</h3>
              <p className="mb-6 text-center text-muted-foreground max-w-md">
                We couldn&apos;t find any properties matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button onClick={clearFilters} size="lg" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            )}>
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={pagination.page === pageNum ? 'default' : 'outline'}
                        onClick={() => handlePageChange(pageNum)}
                        className="min-w-[44px]"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  {pagination.totalPages > 5 && (
                    <>
                      <span className="px-2 text-muted-foreground">...</span>
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(pagination.totalPages)}
                        className="min-w-[44px]"
                      >
                        {pagination.totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasMore}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
