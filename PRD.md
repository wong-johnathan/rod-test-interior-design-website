# Product Requirements Document (PRD)
## Interior Design Lead Generation Website

**Status:** Draft v1.0
**Date:** 2026-06-02
**Author:** Johnathan Wong

---

## 1. Executive Summary

A visual-first, SEO-optimized lead generation website for an interior design portfolio. The site functions like a lightweight Pinterest — image-driven discovery with interstitial Call-to-Action (CTA) prompts — to convert 8+ years of interior design photography into qualified leads.

The primary goal is **lead capture**, not portfolio showcase. Every browsing experience funnels visitors toward a consultation booking or enquiry form.

---

## 2. Business Objectives

| Objective | Metric | Target |
|-----------|--------|--------|
| Lead generation | Submissions/month | 20+ qualified leads/month |
| SEO visibility | Organic search impressions | Top 10 for "interior design [city]" within 6 months |
| Engagement | Avg. session duration | 3+ minutes |
| Bounce rate | Single-page exits | < 40% |
| Image utilization | Photos served from library | 500+ photos indexed |

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG for SEO, image optimization, file-based routing |
| **Language** | TypeScript | Type safety, better DX at scale |
| **Data Storage** | Local JSON/TypeScript files (`data/projects.ts`) | No DB needed — projects live in code until real photos are migrated in |
| **Images** | Placeholder (picsum.photos / unsplash) → replaced with real photos later | No image hosting service required for MVP |
| **Styling** | Tailwind CSS | Rapid prototyping, consistent design system |
| **Deployment** | Vercel | One-click deploy, static export compatible |
| **Contact Form** | [Formspree / Web3Forms / Netlify Forms] | Serverless form handling — no backend needed |

---

## 4. User Personas

### 4.1 Homeowner / Renovator (Primary)
- **Needs:** Inspiration, style matching, budget-friendly ideas
- **Pain points:** Overwhelmed by choices, unsure of style, worried about cost
- **Conversion trigger:** "Get a free quote" after seeing a project matching their vibe

### 4.2 Property Developer / Agent
- **Needs:** Showroom/high-end project inspiration, bulk enquiries
- **Pain points:** Finding a designer who understands commercial timelines
- **Conversion trigger:** "Enquire for commercial projects"

### 4.3 Architect / Contractor
- **Needs:** Referral partnerships, portfolio credibility
- **Conversion trigger:** "Partner with us" link

---

## 5. Features & Prioritization

### P0 — MVP (Must Have)

| Feature | Description |
|---------|-------------|
| **Image Grid (Masonry)** | Pinterest-style infinite-scroll masonry layout |
| **Project Cards** | Each photo linked to a project with title, style tags, room type, location |
| **Project Detail Page** | Gallery view, description, before/after toggle where applicable |
| **CTA Module (Interleaved)** | A "Get a Free Quote" / "Book Consultation" card appears every ~6–8 images |
| **Lead Form** | Name, Email, Phone, Property Type, Budget Range, Message |
| **SEO Foundation** | Per-page meta titles, descriptions, OG tags, structured data (LocalBusiness, Article) |
| **Category / Filter** | Filter by style (Modern, Scandinavian, Industrial, etc.), room type (Kitchen, Living, Bedroom), budget tier |
| **Responsive Design** | **Non-negotiable.** Mobile-first layout — thumb-friendly tap targets, swipe gestures, no horizontal scroll. Masonry adapts: 2 cols mobile → 3 tablet → 4 desktop. CTA + lead form fully usable on all screen sizes. |
| **Image Optimization** | Lazy loading, WebP/AVIF, responsive srcset |

### P1 — Next Phase (Should Have)

| Feature | Description |
|---------|-------------|
| **Search** | Full-text search across projects, tags, descriptions |
| **Related Projects** | "You might also like" carousel on project pages |
| **Lightbox** | Click-to-expand image viewer with swipe on mobile |
| **Before/After** | Side-by-side or slider comparison for renovation projects |
| **Testimonials** | Social proof section with client quotes and photos |
| **Blog / Articles** | SEO content hub (e.g., "Top 10 Kitchen Renovation Trends 2026") |
| **Sitemap + RSS** | Dynamic XML sitemap and RSS feed for search engines |
| **Page Speed** | 90+ Lighthouse score |

### P2 — Nice to Have

| Feature | Description |
|---------|-------------|
| **Saved / Favourites** | Users can "like" or bookmark projects (localStorage or account) |
| **Social Sharing** | Share buttons for each project |
| **Video Integration** | Embedded reels / walkthroughs for featured projects |
| **Multi-language** | English + Chinese (CN) for Singapore market |
| **Client Portal** | Private galleries for existing clients to review progress |
| **Admin Dashboard** | Manage images, projects, leads, analytics at a glance |

---

## 6. Site Architecture / Sitemap

```
/                           ← Home: Featured grid + hero CTA
/projects                   ← All projects (masonry grid, filterable)
/projects/[slug]            ← Project detail page
/styles/[style]             ← Filtered by style tag (e.g., /styles/scandinavian)
/rooms/[room-type]          ← Filtered by room (e.g., /rooms/kitchen)
/about                      ← About the designer / firm
/contact                    ← Contact form / enquiry
/blog                       ← Blog index (P1)
/blog/[slug]                ← Blog post (P1)
/faq                        ← FAQ / process explainer
/privacy                    ← Privacy policy
```

---

## 7. Image & Content Strategy

### 7.1 Image Organization (Planned Schema — For Reference)

When real photos are migrated in, this is the data structure. For the MVP, we'll use a local `data/projects.ts` file with placeholder image URLs and sample metadata:

```typescript
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  client?: string;
  location?: string;
  year: number;
  style: string[];
  roomType: string[];
  budgetTier?: "budget" | "mid-range" | "luxury";
  featured: boolean;
  images: ProjectImage[];
  testimonial?: string;
}

interface ProjectImage {
  url: string;           // placeholder URL → real URL later
  alt: string;
  caption?: string;
  width: number;
  height: number;
  isBefore?: boolean;
  order: number;
}
```

### 7.2 SEO Metadata Per Project

- **Title:** `"{Room Type} — {Style} Interior Design in {Location} | {Brand}"`
- **Description:** `"Browse our {style} {room} project in {location}. {Unique hook}. Get a free consultation."`
- **Keywords:** `interior design, {style}, {room}, {location}`

### 7.3 Interleaved CTAs

CTA blocks appear every **6–8 images** in the masonry grid. Two variants:

1. **Inline CTA Card** — A styled card in the grid: "Love this style? Let's bring it to your home."
2. **Sticky Bottom CTA** — A persistent (but dismissable) bar on scroll: "Get your free consultation →"

Variants cycle to avoid banner blindness.

---

## 8. Lead Capture Flow

Since there's no backend, form submissions go through a serverless form service (e.g., Formspree):

```
Visitor lands on page (organic / direct / social)
        │
        ▼
Browses image grid ←→ Filters by style / room
        │
        ▼
Sees interleaved CTA (every 6–8 images)
        │
        ▼
        ├── Clicks CTA → Lead form opens (modal or embedded)
        │
        └── Clicks project → Project detail → CTA at bottom of gallery
                                       │
                                       ▼
                                  Lead form (POST to Formspree / Netlify Forms)
                                       │
                                       ▼
                    ┌──────────────────────────┐
                    │ 1. Thank-you page shown   │
                    │ 2. Email forwarded to you │
                    │ 3. (Optional: webhook)    │
                    └──────────────────────────┘
```

---

## 9. SEO Requirements

| Element | Implementation |
|---------|---------------|
| **SSR/SSG** | Next.js App Router — server components by default, SSG with `generateStaticParams()` for all project/filter pages |
| **Metadata API** | `generateMetadata()` for dynamic per-page meta |
| **Structured Data** | JSON-LD: `LocalBusiness`, `Article`, `ImageGallery`, `FAQPage` |
| **Sitemap** | `app/sitemap.ts` — dynamic, includes all projects + filter pages |
| **Robots.txt** | `app/robots.ts` |
| **Open Graph** | OG title, description, image per project/page |
| **Alt Text** | Every image has descriptive alt text from metadata |
| **Core Web Vitals** | Target LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| **Semantic HTML** | Proper heading hierarchy (`h1` → `h6`), `<article>`, `<nav>`, `<figure>` |

---

## 10. Design Guidelines

### 10.1 Visual Style
- **Clean & Minimal** — Let the photos speak; lots of whitespace
- **Color Palette:** Neutral base (#F8F7F4, #FFFFFF) with an accent (#1A1A2E or a warm tone like #C9A96E)
- **Typography:** Inter or system sans-serif for body, Playfair Display or similar for headings
- **Grid:** Pinterest-style variable-height masonry (columns: 2 on mobile, 3 on tablet, 4 on desktop)

### 10.2 CTA Design
- **Color:** High-contrast accent button (e.g., #C9A96E gold / warm tone)
- **Copy:** Benefit-driven ("Get Your Free Quote", "Book Your Consultation")
- **Placement:** Every 6–8 images in the grid, plus below project descriptions

### 10.3 Mobile Responsiveness (Hard Requirement)
The site must be **fully usable on mobile first** — most visitors will browse on phones.

| Requirement | Detail |
|-------------|--------|
| **Thumb zone** | All tap targets ≥ 44px, CTAs + menu within thumb reach (bottom of screen) |
| **Masonry columns** | 2 cols on mobile, 3 on tablet (768px+), 4 on desktop (1024px+) |
| **No horizontal scroll** | Images auto-scale to viewport width. Overflow: hidden enforced. |
| **Lead form** | Full-width inputs, large tap targets, autofill enabled, keyboard-friendly |
| **Filter bar** | Horizontal scrollable chips (mobile) vs inline row (desktop) |
| **Lightbox (P1)** | Swipe to navigate, pinch to zoom on touch devices |
| **Sticky CTA bar** | Fixed bottom bar on mobile only — dismissable, reappears on scroll |

---

## 11. Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Time to Interactive | < 2.5s |
| First Contentful Paint | < 1.5s |

---

## 12. Future Considerations

- **A/B Testing:** Test CTA placement frequency (every 4 vs 6 vs 8 images)
- **Retargeting:** Facebook/Google pixel for warm leads
- **Automated Follow-ups:** Email sequence after form submission
- **WhatsApp Integration:** Direct enquiry via WhatsApp API (key for SG market)
- **Portfolio Segmentation:** Separate "Residential" and "Commercial" browsing paths
- **Image Auto-Tagging:** AI-powered style/room detection for batch photo cataloging

---

## 13. Open Questions (To Be Decided)

1. **Contact form service:** Formspree, Web3Forms, or Netlify Forms? (Free tiers differ)
2. **Hosting domain:** Custom domain already purchased?
3. **Analytics:** Google Analytics or privacy-first (Plausible / Umami)?
4. **Lead notifications:** Just email to you, or SMS / WhatsApp too?
5. **Launch timeline:** Any target date for MVP launch?
6. **Photo library size:** Rough count of photos available (500? 5000?) — just to know how big the data file gets

---

## 14. Success Criteria

- [ ] 20+ qualified leads/month within 3 months of launch
- [ ] Top 10 Google ranking for primary keywords
- [ ] < 40% bounce rate
- [ ] 90+ Lighthouse score on all pages
- [ ] All 8 years of photo library indexed and searchable
