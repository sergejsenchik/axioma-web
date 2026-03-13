# Mock Data Strategy — Axioma

## Purpose

During frontend development, apartment data is loaded from a local JSON file. The backend developer will replace this with PHP server-rendering at handoff.

## JSON Schema

File: `data/mock-apartments.json`

```json
{
  "apartments": [
    {
      "id": 1,
      "building": "A",
      "floor": 3,
      "number": "A-301",
      "rooms": 2,
      "area": 54.2,
      "price": 125000,
      "status": "available",
      "balcony_area": 5.8,
      "orientation": "south",
      "photos": [
        "uploads/images/apt-a-301-1.jpg",
        "uploads/images/apt-a-301-2.jpg"
      ],
      "plan_image": "static/img/plans/a-301.svg",
      "svg_polygon_id": "apt-a-301"
    }
  ]
}
```

### Field Reference

| Field | Type | Values |
|-------|------|--------|
| `id` | number | Unique identifier |
| `building` | string | "A", "B", "C" |
| `floor` | number | 1-5 |
| `number` | string | "{building}-{floor}{unit}" |
| `rooms` | number | 1-4 |
| `area` | number | Square meters (float) |
| `price` | number | EUR, whole number |
| `status` | string | "available", "reserved", "sold" |
| `balcony_area` | number | Square meters (float) |
| `orientation` | string | "north", "south", "east", "west" |
| `photos` | array | Paths relative to project root |
| `plan_image` | string | SVG floor plan path |
| `svg_polygon_id` | string | Matches polygon ID in SVG map |

### Status Distribution (for realistic testing)

- ~60% available
- ~25% reserved
- ~15% sold

## Loading Mock Data

```javascript
// In static/js/script.js
$.getJSON('data/mock-apartments.json', function(data) {
    var apartments = data.apartments;
    // Render apartment cards, tables, update SVG map colors
});
```

## Migration Path for Backend Developer

1. Remove `data/mock-apartments.json` from production
2. Replace `$.getJSON` calls with server-rendered HTML using PHP loops
3. Apartment data comes from PHP CMS database
4. SVG polygon IDs remain the same — backend renders matching IDs
5. Status classes (`tr-status-available`, etc.) are applied server-side

## Recommended Volume

- 40-60 apartments across 2-3 buildings
- 3-5 floors per building
- Mix of 1-4 room apartments
- Realistic price range for Lithuanian market (80,000-200,000 EUR)
