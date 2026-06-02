# Component Tree — Interior Design Portfolio

> **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui
> **Data flow:** Server components fetch from `data/projects.ts` → Client components hydrate interactivity
> **Status:** Design document — interfaces are sketches, to be refined during implementation

---

## 1. Hierarchy Overview

```
<RootLayout>
├── <SEOHead />          ← generateMetadata() + JSON-LD
├── <Navbar />           ← desktop top bar (server component shell)
│   └── <MobileNav />    ← slide-in sheet (client component)
├── <main>
│   ├── (HomePage)
│   │   ├── <HeroSection />
│   │   ├── <FilterBar />
│   │   ├── <MasonryGrid>
│   │   │   ├── <ProjectCard />        (repeated per image)
│   │   │   ├── <CTACard />            (interleaved every 6-8 images)
│   │   │   └── ... more cards
│   │   └── <InfiniteScrollTrigger />   (optional P1)
│   │
│   ├── (ProjectDetail)
│   │   ├── <Gallery />
│   │   │   └── <ImageWithFallback />   (repeated)
│   │   ├── <ProjectInfo />
│   │   ├── <BeforeAfterSlider />       (if applicable)
│   │   └── <CTASection />             (bottom of detail)
│   │
│   ├── (AboutPage)        — static content, no interactive sub-components
│   │
│   └── (ContactPage)
│       ├── <LeadForm />
│       │   └── <FormField />          (repeated per field)
│       └── <ContactInfo />            (address, phone, map embed)
│
├── <StickyCTA />          ← persistent bottom bar on mobile (client)
├── <BackToTop />          ← floating button (client)
└── <Footer />
```

---

## 2. Layout Components

### 2.1 `Navbar`

Server component shell. Renders navigation links and conditionally renders `<MobileNav>`.

```tsx
interface NavbarProps {
  /** Active route — used to highlight current link */
  currentPath?: string;
  /** Override transparent/opaque background (hero pages use transparent) */
  variant?: 'opaque' | 'transparent';
}

// Renders:
// <header role="banner">
//   <Logo />                       ← links to "/"
//   <NavigationMenu>               ← shadcn/navigation-menu
//     <NavLink href="/projects" />
//     <NavLink href="/about" />
//     <NavLink href="/contact" />
//   </NavigationMenu>
//   <CTAButton variant="ghost" />  ← "Get a Quote" (desktop)
//   <MobileNavTrigger />           ← hamburger icon (mobile only)
// </header>
```

**States:**
- **Default (opaque):** White background, dropshadow on scroll
- **Transparent:** No background, white text/logo — used on hero sections
- **Scrolled past hero:** Auto-switches from transparent → opaque via intersection observer

---

### 2.2 `MobileNav`

Slide-in sheet using shadcn `<Sheet />`. Client component (uses `useState`, `useEffect` for body scroll lock).

```tsx
interface MobileNavProps {
  /** Whether the nav is open */
  open: boolean;
  /** Called when the nav should close */
  onClose: () => void;
  /** Active path for link highlighting */
  currentPath?: string;
}

// Renders:
// <Sheet open={open} onOpenChange={onClose}>
//   <SheetContent side="right">
//     <SheetHeader>
//       <Logo />
//       <SheetClose />             ← X button
//     </SheetHeader>
//     <nav>
//       <MobileNavLink href="/" />
//       <MobileNavLink href="/projects" />
//       <MobileNavLink href="/about" />
//       <MobileNavLink href="/contact" />
//       <MobileCTAButton />        ← prominent "Get Free Quote"
//     </nav>
//   </SheetContent>
// </Sheet>
```

**States:**
- **Closed:** Hidden, not rendered in DOM (shadcn handles)
- **Open:** Slides in from right, body scroll locked, backdrop overlay
- **Transition:** 300ms ease-enter cubic-bezier

---

### 2.3 `Footer`

Server component. Static content with links and company info.

