import { Suspense } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  PlusCircle,
  MapPin,
  Camera,
  Upload,
  Info,
  CheckCircle,
  ArrowRight,
  Home,
  Ruler,
  IndianRupee
} from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AddPropertyPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== 'OWNER' && user.role !== 'BROKER')) {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-spectron-teal/10 p-2">
              <PlusCircle className="h-6 w-6 text-spectron-teal" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Add New Property</h1>
              <Badge className="mt-1 border-spectron-teal/30 bg-spectron-teal/10 text-spectron-teal">
                <Building2 className="mr-1 h-3 w-3" />
                Property Listing
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            Create a new property listing to reach potential buyers and tenants
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard/properties/my">
            <Button variant="outline" className="gap-2 hover:bg-spectron-teal/10 hover:text-spectron-teal hover:border-spectron-teal">
              <Building2 className="h-4 w-4" />
              My Listings
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-spectron-teal text-white p-2 text-sm font-medium">1</div>
              <span className="font-medium text-spectron-teal">Property Details</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 text-gray-600 p-2 text-sm font-medium">2</div>
              <span className="text-muted-foreground">Images & Media</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 text-gray-600 p-2 text-sm font-medium">3</div>
              <span className="text-muted-foreground">Location & Map</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-200 text-gray-600 p-2 text-sm font-medium">4</div>
              <span className="text-muted-foreground">Review & Publish</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Form */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-spectron-teal" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Provide essential details about your property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Spacious 3BHK Apartment in Salt Lake"
                  className="focus:border-spectron-teal focus:ring-spectron-teal"
                />
                <p className="text-xs text-muted-foreground">
                  Create an attractive title that highlights key features
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your property, its features, amenities, and neighborhood..."
                  rows={4}
                  className="focus:border-spectron-teal focus:ring-spectron-teal"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select>
                    <SelectTrigger className="focus:border-spectron-teal focus:ring-spectron-teal">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APARTMENT">Apartment</SelectItem>
                      <SelectItem value="HOUSE">House</SelectItem>
                      <SelectItem value="PLOT">Plot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="furnishing">Furnishing Status</Label>
                  <Select>
                    <SelectTrigger className="focus:border-spectron-teal focus:ring-spectron-teal">
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULLY_FURNISHED">Fully Furnished</SelectItem>
                      <SelectItem value="SEMI_FURNISHED">Semi Furnished</SelectItem>
                      <SelectItem value="UNFURNISHED">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Specifications */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-spectron-teal" />
                Property Specifications
              </CardTitle>
              <CardDescription>
                Specify the size, layout, and pricing details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bhk">BHK Configuration *</Label>
                  <Select>
                    <SelectTrigger className="focus:border-spectron-teal focus:ring-spectron-teal">
                      <SelectValue placeholder="Select BHK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 BHK</SelectItem>
                      <SelectItem value="2">2 BHK</SelectItem>
                      <SelectItem value="3">3 BHK</SelectItem>
                      <SelectItem value="4">4 BHK</SelectItem>
                      <SelectItem value="5">5+ BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft) *</Label>
                  <Input 
                    id="area" 
                    type="number"
                    placeholder="e.g., 1200"
                    className="focus:border-spectron-teal focus:ring-spectron-teal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="price" 
                      type="number"
                      placeholder="e.g., 8500000"
                      className="pl-10 focus:border-spectron-teal focus:ring-spectron-teal"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-heritage-cream/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-spectron-teal mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Pricing Tips</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Research similar properties in your area. The current market average is ₹6,500/sq ft in Kolkata.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-spectron-teal" />
                Location Details
              </CardTitle>
              <CardDescription>
                Provide accurate location information for better visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea 
                  id="address" 
                  placeholder="Enter the complete address including landmark, area, city, and pin code"
                  rows={3}
                  className="focus:border-spectron-teal focus:ring-spectron-teal"
                />
              </div>

              <div className="p-4 border-2 border-dashed border-spectron-teal/30 rounded-lg text-center">
                <MapPin className="h-8 w-8 text-spectron-teal mx-auto mb-2" />
                <h4 className="font-medium mb-1">Pin Location on Map</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Click to open map and mark exact location
                </p>
                <Button variant="outline" className="border-spectron-teal text-spectron-teal hover:bg-spectron-teal hover:text-white">
                  Open Map Picker
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-spectron-teal" />
                Property Images
              </CardTitle>
              <CardDescription>
                Add 2-5 high-quality images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-spectron-teal/30 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-spectron-teal mx-auto mb-2" />
                  <h4 className="font-medium mb-1">Upload Images</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Drag & drop or click to browse
                  </p>
                  <Button variant="outline" className="border-spectron-teal text-spectron-teal hover:bg-spectron-teal hover:text-white">
                    Choose Files
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Upload 2-5 images (required)</p>
                  <p>• Maximum 5MB per image</p>
                  <p>• Supported: JPG, PNG, WebP</p>
                  <p>• First image will be the cover photo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-spectron-teal" />
                Publishing Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-heritage-cream/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Auto-publish</h4>
                    <p className="text-xs text-muted-foreground">Publish immediately after review</p>
                  </div>
                  <input type="checkbox" className="rounded border-spectron-teal text-spectron-teal focus:ring-spectron-teal" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-heritage-cream/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">Featured Listing</h4>
                    <p className="text-xs text-muted-foreground">Boost visibility (₹500/month)</p>
                  </div>
                  <input type="checkbox" className="rounded border-spectron-teal text-spectron-teal focus:ring-spectron-teal" />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-spectron-gold to-spectron-teal">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Property Listing
                </Button>
                
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help & Tips */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-spectron-teal" />
                Listing Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p>Use high-quality, well-lit photos</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p>Write detailed, honest descriptions</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p>Price competitively based on market rates</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p>Highlight unique features and amenities</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p>Respond quickly to inquiries</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}