# SEO & Marketing Plan — Rod's Interior

> **Website:** https://rod-test-interior-design-website.vercel.app/  
> **Brand:** Rod's Interior  
> **Market:** Singapore — HDB & Condo interior design  
> **Date:** 2026-06-02  
> **Goal:** Rank for Singapore interior design keywords → generate leads via free photo downloads

---

## Part 1: SEO Strategy

### 1.1 Keyword Research

**Primary Keywords (High Intent — Target First)**

| Keyword | Est. Monthly Search (SG) | Intent | Difficulty |
|---------|------------------------|--------|------------|
| interior design Singapore | 2,900 | Informational / Commercial | Very High |
| HDB renovation Singapore | 1,600 | Transactional | High |
| Singapore interior designer | 1,300 | Transactional | High |
| condo interior design Singapore | 1,000 | Transactional | Medium |
| kitchen renovation Singapore | 1,600 | Transactional | Medium-High |
| HDB renovation cost | 1,200 | Transactional | Medium |

**Low Competition — High Value Long-Tails**

| Keyword | Est. Monthly Search | Notes |
|---------|-------------------|-------|
| 4-room HDB renovation cost Singapore | 800 | Strong buyer intent |
| Scandinavian interior design Singapore | 200-400 | Niche, growing |
| Japandi design Singapore | 150-250 | Trending in SG |
| BTO interior design package | 300 | New homeowner audience |
| minimalist HDB design 5-room | 150 | Specific flat type |
| free interior design consultation Singapore | 50 | High conversion |
| HDB resale renovation guide | 400 | Practical intent |

**Location-Based Keywords (Per HDB Town)**

| Town | Est. Monthly Search (Town + Renovation) |
|------|----------------------------------------|
| Tampines | 2,300 |
| Jurong | 2,100 |
| Bedok | 1,900 |
| Punggol | 1,800 |
| Woodlands | 1,700 |
| Toa Payoh | 1,500 |
| Ang Mo Kio | 1,400 |
| Clementi | 1,100 |

---

### 1.2 Technical SEO

#### Structured Data (JSON-LD) — Priority Implementation

| Schema Type | Pages | Purpose |
|-------------|-------|---------|
| **LocalBusiness** | Homepage, About, Contact | Name, address (Singapore), phone, area served, price range |
| **BreadcrumbList** | All pages | Navigation path (Home > Projects > Project Name) |
| **FAQPage** | Blog posts, service pages | Q&A snippets in search results |
| **ImageObject** | Project gallery images | Caption, description, content location, author |
| **AggregateRating** | Homepage | Client review stars in SERP |
| **Product** | Free photo download pages | Zero-price offer with structured data |

**Implementation Example — LocalBusiness:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rod's Interior",
  "image": "https://rod-test-interior-design-website.vercel.app/og-image.jpg",
  "url": "https://rod-test-interior-design-website.vercel.app",
  "telephone": "+65-XXXX-XXXX",
  "priceRange": "$$",
  "areaServed": "Singapore",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SG"
  }
}
```

#### Core Web Vitals Optimisation (Next.js)

| Metric | Current Setup | Improvements |
|--------|---------------|-------------|
| **LCP** | `next/image` with priority on hero | Preload hero font, keep hero <150KB WebP |
| **INP** | Lazy loading active | `next/dynamic` for heavy components (form popups) |
| **CLS** | Explicit width/height on images | Add `aspect-ratio` CSS for all containers |
| **TTFB** | Vercel Edge (good) | Already optimal |

#### Existing Technical Assets (✅ Already Done)
- ✅ Dynamic sitemap.xml (all 86 project pages)
- ✅ robots.ts (index + follow)
- ✅ Per-page `generateMetadata()` with OpenGraph
- ✅ Semantic HTML (h1-h3 headings, `<article>`, `<nav>`)
- ✅ Mobile-first responsive design
- ✅ Image lazy loading with `loading="lazy"` + `sizes`

#### Technical Gaps to Fix

| Issue | Fix |
|-------|-----|
| No JSON-LD structured data | Add LocalBusiness + BreadcrumbList + AggregateRating |
| No `canonical` URL tags | Auto-add via Next.js Metadata API |
| Missing `hreflang` | Not needed (SG only), but set `geo.region` in Search Console |
| No `theme-color` meta | Add `<meta name="theme-color" content="#F8F7F4">` |

---

### 1.3 On-Page SEO

#### Per-Project Page Template

| Element | Format | Example |
|---------|--------|---------|
| **Meta Title** | `[Style] [Room] [HDB/Condo] in [Location] \| Rod's Interior` | "Scandinavian Living Room HDB Renovation in Tampines | Rod's Interior" |
| **Meta Description** | 150-160 chars: style + location + cost hint + CTA | "Explore a Scandinavian 4-room HDB transformation in Tampines. Warm wood tones, open layout. See photos + get your free quote." |
| **H1** | Project title | "Scandinavian-inspired 4-Room HDB at Tampines" |
| **H2 Sections** | The Brief → Before & After → Design Concept → Cost Breakdown → Client Review | Improves readability + featured snippet chances |
| **Image Alt Text** | `[Style] [room] [flat type] [location] - [unique feature]` | "Scandinavian living room 4-room HDB Tampines with light oak flooring and grey sofa" |