```tsx
interface FooterProps {
  /** Company/brand name for copyright */
  brandName?: string;       // default: "Studio Nous Interiors"
  /** Year for copyright */
  year?: number;            // default: new Date().getFullYear()
}

// Renders:
// <footer role="contentinfo">
//   <FooterColumns>
//     <FooterColumn heading="Studio">
//       <FooterLink /> (About, Portfolio, Blog)
//     </FooterColumn>
//     <FooterColumn heading="Services">
//       <FooterLink /> (Residential, Commercial, Consultation)
//     </FooterColumn>
//     <FooterColumn heading="Contact">
//       <FooterLink /> (Email, Phone, Instagram, WhatsApp)
//     </FooterColumn>
//   </FooterColumns>
//   <Separator />
//   <CopyrightBar>
//     <SocialLinks /> (Instagram, Pinterest, LinkedIn icons)
//     <CopyrightText />
//   </CopyrightBar>
// </footer>
```

**States:** Static — no state variants.

---

## 3. HomePage Components

### 3.1 `HeroSection`

Full-viewport hero with background image overlay, headline, and CTA.

```tsx
interface HeroSectionProps {
  /** Background image URL (default: first featured project image) */
  backgroundImage?: string;
  /** Headline text */
  headline?: string;          // default: "Designs That Tell Your Story"
  /** Subheading / tagline */
  subheading?: string;        // default: "Singapore-based interior design studio"
  /** Primary CTA config */
  primaryCTA: {
    label: string;            // "Explore Our Portfolio"
    href: string;             // "/projects"
  };
  /** Secondary CTA (optional) */
  secondaryCTA?: {
    label: string;            // "Book a Consultation"
    href: string;             // "/contact"
  };
  /** Overlay opacity (0-1) for text readability */
  overlayOpacity?: number;    // default: 0.4
}

// Renders:
// <section className="relative h-screen min-h-[600px]">
//   <ImageWithFallback />       ← full-bleed background (priority load)
//   <Overlay />                 ← gradient + solid overlay
//   <Container>
//     <h1>                      ← Playfair Display
//     <p>                       ← Inter body
//     <CTAButtons>
//       <Button variant="accent" />   ← primary
//       <Button variant="outline" />  ← secondary
//     </CTAButtons>
//   </Container>
//   <ScrollIndicator />         ← animated chevron bouncing
// </section>
```

**States:**
- **Loading:** Skeleton shimmer on background (while image loads)
- **Loaded:** Crossfade from skeleton to image (500ms)
- **Reduced motion:** No parallax, no scroll indicator animation

---

### 3.2 `FilterBar`

Horizontal scrollable chip bar on mobile, inline row on desktop. Manages active filters.

```tsx
interface FilterBarProps {
  /** All available style tags */
  styles: string[];
  /** All available room types */
  roomTypes: string[];
  /** Budget tiers */
  budgetTiers: string[];
  /** Currently active filters */
  activeFilters: FilterState;
  /** Called when any filter changes */
  onFilterChange: (filters: FilterState) => void;
  /** Called to reset all filters */
  onReset: () => void;
}

interface FilterState {
  style: string | null;
  roomType: string | null;
  budgetTier: string | null;
}

// Renders:
// <div className="filter-bar sticky top-0 z-20">
//   <FilterDropdown label="Style" options={styles} />
//   <FilterDropdown label="Room" options={roomTypes} />
//   <FilterDropdown label="Budget" options={budgetTiers} />
//   <ActiveFilterChips />         ← removable chips for active filters
//   <ResetButton />               ← only visible when filters active
// </div>
```

**States:**
- **Default:** All filters at "All" — no chips shown
- **Active filter(s):** Chip badges appear, reset button visible
- **Dropdown open:** shadcn `<Select.Content />` with options
- **Mobile:** Horizontal scrollable container (overflow-x: auto, hide scrollbar)
- **Empty results (after filter):** "No projects match your filters" message

---

### 3.3 `MasonryGrid`

Pinterest-style variable-height masonry layout. Three approaches possible — describe each.

```tsx
interface MasonryGridProps {
  /** Array of items to render (mix of ProjectCard + CTACard data) */
  items: MasonryItem[];
  /** Number of columns per breakpoint */
  columns?: { mobile: number; tablet: number; desktop: number };
  /** Gap between items */
  gap?: number;                // default: 16
  /** Interval for CTA interleaving (every N items) */
  ctaInterval?: number;        // default: 7
}

type MasonryItem =
  | { type: 'project'; data: ProjectCardData }
  | { type: 'cta'; data: CTACardData };
```

**Layout approaches (choose one):**

