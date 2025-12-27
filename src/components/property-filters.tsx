'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PROPERTY_TYPES, FURNISHING_STATUS, BHK_OPTIONS, PRICE_RANGES } from '@/config/constants';
import { useState } from 'react';
import type { SearchFilters } from '@/types';

interface PropertyFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  currentFilters?: SearchFilters;
}

export function PropertyFilters({ onFiltersChange, currentFilters = {} }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>(currentFilters);

  const handlePriceChange = (value: string) => {
    const range = PRICE_RANGES.find(r => r.label === value);
    if (range) {
      const newFilters = { ...filters, minPrice: range.min, maxPrice: range.max };
      setFilters(newFilters);
      onFiltersChange(newFilters);
    }
  };

  const handleBHKChange = (value: string) => {
    const bhk = parseInt(value);
    const currentBhk = filters.bhk || [];
    const newBhk = currentBhk.includes(bhk)
      ? currentBhk.filter(b => b !== bhk)
      : [...currentBhk, bhk];
    
    const newFilters = { ...filters, bhk: newBhk };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePropertyTypeChange = (value: string) => {
    const currentTypes = filters.propertyType || [];
    const newTypes = currentTypes.includes(value)
      ? currentTypes.filter(t => t !== value)
      : [...currentTypes, value];
    
    const newFilters = { ...filters, propertyType: newTypes };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleFurnishingChange = (value: string) => {
    const currentFurnishing = filters.furnishing || [];
    const newFurnishing = currentFurnishing.includes(value)
      ? currentFurnishing.filter((f) => f !== value)
      : [...currentFurnishing, value];
    
    const newFilters = { ...filters, furnishing: newFurnishing };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label>Price Range</Label>
          <Select onValueChange={handlePriceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select price" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((range) => (
                <SelectItem key={range.label} value={range.label}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>BHK</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {BHK_OPTIONS.map((bhk) => (
              <Button
                key={bhk}
                variant={filters.bhk?.includes(bhk) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleBHKChange(bhk.toString())}
              >
                {bhk} BHK
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Property Type</Label>
          <div className="mt-2 space-y-2">
            {PROPERTY_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={filters.propertyType?.includes(type.value) ? 'default' : 'outline'}
                size="sm"
                className="w-full justify-start"
                onClick={() => handlePropertyTypeChange(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Furnishing</Label>
          <div className="mt-2 space-y-2">
            {FURNISHING_STATUS.map((status) => (
              <Button
                key={status.value}
                variant={filters.furnishing?.includes(status.value) ? 'default' : 'outline'}
                size="sm"
                className="w-full justify-start"
                onClick={() => handleFurnishingChange(status.value)}
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
