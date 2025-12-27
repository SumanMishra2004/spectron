'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function LocationPermission() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if geolocation is supported and permission status
    if ('geolocation' in navigator && 'permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setHasPermission(result.state === 'granted');
        
        result.addEventListener('change', () => {
          setHasPermission(result.state === 'granted');
        });
      });
    }
  }, []);

  const requestLocationAndUpdate = async () => {
    if (!session?.user?.id) {
      toast.error('Please sign in first');
      return;
    }

    if (!('geolocation' in navigator)) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);

    try {
      // Request location permission
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;

      // Optional: Reverse geocode to get address (using a free API)
      let address = '';
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        address = data.display_name || '';
      } catch (error) {
        console.error('Failed to get address:', error);
      }

      // Update user location via API
      const updateResponse = await fetch('/api/user/location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
          address,
        }),
      });

      const result = await updateResponse.json();

      if (!updateResponse.ok) {
        throw new Error(result.error || 'Failed to update location');
      }

      setHasPermission(true);
      toast.success('Location updated successfully!');
    } catch (error: any) {
      console.error('Location error:', error);
      
      if (error.code === 1) {
        toast.error('Location permission denied. Please enable it in your browser settings.');
      } else if (error.code === 2) {
        toast.error('Location unavailable. Please try again.');
      } else if (error.code === 3) {
        toast.error('Location request timed out. Please try again.');
      } else {
        toast.error(error.message || 'Failed to update location');
      }
    } finally {
      setLoading(false);
    }
  };

  // Don't show if not authenticated
  if (status === 'loading') {
    return null;
  }

  if (!session?.user?.id) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {hasPermission === false || hasPermission === null ? (
        <Button
          onClick={requestLocationAndUpdate}
          disabled={loading}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Getting Location...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4" />
              Enable Location
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={requestLocationAndUpdate}
          disabled={loading}
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <MapPin className="h-4 w-4 text-green-500" />
              Update Location
            </>
          )}
        </Button>
      )}
    </div>
  );
}