| Approach | Pros | Cons |
|----------|------|------|
| **CSS columns** (`column-count`) | Simple, no JS | Items order top-to-bottom, not left-to-right; uneven column heights look messy |
| **CSS Grid** with `grid-auto-rows` + `span` classes | Great browser support, predictable | Requires JS to calculate optimal spans per image aspect ratio |
| **CSS Masonry** (`display: masonry` — Safari-only) | Native, no JS needed | Not supported in Firefox/Chrome yet — **not viable** |
| **react-masonry-css** | Lightweight (~2KB), responsive, works everywhere | Extra dependency; uses absolute positioning |

**Recommendation:** Use **CSS columns** for initial MVP (simplest), migrate to a **custom Grid + span calculator** if ordering matters.

```tsx
// Renders:
// <div className="masonry-grid" style={{ columnCount: columns.mobile }}>
//   {items.map((item, i) =>
//     item.type === 'project'
//       ? <ProjectCard key={item.data.id} {...item.data} />
//       : <CTACard key={`cta-${i}`} {...item.data} />
//   )}
// </div>
```

**States:**
- **Loading (initial):** 8-12 skeleton cards with shimmer animation
- **Loaded:** Full masonry layout revealed with staggered fade-in
- **Empty (no results):** "No projects yet" illustration + CTA
- **Interleaved CTA visible:** CTA card sits inline in column flow
- **Reduced motion:** Skip stagger animation, instant reveal

---

### 3.4 `ProjectCard`

Tile representing a single project in the masonry grid.

```tsx
interface ProjectCardData {
  id: string;
  slug: string;
  title: string;
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  alt: string;
  style: string[];
  roomType: string[];
  budgetTier?: string;
  location?: string;
}

interface ProjectCardProps extends ProjectCardData {
  /** Priority load (first few cards in viewport) */
  priority?: boolean;
  /** Click handler (default: router.push to /projects/[slug]) */
  onClick?: () => void;
}

// Renders:
// <article className="project-card group cursor-pointer">
//   <figure>
//     <ImageWithFallback
//       src={thumbnailUrl}
//       alt={alt}
//       width={thumbnailWidth}
//       height={thumbnailHeight}
//       priority={priority}
//     />
//     <figcaption className="project-card-overlay">
//       <h3>{title}</h3>
//       <ProjectTags styles={style} rooms={roomType} />
//       <Badge variant="outline">{budgetTier}</Badge>
//     </figcaption>
//   </figure>
// </article>
```

**States:**
- **Default:** Image visible, overlay hidden
- **Hover (desktop):** Overlay slides up, semi-transparent bg, tags visible
- **Tap (mobile):** Navigate to project detail
- **Image loading:** Skeleton placeholder with matching aspect ratio
- **Image error:** Fallback gradient (neutral-100 + accent-100) with icon

---

### 3.5 `CTACard`

Inline call-to-action card interleaved in the masonry grid.

```tsx
interface CTACardData {
  /** CTA variant — cycles through variants to avoid banner blindness */
  variant: 'quote' | 'consultation' | 'portfolio' | 'instagram';
  /** Headline text */
  headline: string;
  /** Subtitle / supporting text */
  subtitle: string;
  /** Button label */
  buttonLabel: string;
  /** Link or modal trigger */
  action: { type: 'link'; href: string } | { type: 'modal'; formId: string };
  /** Background style variant */
  style?: 'accent' | 'dark' | 'light' | 'image';
  /** Optional background image for 'image' style */
  backgroundImage?: string;
}

// Renders:
// <div className={`cta-card cta-card--${variant} cta-card--${style}`}>
//   <div className="cta-card-content">
//     <h3>{headline}</h3>
//     <p>{subtitle}</p>
//     <Button variant="accent" size="lg" onClick={handleAction}>
//       {buttonLabel}
//     </Button>
//   </div>
// </div>
```

**Variants (cycle order):**
1. "Love this style? Let's bring it to your home." → "Get Free Quote"
2. "Need design inspiration? Book a 30-min call." → "Book Consultation"
3. "See more of our work on Instagram." → "Follow Us"
4. "Ready to start your renovation journey?" → "Contact Us"

**States:** Interactive states via button (default, hover, active, focus-visible).

---

## 4. ProjectDetail Components

### 4.1 `Gallery`

Full-width image gallery for project detail page.