#### Content Gaps (Add to Project Pages)

- [ ] **Cost range** — Add approximate budget (e.g., "$35k - $50k") to each project
- [ ] **Timeline** — Add "Project Duration: 6 weeks"
- [ ] **Client testimonial** — 1-2 quotes per project
- [ ] **FAQ accordion** — "What was the budget for this project?", "How long did it take?"
- [ ] **Before/after slider** — Interactive comparison (P1 feature)

#### Internal Linking Strategy

```
Homepage Featured Projects
    └──→ /projects/[slug]
            ├──→ /projects?style=Scandinavian  (tag links)
            ├──→ /projects?room=Living+Room     (tag links)
            ├──→ /projects (related projects section)
            └──→ /contact (CTA)
```

---

### 1.4 Local SEO

#### Google Business Profile (GBP) Setup

- **Category:** Interior Designer (primary), Home Stager (secondary)
- **Service Areas:** All HDB towns (Tampines, Bedok, Jurong, Woodlands, Punggol, Clementi, etc.)
- **Posts:** Weekly — project photo + caption, blog link, free photo pack offer
- **Reviews:** Ask clients post-completion; responses within 24 hours

#### Location Pages

Create dedicated pages for each HDB town:
- `/hdb-renovation-tampines`
- `/hdb-renovation-woodlands`
- `/condo-interior-design-jurong`

Each page: 300+ words unique content, 3-5 project photos from that area, local schema with HDB town name, nearby landmarks (MRT, shopping mall).

#### Singapore Citation Directories

| Directory | URL | Priority |
|-----------|-----|----------|
| Houzz Singapore | houzz.com.sg | High |
| Renopedia | renopedia.sg | High |
| The Interior Design Directory | theinteriordesign.com.sg | Medium |
| 99.co (Renovation) | 99.co | Medium |
| StreetDirectory | streetdirectory.com | Low |
| Singtel Yellow Pages | yellowpages.com.sg | Low |

---

### 1.5 Content Strategy (Blog Topics)

| # | Topic | Target Keyword | Est. Traffic |
|---|-------|---------------|--------------|
| 1 | "How Much Does HDB Renovation Cost in Singapore 2025" | HDB renovation cost | 1,200/mo |
| 2 | "5 Scandinavian HDB Design Trends for 2025" | Scandinavian HDB design | 400/mo |
| 3 | "Before & After: 3-Room HDB Japandi Transformation" | Japandi HDB transformation | 300/mo |
| 4 | "BTO Renovation Timeline: What to Expect" | BTO renovation timeline | 600/mo |
| 5 | "Top 10 Interior Design Mistakes Singapore Homeowners Make" | interior design mistakes | 300/mo |
| 6 | "Condo vs HDB Interior Design: Key Differences" | condo vs HDB design | 200/mo |
| 7 | "HDB Resale Renovation: What You Can and Cannot Do" | HDB resale renovation | 400/mo |
| 8 | "Room-by-Room HDB Renovation Guide: Living Room" | HDB living room design | 150/mo |
| 9 | "How to Choose an Interior Designer in Singapore" | choose interior designer | 500/mo |
| 10 | "Free HDB Interior Design Photo Pack: Scandinavian Living Room" | free HDB design photos | 100/mo |

**Posting Cadence:** 2 posts/week (1 practical guide + 1 case study)

**Content Format:**
- Pillar pages: Comprehensive guides linking to sub-pages
- Cluster content: Project showcases linking back to pillar
- Visual: Before/after sliders, cost breakdown tables, style comparison grids

---

### 1.6 Backlink Strategy

