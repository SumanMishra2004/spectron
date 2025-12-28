# Leaflet Installation Required

To use the map location picker and map-based property search features, you need to install the following packages:

```bash
npm install leaflet react-leaflet leaflet.markercluster
npm install -D @types/leaflet @types/leaflet.markercluster
```

Or with yarn:

```bash
yarn add leaflet react-leaflet leaflet.markercluster
yarn add -D @types/leaflet @types/leaflet.markercluster
```

Or with pnpm:

```bash
pnpm add leaflet react-leaflet leaflet.markercluster
pnpm add -D @types/leaflet @types/leaflet.markercluster
```

After installation, both the property listing form with map location picker and the map-based property search will work correctly.

## Features Included:

1. **Property Listing Form** (`/dashboard/properties/new`)
   - Interactive map to select property location
   - Click anywhere on map to set coordinates
   - Search locations by address
   - Reverse geocoding for address lookup

2. **Map-Based Property Search** (`/map`)
   - View all properties on an interactive map
   - Custom price markers for each property
   - Marker clustering for better performance
   - Filter properties by price, BHK, type
   - Search by location/area
   - Click markers to view property details
   - Automatic bounds-based filtering