```tsx
interface GalleryProps {
  /** Array of project images */
  images: ProjectImage[];
  /** First image index to show (0-based) */
  initialIndex?: number;       // default: 0
  /** Whether to show before/after toggle */
  showComparison?: boolean;
}

// Renders:
// <section className="project-gallery">
//   <div className="gallery-grid">
//     {images.map((image, i) =>
//       <GalleryItem key={i}>
//         <ImageWithFallback
//           src={image.url}
//           alt={image.alt}
//           width={image.width}
//           height={image.height}
//         />
//         {image.caption && <Caption>{image.caption}</Caption>}
//       </GalleryItem>
//     )}
//   </div>
//   <LightboxTrigger />         ← click to open lightbox (P1)
// </section>
```

**States:**
- **Loading:** Full-width skeleton per image
- **Loaded:** Images staggered with fade-in (100ms delay between each, max 5)
- **Error:** Broken image placeholder per slot
- **Lightbox open (P1):** Full-screen overlay, swipeable

---

### 4.2 `ProjectInfo`

Metadata panel for a project detail page.

```tsx
interface ProjectInfoProps {
  title: string;
  description: string;
  style: string[];
  roomType: string[];
  budgetTier?: string;
  location?: string;
  year: number;
  client?: string;
  testimonial?: string;
}

// Renders:
// <article className="project-info max-w-prose mx-auto">
//   <h1>{title}</h1>
//   <MetaRow>
//     <MetaItem label="Style" value={styles.join(', ')} />
//     <MetaItem label="Room" value={roomTypes.join(', ')} />
//     <MetaItem label="Budget" value={budgetTier} />
//     <MetaItem label="Location" value={location} />
//     <MetaItem label="Year" value={year} />
//   </MetaRow>
//   <Separator />
//   <p>{description}</p>
//   {testimonial && <TestimonialBlock quote={testimonial} client={client} />}
// </article>
```

**States:** Static — no interactive states.

---

### 4.3 `BeforeAfterSlider`

Draggable comparison slider for renovation projects.

```tsx
interface BeforeAfterSliderProps {
  /** "Before" image URL */
  before: { url: string; alt: string; width: number; height: number };
  /** "After" image URL */
  after: { url: string; alt: string; width: number; height: number };
  /** Initial slider position (0-1, default 0.5 = 50%) */
  defaultPosition?: number;
  /** Label orientation */
  labels?: 'top' | 'bottom' | 'none';
  /** Before/after label text */
  beforeLabel?: string;        // default: "Before"
  afterLabel?: string;         // default: "After"
}

// Renders:
// <div className="before-after-slider relative overflow-hidden select-none">
//   <div className="after-image">       ← full width
//     <ImageWithFallback {...after} />
//   </div>
//   <div className="before-image" style={{ clipPath: `inset(0 ${100-position}% 0 0)` }}>
//     <ImageWithFallback {...before} />
//   </div>
//   <SliderHandle aria-label="Compare before and after" role="slider" />
// </div>
```

**States:**
- **Default:** Split at 50%, handle visible
- **Dragging:** Handle active state, cursor change, no text selection
- **Touch:** Touch event support for mobile
- **Keyboard:** Arrow keys move handle 5% per press
- **Reduced motion:** Smooth transitions disabled

---

### 4.4 `CTASection`

Bottom-of-page CTA on project detail pages.

```tsx
interface CTASectionProps {
  /** Project title injected into CTA copy */
  projectTitle?: string;
  /** CTA variant */
  variant?: 'quote' | 'consultation';
  /** Background style */
  backgroundStyle?: 'accent' | 'light';
}

// Renders:
// <section className="cta-section">
//   <Container>
//     <h2>Love this {projectTitle} look?</h2>
//     <p>Let's create something beautiful for your space.</p>
//     <div className="cta-actions">
//       <Button variant="accent" size="xl" asChild>
//         <Link href="/contact">Get Your Free Quote</Link>
//       </Button>
//     </div>
//   </Container>
// </section>
```

**States:** Static — interactive via button states.

---

## 5. AboutPage

Static server component. No complex sub-components — just structured markup.

**Sections:**
1. **Hero:** Studio photo + headline + tagline
2. **Story:** 2-col layout with founder photo + brand narrative
3. **Values:** 3-4 value cards (icon + heading + description)
4. **Team (optional):** Simple card grid of team members
5. **Stats:** Number counters (years, projects, clients)
6. **CTA strip:** "Ready to work with us?" → link to contact

No formal interface definition needed — pure page content.

---

## 6. ContactPage Components