| Source | Specific Sites | Method |
|--------|---------------|--------|
| **Home Decor Media** | Home & Decor SG, Stacked Homes, Design Intervention | Pitch before/after stories, guest posts |
| **Property Portals** | 99.co, PropertyGuru Reno | Submit portfolio for directory, expert quotes |
| **Renovation Forums** | HardwareZone, RenoTalk, Reddit r/singapore | Active Q&A participation |
| **Directories** | Houzz SG, Interior Design Directory | Claim & optimise listings |
| **Digital PR** | Infographic "HDB Renovation Cost by Town" | Pitch to media for backlinks |

---

### 1.7 Lead Magnet SEO — Free Photo Downloads

| Element | Optimisation |
|---------|-------------|
| **Landing Page** | `/free-hdb-interior-design-photos/` |
| **Meta Title** | "Free HDB Interior Design Photos — 20 High-Res Images | Rod's Interior" |
| **H1** | "Free Download: 20 HDB Interior Design Photos" |
| **Body** | 300+ words describing the pack, styles included, how to use |
| **Schema** | `Product` with `offers: {price: 0, priceCurrency: SGD}` |
| **Alt Text** | Each thumbnail: "Scandinavian living room HDB free photo pack" |
| **Gating** | Name + Email (minimal friction), redirect to download |
| **Internal Links** | From project pages: "Get more inspiration — download our free photo pack" |

**Photo Pack Topics (SEO-friendly):**
1. Scandinavian HDB Living Room (20 photos)
2. Japandi Bedroom Interior (15 photos)
3. Minimalist Kitchen Renovation (25 photos)
4. BTO 4-Room Design Ideas (30 photos)
5. Condo Interior Design — High-Rise Views (20 photos)

---

### 1.8 Implementation Priority

| Phase | Timeline | Actions |
|-------|----------|---------|
| **Immediate** | Week 1-2 | JSON-LD schemas (LocalBusiness + Breadcrumb + Review), submit sitemap to GSC, create 5 location pages |
| **Short-term** | Month 1 | Fix meta titles/descriptions for all 86 projects, bulk update alt text, publish 4 blog posts |
| **Medium-term** | Month 2-3 | Build 10 blog posts, acquire 10 backlinks, launch photo pack lead magnets, GBP weekly posts |
| **Ongoing** | Monthly | Monitor rankings (GSC), update cost guide annually, request reviews |

---

## Part 2: Marketing Plan (Social Media + Paid)

### 2.1 Instagram Strategy

**Content Pillars (Rotating Weekly)**

| Day | Format | Topic |
|-----|--------|-------|
| Monday | **Reel** | Before/after transformation (e.g., "3-room HDB → Scandinavian") |
| Wednesday | **Carousel** | Style guide ("Japandi vs Modern — which suits your flat?") |
| Friday | **Stories** | Client testimonial series |
| Saturday | **Carousel** | Reno tip ("5 mistakes when choosing HDB flooring") |

**Hashtag Strategy**
- Core (every post): `#sginteriordesign #hdbrenovation #sgrenovation #interiordesignsg #rodsinterior`
- Niche (rotate): `#japandihome #scandinavianhomesg #hdbresale #condorenovation #btoflat`

**Posting Frequency:** 4 Reels + 2 carousels/week. Stories daily.
- 60% Reels (algorithm priority)
- 30% Carousels (saves + shares)
- 10% Static + Stories

**Micro-Influencer Collaborations**
- Target: SG home accounts with 5k-20k followers (e.g., `@sg.homejourney`, `@renovationdiarysg`)
- Offer: Free premium photo pack + small fee ($0-$200) for tagged Reel

---

### 2.2 TikTok Strategy

**Content Themes (Singapore-Specific, 15-30 sec)**
- "How much does a HDB kitchen renovation actually cost?" — cost breakdown overlay
- "Scandinavian vs Japandi — side-by-side in 30 seconds"
- "3 things every Singapore condo owner must know before renovating"
- Time-lapse transformations with trending audio

**TikTok SEO for Captions**
- Include keywords: "HDB renovation cost Singapore", "Japandi interior design", "Scandinavian HDB"
- 3-5 relevant hashtags only
- Every 3rd video: "Want free high-res photos of this style? Link in bio."

**Posting Frequency:** 1/day (7/week)

---

### 2.3 Facebook Strategy

**Targeted Ads (Meta Ads Manager)**

| Parameter | Setting |
|-----------|---------|
| Age | 28-50 |
| Location | Singapore (HDB towns) |
| Interests | Home renovation, HDB, Interior Design, IKEA, PropertyGuru, 99.co |
| Exclude | Previous downloaders (retargeting pixel) |

