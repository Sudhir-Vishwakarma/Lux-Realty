# Dynamic Features — Design Spec

**Date:** 2026-06-25  
**Reference:** https://paranjapeathena-official.com/  
**Approach:** Pure React + Tailwind, zero new libraries, frontend-only

---

## 1. Smooth Scroll Navigation

- Add `id` anchors to all existing sections
- Navbar links updated: Overview(`#hero`), Properties(`#properties`), Amenities(`#amenities`), Connectivity(`#connectivity`), Floor Plans(`#floorplans`), Team(`#team`), FAQ(`#faq`), Contact(`#contact`)
- `scroll-behavior: smooth` in globals.css
- Active section highlight on scroll using `IntersectionObserver`
- Mobile menu closes on link click

---

## 2. Gallery Section (new — after FeaturedProperties)

6 styled gradient tiles as "Artistic Impressions":

| Tile | Label | Gradient |
|---|---|---|
| 1 | Grand Entrance Lobby | blue-600 → blue-800 |
| 2 | Spacious Living Room | purple-500 → indigo-700 |
| 3 | Premium Kitchen | teal-500 → cyan-700 |
| 4 | Master Bedroom Suite | rose-500 → pink-700 |
| 5 | Rooftop Amenity Deck | amber-500 → orange-600 |
| 6 | Aerial City View | slate-600 → slate-900 |

- Layout: 3-col grid desktop, 2-col tablet, 1-col mobile
- Lightbox: click tile → full-screen overlay, prev/next arrows, ESC to close
- Each tile shows "Artistic Impression" badge (like Paranjape Athena)

---

## 3. Floor Plan / Configuration Section (new — after Gallery)

**Section id:** `#floorplans`  
**Heading:** "Property Configurations"  
**Subheading:** "Thoughtfully designed homes for every lifestyle"

3 tabs with full data:

| Config | Carpet Area | Price Range | Beds | Baths | Balconies | Key Highlight |
|---|---|---|---|---|---|---|
| 1 BHK | 450 – 550 sq ft | ₹85L – ₹1.10 Cr | 1 | 1 | 1 | Compact & efficient layout, ideal for professionals |
| 2 BHK | 750 – 900 sq ft | ₹1.50 Cr – ₹2.20 Cr | 2 | 2 | 2 | Spacious family layout with separate dining area |
| 3 BHK | 1,100 – 1,400 sq ft | ₹3.20 Cr – ₹4.50 Cr | 3 | 3 | 2 | Premium living with master suite & city views |

Each tab:
- Floor plan: CSS-drawn grid diagram (boxes for rooms, labeled)
- Stats row: carpet area, beds, baths, balconies
- Description paragraph
- "Request Price" CTA → opens existing Lead Form modal

---

## 4. Connectivity Section (new — after FloorPlans)

**Section id:** `#connectivity`  
**Heading:** "Perfectly Connected"  
**Subheading:** "Mumbai's prime locations, minutes away"

8 landmark cards (data from Paranjape Athena):

| Landmark | Distance | Mode | Icon |
|---|---|---|---|
| Underground Metro Station | 1 min | Walking | 🚇 |
| Bandra Kurla Complex (BKC) | 2 min | Drive | 🏢 |
| Lower Parel | 8 min | Drive | 🏙️ |
| Worli | 10 min | Drive | 🌆 |
| Bandra Railway Station | 12 min | Drive | 🚉 |
| Bandra–Worli Sea Link | 12 min | Drive | 🌉 |
| T1 Airport (Santacruz) | 15 min | Drive | ✈️ |
| T2 Airport (CST) | 15 min | Drive | ✈️ |

Layout: left — styled map placeholder with animated pin, right — landmark cards grid (2-col)

---

## 5. Amenities Section (new section — id `#amenities`, added after Connectivity, Services section kept)

Use Paranjape Athena amenities data, organised into 4 categories with tab switcher:

| Category | Amenities |
|---|---|
| Outdoor & Landscape | Entrance Plaza, Party Lawn, Party Deck, Walking Track, Rose Garden, Hibiscus Garden, Gazebo, Pergola with Seating, Seating Cove, Feature Wall, Flower Bays, Landscaped Garden |
| Recreation & Sports | Fitness Center, Half Basketball Court, Kids Play Area, Outdoor Workout Space, Yoga / Meditation Deck, Senior Citizen's Area, Pet Park, O2 Park, Acupressure Pathway |
| Lifestyle & Wellness | Sunset Deck, Herbal Gardens, Gardening Space, Festival Court, Urban Seating, Rooftop Lounge |
| Safety & Services | 24×7 Security, CCTV Surveillance, Intercom Facility, Power Backup, Rainwater Harvesting, EV Charging Points |

---

## 6. Updated Page Order

```
Navbar (smooth scroll) → Hero → Stats → AboutUs → FeaturedProperties
→ Gallery → FloorPlans → Connectivity → Amenities → Services
→ TeamAgents → HowItWorks → FAQ → Testimonials → CTABanner → Footer
```

---

## Out of Scope
- No real images
- No backend
- No new npm packages