### 6.1 `LeadForm`

Main contact/enquiry form. Submits to Formspree / Netlify Forms via POST.

```tsx
interface LeadFormProps {
  /** Formspree form ID or endpoint URL */
  endpoint: string;
  /** Called after successful submission */
  onSuccess?: () => void;
  /** Called on error */
  onError?: (error: Error) => void;
  /** Pre-filled values (e.g., from URL params) */
  initialValues?: Partial<LeadFormValues>;
  /** Variant context */
  variant?: 'page' | 'modal' | 'sticky';
}

interface LeadFormValues {
  name: string;
  email: string;
  phone: string;
  propertyType: 'HDB' | 'condo' | 'landed' | 'commercial' | 'other';
  budgetRange: 'under-30k' | '30k-50k' | '50k-80k' | '80k-150k' | 'above-150k' | 'not-sure';
  message: string;
  source?: string;           // hidden field — tracks where form was triggered
  projectRef?: string;       // hidden field — project slug if from detail page
}

// Renders:
// <form className="lead-form" onSubmit={handleSubmit} noValidate>
//   <fieldset>
//     <legend>Get Your Free Consultation</legend>
//     <FormField name="name" label="Full Name" required>
//       <Input type="text" placeholder="e.g., Tan Li Wei" />
//     </FormField>
//     <FormField name="email" label="Email Address" required type="email">
//       <Input type="email" placeholder="liwei@example.com" />
//     </FormField>
//     <FormField name="phone" label="Phone Number" required type="tel">
//       <Input type="tel" placeholder="+65 9123 4567" />
//     </FormField>
//     <FormField name="propertyType" label="Property Type" required>
//       <Select>
//         <SelectOption value="HDB" />
//         <SelectOption value="condo" />
//         <SelectOption value="landed" />
//         <SelectOption value="commercial" />
//         <SelectOption value="other" />
//       </Select>
//     </FormField>
//     <FormField name="budgetRange" label="Budget Range" required>
//       <Select>
//         <SelectOption value="under-30k" />
//         <SelectOption value="30k-50k" />
//         <SelectOption value="50k-80k" />
//         <SelectOption value="80k-150k" />
//         <SelectOption value="above-150k" />
//         <SelectOption value="not-sure" />
//       </Select>
//     </FormField>
//     <FormField name="message" label="Tell us about your project">
//       <Textarea placeholder="Describe your renovation plans..." />
//     </FormField>
//     <Button type="submit" variant="accent" size="xl" disabled={submitting}>
//       {submitting ? 'Sending...' : 'Get My Free Quote'}
//     </Button>
//     <p className="form-disclaimer">
//       By submitting, you agree to our Privacy Policy.
//     </p>
//   </fieldset>
// </form>
```

**States:**

| State | UI |
|-------|-----|
| **Default** | Empty form, all fields pristine, submit button enabled |
| **Filling** | Inline validation on blur (required, email format, phone format) |
| **Validation error** | Red border on field + error message below (e.g., "Please enter a valid email") |
| **Submitting** | Button shows spinner, all fields disabled, overlay prevents double-click |
| **Success** | Form replaced with success message + icon (checkmark) + "We'll be in touch within 24 hours" |
| **Error (network)** | Error banner above form: "Something went wrong. Please try again or email us directly." |
| **Error (validation)** | Field-level errors shown inline |

---

### 6.2 `FormField`

Wrapper component for form field with label, error state, and accessibility.

```tsx
interface FormFieldProps {
  /** Field name (used for id generation) */
  name: string;
  /** Display label */
  label: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text shown below field */
  helperText?: string;
  /** Field content */
  children: React.ReactNode;
  /** Layout direction */
  layout?: 'vertical' | 'horizontal';    // default: vertical
}

// Renders:
// <div className={`form-field form-field--${layout}`}>
//   <label htmlFor={`field-${name}`}>
//     {label}
//     {required && <span aria-hidden="true">*</span>}
//   </label>
//   {children}
//   {error && <p className="field-error" role="alert">{error}</p>}
//   {helperText && !error && <p className="field-helper">{helperText}</p>}
// </div>
```

**States:**
- **Default:** Label + field, no error/helper
- **Required:** Asterisk next to label
- **Error:** Red border on child input, error text visible, `aria-invalid="true"`, `role="alert"`
- **Helper:** Gray helper text below field (hidden when error is shown)
- **Focused:** Input focused state per shadcn

