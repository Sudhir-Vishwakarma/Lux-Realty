# Realistic Content Enrichment — Design Spec

**Date:** 2026-06-23
**Project:** LuxeRealty (Mumbai-focused real estate landing page)
**Scope:** Enrich all placeholder content with realistic Mumbai real estate data + add 3 new sections so the AI chatbot has rich, accurate information to reference.

---

## Goal

Replace all US-centric / placeholder content with realistic Mumbai real estate data and add About Us, Team/Agents, and FAQ sections. The AI chatbot integration depends on this content being detailed and accurate.

---

## 1. Existing Sections — Content Updates

### Hero
- Floating card 1: "Sea View 3BHK" — Worli, Mumbai — ₹4.50 Cr
- Floating card 2: "Deal Closed!" — Premium Villa, Juhu — ₹2.80 Cr
- Quick stats row: 5,000+ Properties | 3,200+ Happy Clients | 25+ Localities
- Search price range options updated to INR (Under ₹50L → ₹3Cr+)

### Stats Bar
- 5K+ Properties Listed
- 3.2K+ Happy Clients
- 15+ Years Experience
- 25+ Mumbai Localities

### Featured Properties (6 cards)
| # | Title | Location | Price | Type | Beds | Baths | Area |
|---|---|---|---|---|---|---|---|
| 1 | Sea View 3BHK Apartment | Worli, Mumbai | ₹4.50 Cr | For Sale | 3 | 2 | 1,650 sq ft |
| 2 | Luxury Studio Apartment | Bandra West, Mumbai | ₹95,000/mo | For Rent | 1 | 1 | 650 sq ft |
| 3 | Spacious Villa with Pool | Juhu, Mumbai | ₹12.75 Cr | For Sale | 5 | 5 | 5,200 sq ft |
| 4 | Modern 2BHK Flat | Powai, Mumbai | ₹1.85 Cr | For Sale | 2 | 2 | 980 sq ft |
| 5 | Premium Office Space | BKC, Mumbai | ₹3,20,000/mo | For Rent | — | — | 2,400 sq ft |
| 6 | Sky Penthouse | Prabhadevi, Mumbai | ₹8.20 Cr | For Sale | 4 | 4 | 3,100 sq ft |

### Testimonials
- Priya Sharma (Home Buyer) — bought 3BHK in Powai
- Rajesh Mehta (Property Investor) — invested in Worli & BKC
- Ananya Iyer (Renter) — found apartment in Bandra West
- Suresh Patel (Home Seller) — sold villa in Juhu above asking

### CTA Banner
- Update count: "3,200+ happy families"

### Footer
- Phone: +91 98200 12345
- Email: hello@luxerealty.com (unchanged)
- Address: 12th Floor, Platina, Bandra Kurla Complex, Mumbai — 400 051
- Founded tagline: "Your trusted Mumbai real estate partner since 2009."

### LeadForm Dropdowns
- INTEREST_OPTIONS: Luxe Serene Heights – Worli | Luxe Greens – Powai | Luxe Marina Villas – Juhu | Luxe BKC Commercial Tower | Luxe Bandra Residences
- OWNER_OPTIONS: Rahul Sharma | Priya Patel | Amit Desai | Neha Kulkarni

### Metadata (layout.tsx)
- Title: "LuxeRealty — Premium Properties in Mumbai"
- Description: "Discover premium residential, commercial & luxury properties in Mumbai. Trusted by 3,200+ clients since 2009."

---

## 2. New Sections

### About Us (after Stats)
- Heading: "Mumbai's Most Trusted Real Estate Partner"
- 2-paragraph company story: founded 2009, grown to 50+ agents, 3,200+ transactions, RERA-registered
- 3 highlight cards: Licensed & RERA Registered | 15+ Years in Mumbai | 3,200+ Successful Transactions

### Our Team / Agents (after Services)
4 agent cards:
| Name | Specialization | Experience | CTA |
|---|---|---|---|
| Rahul Sharma | Luxury Residential | 12 years | Contact |
| Priya Patel | Commercial & Office | 9 years | Contact |
| Amit Desai | Villas & Plotted | 11 years | Contact |
| Neha Kulkarni | Rentals & NRI | 7 years | Contact |

### FAQ (before CTABanner)
8 questions in accordion:
1. What documents do I need to buy a property?
2. How does the buying process work at LuxeRealty?
3. Are your properties RERA registered?
4. What are your brokerage / service charges?
5. Do you assist with home loans?
6. Can NRIs buy property through LuxeRealty?
7. How long does the entire buying process take?
8. How can I become a Channel Partner?

---

## 3. Updated Page Order
```
Navbar → Hero → Stats → About Us → Featured Properties
→ Services → Our Team → How It Works → FAQ
→ Testimonials → CTA Banner → Footer
```

---

## 4. Out of Scope
- No routing or new pages
- No backend changes
- No real images (gradient placeholders retained)
- No changes to form submission logic
