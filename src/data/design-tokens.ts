// =============================================================================
// Design Tokens — Interior Design Portfolio
// Tailwind v4 CSS Custom Properties approach
// =============================================================================
// Usage:
//   globals.css:  @import "tailwindcss"; @theme inline { /* paste token block */ }
//   TS/React:     import { colors, typography, spacing, ... } from "@/data/design-tokens"
// =============================================================================

// ─── Color Palette ───────────────────────────────────────────────────────────
// Neutral base (#F8F7F4, #FFFFFF) + warm accent (#C9A96E)
export const colors = {
  neutral: {
    50: '#FAFAF8', // near-white
    100: '#F5F4F0', // lightest background
    150: '#F0EFEA', // subtle tint
    200: '#E8E7E0', // borders / dividers
    300: '#D4D2C8', // disabled / muted
    400: '#B8B5A8', // placeholder text
    500: '#9A9688', // secondary text
    600: '#7D796C', // muted text
    700: '#5D5A50', // body text
    800: '#3D3B34', // headings / strong text
    850: '#2D2B26', // near-black
    900: '#1A1916', // blackish
    950: '#0D0D0B', // deepest
  },

  accent: {
    50: '#FBF7EE', // lightest gold tint
    100: '#F5EDD6',
    200: '#EBDBAD',
    300: '#DFC683',
    400: '#D4B568',
    500: '#C9A96E', // PRIMARY ACCENT — gold / warm tone
    600: '#B8945A',
    700: '#A07E4A',
    800: '#876A3E',
    900: '#6E5534',
    950: '#4A3822',
  },

  // Semantic aliases — these get mapped to CSS custom properties
  semantic: {
    background: '#F8F7F4',       // page bg — neutral warm
    'background-alt': '#FFFFFF', // card / surface bg
    foreground: '#3D3B34',       // primary text
    'foreground-muted': '#7D796C',
    border: '#E8E7E0',
    'border-light': '#F0EFEA',
    cta: '#C9A96E',              // primary CTA accent
    'cta-hover': '#B8945A',
    'cta-foreground': '#FFFFFF',
    success: '#4A8C5C',
    warning: '#D4A347',
    error: '#C94E4E',
  },
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────
// Inter (body) + Playfair Display (headings)
export const typography = {
  fonts: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  // Tailwind v4 CSS custom properties for font families
  families: {
    body: 'var(--font-inter)',
    heading: 'var(--font-playfair)',
    mono: 'var(--font-mono)',
  },

  // Font sizes (desktop-first, with clamp() for fluid scaling)
  sizes: {
    // Caption / overline
    xs: { fontSize: '0.75rem', lineHeight: '1rem', letterSpacing: '0.05em' },        // 12px
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.025em' },    // 14px

    // Body
    base: { fontSize: '1rem', lineHeight: '1.625rem', letterSpacing: '0' },           // 16px
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem', letterSpacing: '0' },          // 18px

    // Headings
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem', letterSpacing: '-0.01em' },     // 20px
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem', letterSpacing: '-0.01em' },      // 24px
    '3xl': { fontSize: '1.875rem', lineHeight: '2.375rem', letterSpacing: '-0.02em' },// 30px
    '4xl': { fontSize: '2.25rem', lineHeight: '2.75rem', letterSpacing: '-0.02em' },  // 36px
    '5xl': { fontSize: '3rem', lineHeight: '3.5rem', letterSpacing: '-0.03em' },      // 48px
    '6xl': { fontSize: '3.75rem', lineHeight: '4.25rem', letterSpacing: '-0.03em' },  // 60px

    // Fluid utility — scale between mobile and desktop
    fluid: {
      body: 'clamp(0.9375rem, 0.9rem + 0.25vw, 1rem)',            // 15px → 16px
      heading: 'clamp(1.75rem, 1.25rem + 2vw, 3rem)',              // 28px → 48px (h1)
      'heading-lg': 'clamp(1.25rem, 1rem + 1.25vw, 2.25rem)',      // 20px → 36px (h2)
      'heading-md': 'clamp(1.125rem, 0.95rem + 0.75vw, 1.5rem)',   // 18px → 24px (h3)
    },
  },

  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// ─── Spacing Scale ───────────────────────────────────────────────────────────
// Based on a 4px base unit, but exposed as Tailwind-friendly semantic names
export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px — min tap target
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px

  // Semantic spacing — layout
  layout: {
    'page-padding-mobile': '1rem',     // 16px
    'page-padding-tablet': '1.5rem',   // 24px
    'page-padding-desktop': '2rem',    // 32px
    'section-gap': '4rem',             // 64px
    'section-gap-sm': '2.5rem',        // 40px
    'grid-gap': '1rem',                // 16px
    'card-padding': '1.25rem',         // 20px
    'cta-bar-height': '3.5rem',        // 56px — sticky bottom bar
  },
} as const;

// ─── Border Radii ────────────────────────────────────────────────────────────
export const radii = {
  none: '0px',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.25rem',// 20px
  '3xl': '1.5rem', // 24px
  full: '9999px',

  // Semantic aliases
  card: '0.75rem',      // project cards
  button: '0.5rem',     // buttons / inputs
  image: '0.5rem',      // image corners
  dialog: '1rem',       // modals / dialogs
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────
export const shadows = {
  none: '0 0 #0000',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
  md: '0 2px 6px -1px rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
  lg: '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
  xl: '0 8px 24px -4px rgb(0 0 0 / 0.10), 0 4px 8px -6px rgb(0 0 0 / 0.04)',
  '2xl': '0 12px 40px -8px rgb(0 0 0 / 0.12), 0 6px 12px -6px rgb(0 0 0 / 0.06)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.03)',

  // Elevation layers
  elevation: {
    card: '0 2px 6px -1px rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
    dropdown: '0 4px 12px -2px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
    modal: '0 12px 40px -8px rgb(0 0 0 / 0.16), 0 6px 12px -6px rgb(0 0 0 / 0.08)',
    sticky: '0 -2px 12px -2px rgb(0 0 0 / 0.08)',
    navbar: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
  },
} as const;

// ─── Animation Durations ─────────────────────────────────────────────────────
export const animation = {
  durations: {
    instant: '50ms',
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    deliberate: '600ms',
    slowest: '800ms',
  },

  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    enter: 'cubic-bezier(0.16, 1, 0.3, 1)',    // overshoot / spring-like
    exit: 'cubic-bezier(0.32, 0, 0.67, 0)',      // ease-out
    linear: 'linear',
    smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',    // smooth acceleration
  },

  // Preset combo strings for CSS
  presets: {
    fadeIn: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    fadeInUp: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    scaleIn: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    slideIn: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    hoverLift: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ─── Breakpoints (reference only — used by Tailwind media queries) ───────────
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',

  // Masonry-specific
  masonry: {
    mobile: '2',   // columns
    tablet: '3',   // columns (≥768px)
    desktop: '4',  // columns (≥1024px)
  },
} as const;

// ─── Tailwind v4 @theme inline block — paste into globals.css ────────────────
// Copy this string to regenerate the Tailwind theme block
export const TAILWIND_THEME_BLOCK = `
@theme inline {
  /* ── Colors ── */
  --color-neutral-50: #FAFAF8;
  --color-neutral-100: #F5F4F0;
  --color-neutral-150: #F0EFEA;
  --color-neutral-200: #E8E7E0;
  --color-neutral-300: #D4D2C8;
  --color-neutral-400: #B8B5A8;
  --color-neutral-500: #9A9688;
  --color-neutral-600: #7D796C;
  --color-neutral-700: #5D5A50;
  --color-neutral-800: #3D3B34;
  --color-neutral-850: #2D2B26;
  --color-neutral-900: #1A1916;
  --color-neutral-950: #0D0D0B;

  --color-accent-50: #FBF7EE;
  --color-accent-100: #F5EDD6;
  --color-accent-200: #EBDBAD;
  --color-accent-300: #DFC683;
  --color-accent-400: #D4B568;
  --color-accent-500: #C9A96E;
  --color-accent-600: #B8945A;
  --color-accent-700: #A07E4A;
  --color-accent-800: #876A3E;
  --color-accent-900: #6E5534;
  --color-accent-950: #4A3822;

  --color-background: #F8F7F4;
  --color-background-alt: #FFFFFF;
  --color-foreground: #3D3B34;
  --color-foreground-muted: #7D796C;
  --color-border: #E8E7E0;
  --color-border-light: #F0EFEA;
  --color-cta: #C9A96E;
  --color-cta-hover: #B8945A;
  --color-cta-foreground: #FFFFFF;

  /* ── Typography ── */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* ── Border Radius ── */
  --radius-none: 0px;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.25rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
  --radius-card: 0.75rem;
  --radius-button: 0.5rem;
  --radius-image: 0.5rem;
  --radius-dialog: 1rem;

  /* ── Shadows ── */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-md: 0 2px 6px -1px rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.04);
  --shadow-lg: 0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04);
  --shadow-xl: 0 8px 24px -4px rgb(0 0 0 / 0.10), 0 4px 8px -6px rgb(0 0 0 / 0.04);
  --shadow-2xl: 0 12px 40px -8px rgb(0 0 0 / 0.12), 0 6px 12px -6px rgb(0 0 0 / 0.06);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.03);
  --shadow-card: 0 2px 6px -1px rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.04);
  --shadow-dropdown: 0 4px 12px -2px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.06);
  --shadow-modal: 0 12px 40px -8px rgb(0 0 0 / 0.16), 0 6px 12px -6px rgb(0 0 0 / 0.08);
  --shadow-sticky: 0 -2px 12px -2px rgb(0 0 0 / 0.08);
  --shadow-navbar: 0 1px 3px 0 rgb(0 0 0 / 0.04);

  /* ── Animation ── */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.32, 0, 0.67, 0);
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-instant: 50ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-deliberate: 600ms;
}
`;

// ─── Type exports ────────────────────────────────────────────────────────────
export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
export type RadiiToken = typeof radii;
export type ShadowsToken = typeof shadows;
export type AnimationToken = typeof animation;