---

## 7. Shared Components

### 7.1 `ImageWithFallback`

Wrapper around `next/image` with error/loading handling.

```tsx
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Priority (above-the-fold) load */
  priority?: boolean;
  /** Image fill mode */
  fill?: boolean;
  /** Object-fit value */
  objectFit?: 'cover' | 'contain';
  /** Additional className */
  className?: string;
  /** Lazy load offset */
  loading?: 'lazy' | 'eager';
  /** Quality (1-100, default: 80) */
  quality?: number;
  /** Aspect ratio string (e.g., "4/3") */
  aspectRatio?: string;
  /** Fallback element when image fails to load */
  fallback?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

// Renders:
// <figure className={`image-wrapper relative overflow-hidden ${className}`}>
//   <Image
//     src={src}
//     alt={alt}
//     width={fill ? undefined : width}
//     height={fill ? undefined : height}
//     fill={fill}
//     className={`object-${objectFit} transition-opacity duration-500`}
//     priority={priority}
//     loading={loading}
//     quality={quality}
//     onError={handleError}
//     onLoad={handleLoad}
//   />
//   {isError && (fallback ?? <DefaultFallback />)}
//   {isLoading && <Skeleton />}
// </figure>
```

**States:**
- **Loading:** Skeleton shimmer with matching aspect ratio
- **Loaded:** Image fades in (opacity 0 → 1, 500ms), skeleton disappears
- **Error:** Shows fallback (default: accent-100 background + image icon + "Image unavailable")
- **Empty src:** Immediately shows fallback

---

### 7.2 `SEOHead`

Not a component — this is implemented via Next.js Metadata API. Documenting here for reference.

```tsx
// Implemented in layout.tsx and each page.tsx via:
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${roomType} — ${style} Interior Design in ${location} | Studio Nous`,
    description: `Browse our ${style} ${room} project in ${location}. ...`,
    openGraph: {
      title: '...',
      description: '...',
      images: [{ url: project.images[0]?.url }],
    },
  };
}
```

**JSON-LD Structured Data:** Injected via `<Script id="ld-json" type="application/ld+json">` in page components.

```tsx
interface JSONLDProps {
  type: 'LocalBusiness' | 'Article' | 'ImageGallery' | 'FAQPage' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

// Renders:
// <script
//   type="application/ld+json"
//   dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
// />
```

---

### 7.3 `StickyCTA`

Persistent (but dismissable) bottom bar on mobile. Shows on scroll down, hides on scroll up.

```tsx
interface StickyCTAProps {
  /** CTA text */
  label?: string;              // default: "Get Your Free Consultation"
  /** Link target */
  href?: string;               // default: "/contact"
  /** Whether the CTA is dismissable */
  dismissable?: boolean;       // default: true
  /** Show delay in ms after page load */
  showDelay?: number;          // default: 3000
  /** Hide threshold (px from bottom of page) */
  hideThreshold?: number;      // default: 200 — hide when near footer
  /** Reappear delay after dismissal */
  reappearDelay?: number;      // default: 300000 (5 min, localStorage-backed)
}

// Renders:
// <div className="sticky-cta fixed bottom-0 left-0 right-0 z-40">
//   <div className="sticky-cta-inner">
//     <p className="sticky-cta-text">Transform your space</p>
//     <Button variant="accent" asChild>
//       <Link href={href}>{label}</Link>
//     </Button>
//     {dismissable && <DismissButton onClick={handleDismiss} />}
//   </div>
// </div>
```

**States:**
- **Hidden:** Not rendered (or `translateY(100%)` with `pointer-events: none`)
- **Visible:** Slide up from bottom (300ms), visible on mobile only
- **Dismissed:** Slides back down, stored in localStorage with timestamp
- **Reappeared:** After reappearDelay, if user scrolls past half page again
- **Desktop:** Never shown (CSS `hidden lg:block` inverted)

---

### 7.4 `BackToTop`

Floating button that appears after scrolling down.

```tsx
interface BackToTopProps {
  /** Scroll threshold before showing (px) */
  threshold?: number;          // default: 400
  /** Smooth scroll duration (ms) */
  scrollDuration?: number;     // default: 400
  /** Icon override */
  icon?: React.ReactNode;      // default: <ArrowUp />
  /** ARIA label */
  ariaLabel?: string;          // default: "Back to top"
  /** Position offset from bottom */
  bottomOffset?: number;       // default: 24
}

// Renders:
// <button
//   className="back-to-top fixed right-4 z-30 shadow-elevation-card"
//   style={{ bottom: isVisible ? bottomOffset : -60 }}
//   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//   aria-label={ariaLabel}
// >
//   {icon}
// </button>
```

**States:**
- **Hidden:** Off-screen (translateY below viewport or negative bottom)
- **Visible:** Fades in + slides up, appears when scroll > threshold
- **Hover:** Slight lift (translateY(-2px)) + deeper shadow
- **Reduced motion:** Instant scroll, no slide animation on button

---

## 8. Data Interfaces (Shared Types)

Defined in `src/data/projects.ts` — reference for all components above.

```tsx
interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  client?: string;
  location?: string;
  year: number;
  style: Style[];
  roomType: RoomType[];
  budgetTier?: 'budget' | 'mid-range' | 'luxury';
  featured: boolean;
  images: ProjectImage[];
  testimonial?: string;
}

interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  isBefore?: boolean;
  order: number;
}

type Style =
  | 'Modern'
  | 'Scandinavian'
  | 'Industrial'
  | 'Japandi'
  | 'Tropical'
  | 'Minimalist';

type RoomType =
  | 'Living Room'
  | 'Kitchen'
  | 'Bedroom'
  | 'Bathroom'
  | 'Home Office'
  | 'Dining Room'
  | 'Hallway';
```

---

## 9. Page Composition (Server Components)

Each route page is a server component that:
1. Imports static data from `data/projects.ts`
2. Passes data to client components via props
3. Uses `generateStaticParams()` for SSG
4. Uses `generateMetadata()` for SEO

### Home Page (`/`)
```tsx
// Server component
export default async function HomePage() {
  const projects = getAllProjects();        // from data/projects.ts
  const featuredProjects = getFeatured();   // filtered subset
  const allStyles = getUniqueStyles();      // [...new Set(projects.flatMap(p => p.style))]
  const allRooms = getUniqueRoomTypes();

  return (
    <>
      <SEOHead type="home" />
      <HeroSection />
      <FilterBar
        styles={allStyles}
        roomTypes={allRooms}
        budgetTiers={['budget', 'mid-range', 'luxury']}
        activeFilters={{ style: null, roomType: null, budgetTier: null }}
        onFilterChange={...}
        onReset={...}
      />
      <MasonryGrid items={buildMasonryItems(projects)} />
    </>
  );
}
```

### Project Detail (`/projects/[slug]`)
```tsx
// Server component with generateStaticParams
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  const beforeAfterImages = project.images.filter(i => i.isBefore);
  const hasBeforeAfter = beforeAfterImages.length > 0 && beforeAfterImages.length % 2 === 0;

  return (
    <>
      <SEOHead type="project" project={project} />
      <Gallery images={project.images} />
      <ProjectInfo {...project} />
      {hasBeforeAfter && <BeforeAfterSlider ... />}
      <CTASection projectTitle={project.title} />
    </>
  );
}
```

### Contact (`/contact`)
```tsx
// Server component
export default function ContactPage() {
  return (
    <>
      <SEOHead type="contact" />
      <PageHeader title="Get in Touch" />
      <div className="contact-grid">
        <LeadForm endpoint={process.env.FORM_ENDPOINT!} variant="page" />
        <ContactInfo />
      </div>
    </>
  );
}
```

---

## 10. Data Flow Summary

```
                ┌─────────────────────────────────┐
                │     src/data/projects.ts         │
                │     (static JSON/TS data)        │
                └────────┬────────────────────────┘
                         │ import
                         ▼
                ┌─────────────────────────────────┐
                │     Server Components (pages)    │
                │  - Filter / transform data       │
                │  - generateMetadata()            │
                │  - generateStaticParams()        │
                └────────┬────────────────────────┘
                         │ props
                         ▼
                ┌─────────────────────────────────┐
                │     Client Components            │
                │  - MasonryGrid (interactive)     │
                │  - FilterBar (state)             │
                │  - LeadForm (form state)         │
                │  - StickyCTA (scroll state)      │
                │  - BackToTop (scroll state)      │
                │  - BeforeAfterSlider (drag)      │
                └─────────────────────────────────┘
```