**Retargeting Funnel**
1. Viewed landing page, no form → "Limited time premium pack" ad
2. Submitted form → Exclude from lead ads, serve consultation offer
3. Lookalike audience (1%) from email list (once 100+ submissions)

**Facebook Groups**
- Join: "Singapore Home & Decor" (170k), "Reno Forum Singapore"
- Post value: share free download with genuine tip
- No spamming — engage in comments naturally

---

### 2.4 Lead Magnet Campaign

**Funnel:**
```
Social Post (Reel/Carousel/Ad)
    ↓
Landing Page (6-8 photo previews)
    ↓
Form (Name, Email, Phone, Property Type)
    ↓
Download → Email Sequence (3 emails)
```

**Landing Page:** `/free-photos/` — preview grid, short copy, "Download Now →" CTA

**Email Sequence (Brevo/MailerLite free tier):**

| Email | Timing | Content |
|-------|--------|---------|
| 1 | Immediate | "Your free photos are ready!" + download link + 2 style guides |
| 2 | Day 3 | "Renovation planning checklist" + tease paid consultation |
| 3 | Day 7 | "Need help? Book a free 15-min call" + portfolio highlights |

---

### 2.5 Paid Ad Strategy (SGD 500-1000/month)

| Channel | Allocation | Best For |
|---------|------------|----------|
| Instagram Reels ads | 40% | Best engagement (SG homeowners 28-40) |
| Facebook feed ads | 30% | Retargeting + lookalike |
| TikTok Spark Ads | 20% | Boosting organic videos |
| Facebook Stories ads | 10% | Low CPM |

**Ad Creative Samples:**
- **Reel:** Before/after side-by-side + "Your dream HDB interior is one click away"
- **Carousel:** Slide 1 = "Get free interior design photos", Slides 2-4 = samples, Slide 5 = form
- **Video:** 15-sec transformation → "Download the look for free"

**Target KPIs:** CPM < $0.08 (Meta SG), CTR > 1.5%, CPL < $5

---

### 2.6 30-Day Content Calendar

| Week | Mon (Reel) | Tue (Stories) | Wed (Carousel) | Thu (Stories) | Fri (Story Series) | Sat (Carousel) | Sun (Reel) |
|------|-----------|--------------|---------------|--------------|-------------------|---------------|-----------|
| 1 | Before/after HDB | Poll: style pref | Scandinavian guide | Q&A costs | Client testimonial 1 | "5 signs you need a designer" | Japandi vs Scandi |
| 2 | "How much does kitchen Reno cost?" | Behind the scenes | **Lead magnet promo** | Download link | Client testimonial 2 | Lighting tip | HDB bedroom makeover |
| 3 | Condo living room makeover | Poll: colour palette | Industrial style inspo | **Download link** | Client testimonial 3 | "3 mistakes in HDB bathroom" | **Lead magnet Reel** |
| 4 | Open vs separate rooms | Poll: layout | **Free photo pack** | Countdown to new pack | Client testimonial 4 | Reno checklist | "Your dream interior — download" |

---

### 2.7 KPIs & Tracking

| KPI | Target | Tool |
|-----|--------|------|
| Form fills/month | 150-300 | GA4 + form backend |
| Cost per lead | < $5 | Meta Ads Manager |
| Ad CTR | > 1.5% | Meta Ads Manager |
| Reel engagement rate | > 5% | Instagram Insights |
| Email open rate | > 25% | Brevo / MailerLite |
| Email click rate | > 5% | Brevo / MailerLite |

**Tracking Setup:**
- Meta Pixel on landing page + thank-you page
- GA4 conversion event: `form_submit`
- Google Tag Manager for both
- UTM params on every link

---

### 2.8 Offer Progression

```
Free Pack (10 photos — email + name only)
    ↓
Premium Pack (30 photos + moodboard templates — full form)
    ↓
Free 15-min Discovery Call
    ↓
Concept Package ($150-300 — floor plan, moodboard)
    ↓
Full Design Contract ($2k-8k)
```

---

## Appendix: Tools & Resources

| Purpose | Tool | Cost |
|---------|------|------|
| Keyword research | Google Keyword Planner | Free |
| Rank tracking | Google Search Console | Free |
| Technical SEO audit | Lighthouse, Screaming Frog | Free / £149 |
| Backlink analysis | Ahrefs / Semrush | $99+/mo |
| Email marketing | Brevo | Free (300/day) |
| Social scheduling | Meta Business Suite | Free |
| Ad management | Meta Ads Manager | Free |
| Analytics | GA4 + GTM | Free |
