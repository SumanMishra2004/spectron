"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Upload, X, MapPin, Home, Image, AlertCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createProperty, uploadPropertyImages } from '@/actions/properties';

// Zod Validation Schemas
const PropertyTypeEnum = z.enum(['APARTMENT', 'HOUSE', 'PLOT']);
const FurnishingStatusEnum = z.enum(['UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED']);

// Step 1 Schema
const step1Schema = z.object({
  title: z.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .trim(),
  description: z.string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  price: z.string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(parseInt(val)), "Price must be a number")
    .refine((val) => parseInt(val) > 0, "Price must be greater than 0")
    .refine((val) => parseInt(val) <= 1000000000, "Price is too high"),
  area: z.string()
    .min(1, "Area is required")
    .refine((val) => !isNaN(parseInt(val)), "Area must be a number")
    .refine((val) => parseInt(val) > 0, "Area must be greater than 0")
    .refine((val) => parseInt(val) <= 100000, "Area seems unrealistic"),
  bhk: z.string()
    .min(1, "BHK is required")
    .refine((val) => !isNaN(parseInt(val)), "BHK must be a number")
    .refine((val) => {
      const num = parseInt(val);
      return num >= 1 && num <= 10;
    }, "BHK must be between 1 and 10"),
  propertyType: PropertyTypeEnum,
  furnishing: FurnishingStatusEnum,
});

// Step 2 Schema
const step2Schema = z.object({
  address: z.string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters")
    .trim(),
  latitude: z.string()
    .refine((val) => !isNaN(parseFloat(val)), "Invalid latitude")
    .refine((val) => {
      const num = parseFloat(val);
      return num >= -90 && num <= 90;
    }, "Latitude must be between -90 and 90"),
  longitude: z.string()
    .refine((val) => !isNaN(parseFloat(val)), "Invalid longitude")
    .refine((val) => {
      const num = parseFloat(val);
      return num >= -180 && num <= 180;
    }, "Longitude must be between -180 and 180"),
});

// Step 3 Schema (images validation)
const step3Schema = z.object({
  images: z.array(z.instanceof(File))
    .min(2, "At least 2 images are required")
    .max(5, "Maximum 5 images allowed")
    .refine((files) => files.every(file => file.type.startsWith('image/')), "All files must be images")
    .refine((files) => files.every(file => file.size <= 10 * 1024 * 1024), "Each image must be less than 10MB"),
});

// Type Definitions
type PropertyType = z.infer<typeof PropertyTypeEnum>;
type FurnishingStatus = z.infer<typeof FurnishingStatusEnum>;

interface FormData {
  title: string;
  description: string;
  price: string;
  area: string;
  bhk: string;
  propertyType: PropertyType | '';
  furnishing: FurnishingStatus | '';
  address: string;
  latitude: string;
  longitude: string;
  images: File[];
}

interface FormErrors {
  [key: string]: string;
}

const PropertyListingForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    area: '',
    bhk: '',
    propertyType: '',
    furnishing: '',
    address: '',
    latitude: '28.6139',
    longitude: '77.2090',
    images: []
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const propertyTypes: PropertyType[] = ['APARTMENT', 'HOUSE', 'PLOT'];
  const furnishingStatuses: FurnishingStatus[] = ['UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED'];

  // Load Leaflet
  useEffect(() => {
    if (step === 2 && !mapLoaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setMapLoaded(true);
      document.body.appendChild(script);
    }
  }, [step]);

  // Initialize map
  useEffect(() => {
    if (step === 2 && mapLoaded && mapRef.current && !mapInstanceRef.current) {
      const L = window.L;
      const initialLat = parseFloat(formData.latitude) || 28.6139;
      const initialLng = parseFloat(formData.longitude) || 77.2090;

      const map = L.map(mapRef.current).setView([initialLat, initialLng], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      const marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(map);
      
      marker.on('dragend', (e) => {
        const pos = e.target.getLatLng();
        updateFormData('latitude', pos.lat.toFixed(6));
        updateFormData('longitude', pos.lng.toFixed(6));
      });

      map.on('click', (e) => {
        marker.setLatLng(e.latlng);
        updateFormData('latitude', e.latlng.lat.toFixed(6));
        updateFormData('longitude', e.latlng.lng.toFixed(6));
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;
    }
  }, [step, mapLoaded, formData.latitude, formData.longitude]);

  const updateFormData = (field: keyof FormData, value: FormData[keyof FormData]): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: FormErrors = {};
    
    try {
      if (stepNum === 1) {
        step1Schema.parse({
          title: formData.title,
          description: formData.description || undefined,
          price: formData.price,
          area: formData.area,
          bhk: formData.bhk,
          propertyType: formData.propertyType,
          furnishing: formData.furnishing,
        });
      } else if (stepNum === 2) {
        step2Schema.parse({
          address: formData.address,
          latitude: formData.latitude,
          longitude: formData.longitude,
        });
      } else if (stepNum === 3) {
        step3Schema.parse({
          images: formData.images,
        });
      }
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  const handleNext = (): void => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = (): void => {
    setStep(prev => prev - 1);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    
    if (formData.images.length + files.length > 5) {
      setErrors({ images: 'Maximum 5 images allowed' });
      return;
    }

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setErrors({ images: 'All files must be images' });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ images: 'Each image must be less than 10MB' });
        return;
      }
    }

    const newImages = [...formData.images, ...files];
    updateFormData('images', newImages);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreviews(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    setErrors({});
  };

  const removeImage = (index: number): void => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    updateFormData('images', newImages);
    setImagePreviews(newPreviews);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateStep(3)) return;
    if (!session?.user?.id) {
      setErrors({ submit: 'Please sign in to submit a property' });
      return;
    }

    setUploading(true);
    setErrors({});
    
    try {
      // Validate images before upload
      if (!formData.images || formData.images.length === 0) {
        throw new Error('Please select at least 2 images');
      }

      if (formData.images.length < 2) {
        throw new Error('Please select at least 2 images');
      }

      if (formData.images.length > 5) {
        throw new Error('Maximum 5 images allowed');
      }

      console.log('Uploading images:', formData.images.length);

      const formDataObj = new FormData();
      formData.images.forEach((file, index) => {
        console.log(`Adding image ${index + 1}:`, file.name, file.type, file.size);
        formDataObj.append('images', file);
      });

      console.log('Calling upload API...');
      const uploadResult = await uploadPropertyImages(formDataObj);
      console.log('Upload result:', uploadResult);
      
      if (!uploadResult) {
        throw new Error('Failed to upload images - no response received');
      }
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || 'Failed to upload images');
      }
      
      if (!uploadResult.urls || uploadResult.urls.length === 0) {
        throw new Error('No URLs returned from upload');
      }

      console.log('Images uploaded successfully:', uploadResult.urls);

      const propertyData = {
        title: formData.title,
        description: formData.description || undefined,
        price: parseInt(formData.price),
        area: parseInt(formData.area),
        bhk: parseInt(formData.bhk),
        propertyType: formData.propertyType as string,
        furnishing: formData.furnishing as string,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        images: uploadResult.urls,
      };

      console.log('Creating property with data:', propertyData);
      const result = await createProperty(propertyData);
      console.log('Property creation result:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create property');
      }
      
      setSubmitted(true);
    } catch (error: unknown) {
      console.error('Error submitting property:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit property. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setUploading(false);
    }
  };

  const formatPropertyType = (type: string): string => {
    return type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  if (submitted) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Card className="w-full shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Property Listed Successfully!</h2>
              <p className="text-muted-foreground">Your property has been submitted for review and will be visible once approved.</p>
              <div className="flex gap-3">
                <Button onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setFormData({
                    title: '',
                    description: '',
                    price: '',
                    area: '',
                    bhk: '',
                    propertyType: '',
                    furnishing: '',
                    address: '',
                    latitude: '28.6139',
                    longitude: '77.2090',
                    images: []
                  });
                  setImagePreviews([]);
                  setErrors({});
                }}>
                  List Another Property
                </Button>
                <Button variant="outline" onClick={() => router.push('/dashboard/properties')}>
                  View My Properties
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="w-full mx-auto py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {s}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    step >= s ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {s === 1 ? 'Details' : s === 2 ? 'Location' : 'Images'}
                  </span>
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-4 transition-colors ${
                    step > s ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Property Details */}
        {step === 1 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Home className="w-5 h-5 text-primary" />
                Property Details
              </CardTitle>
              <CardDescription>Enter the basic information about your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className='space-y-4'>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Spacious 3BHK Apartment in Downtown"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div className='space-y-4'>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className='space-y-4'>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="5000000"
                    value={formData.price}
                    onChange={(e) => updateFormData('price', e.target.value)}
                    className={errors.price ? 'border-red-500' : ''}
                  />
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
                </div>

                <div className='space-y-4'>
                  <Label htmlFor="area">Area (sqft) *</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="1200"
                    value={formData.area}
                    onChange={(e) => updateFormData('area', e.target.value)}
                    className={errors.area ? 'border-red-500' : ''}
                  />
                  {errors.area && <p className="text-sm text-red-500 mt-1">{errors.area}</p>}
                </div>

                <div className='space-y-4'>
                  <Label htmlFor="bhk">BHK *</Label>
                  <Input
                    id="bhk"
                    type="number"
                    placeholder="3"
                    value={formData.bhk}
                    onChange={(e) => updateFormData('bhk', e.target.value)}
                    className={errors.bhk ? 'border-red-500' : ''}
                  />
                  {errors.bhk && <p className="text-sm text-red-500 mt-1">{errors.bhk}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='space-y-4'>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => updateFormData('propertyType', value)}
                  >
                    <SelectTrigger className={errors.propertyType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {formatPropertyType(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.propertyType && <p className="text-sm text-red-500 mt-1">{errors.propertyType}</p>}
                </div>

                <div className='space-y-4'>
                  <Label htmlFor="furnishing">Furnishing Status *</Label>
                  <Select
                    value={formData.furnishing}
                    onValueChange={(value) => updateFormData('furnishing', value)}
                  >
                    <SelectTrigger className={errors.furnishing ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {furnishingStatuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {formatPropertyType(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.furnishing && <p className="text-sm text-red-500 mt-1">{errors.furnishing}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                Location Details
              </CardTitle>
              <CardDescription>Mark your property location on the map</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className='space-y-4'>
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete address with landmark"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
              </div>

              <div className='space-y-4'>
                <Label>Click or drag the marker on the map to set location</Label>
                <div 
                  ref={mapRef} 
                  className="w-full h-96 rounded-lg border-2 border-border mt-2"
                  style={{ zIndex: 0 }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='space-y-4'>
                  <Label htmlFor="latitude">Latitude *</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => {
                      updateFormData('latitude', e.target.value);
                      if (markerRef.current && window.L && mapInstanceRef.current) {
                        const lat = parseFloat(e.target.value);
                        const lng = parseFloat(formData.longitude);
                        if (!isNaN(lat) && !isNaN(lng)) {
                          markerRef.current.setLatLng([lat, lng]);
                          mapInstanceRef.current.setView([lat, lng]);
                        }
                      }
                    }}
                    className={errors.latitude ? 'border-red-500' : ''}
                  />
                  {errors.latitude && <p className="text-sm text-red-500 mt-1">{errors.latitude}</p>}
                </div>

                <div className='space-y-4'>
                  <Label htmlFor="longitude">Longitude *</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => {
                      updateFormData('longitude', e.target.value);
                      if (markerRef.current && window.L && mapInstanceRef.current) {
                        const lat = parseFloat(formData.latitude);
                        const lng = parseFloat(e.target.value);
                        if (!isNaN(lat) && !isNaN(lng)) {
                          markerRef.current.setLatLng([lat, lng]);
                          mapInstanceRef.current.setView([lat, lng]);
                        }
                      }
                    }}
                    className={errors.longitude ? 'border-red-500' : ''}
                  />
                  {errors.longitude && <p className="text-sm text-red-500 mt-1">{errors.longitude}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Images */}
        {step === 3 && (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Image className="w-5 h-5 text-primary" />
                Property Images
              </CardTitle>
              <CardDescription>Upload 2-5 high quality images (max 10MB each)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={formData.images.length >= 5}
                  className="w-full h-32 border-dashed border-2 hover:bg-accent hover:border-primary transition-colors"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-primary" />
                    <span className="font-medium">Click to upload images</span>
                    <span className="text-xs text-muted-foreground">
                      {formData.images.length}/5 images uploaded
                    </span>
                  </div>
                </Button>
                {errors.images && (
                  <Alert className="mt-2" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.images}</AlertDescription>
                  </Alert>
                )}
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg border-2 border-border transition-all group-hover:border-primary"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded">
                        {(formData.images[index].size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Error */}
              {errors.submit && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.submit}</AlertDescription>
                </Alert>
              )}

              {/* Review Summary */}
              <div className="border-t border-border pt-4 mt-4">
                <h3 className="font-semibold mb-3 text-foreground">Review Your Listing</h3>
                <div className="bg-accent/50 p-4 rounded-lg space-y-2 text-sm border border-border">
                  <div className="flex justify-between"><span className="text-muted-foreground">Title:</span> <span className="font-medium">{formData.title}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Type:</span> <span className="font-medium">{formatPropertyType(formData.propertyType)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Price:</span> <span className="font-medium text-primary">₹{parseInt(formData.price).toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Area:</span> <span className="font-medium">{formData.area} sqft</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">BHK:</span> <span className="font-medium">{formData.bhk}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Furnishing:</span> <span className="font-medium">{formatPropertyType(formData.furnishing)}</span></div>
                  <div className="flex flex-col gap-1"><span className="text-muted-foreground">Address:</span> <span className="font-medium text-sm">{formData.address}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Location:</span> <span className="font-medium text-xs">{formData.latitude}, {formData.longitude}</span></div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>Back</Button>
              <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Submit Property'
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PropertyListingForm;