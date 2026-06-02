// =============================================================================
// Mock Projects — Interior Design Portfolio
// 8 sample projects matching the Project interface from the PRD
// Realistic for Singapore. Uses picsum.photos for placeholder images.
// =============================================================================

export interface Project {
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

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  isBefore?: boolean;
  order: number;
}

export type Style =
  | 'Modern'
  | 'Scandinavian'
  | 'Industrial'
  | 'Japandi'
  | 'Tropical'
  | 'Minimalist';

export type RoomType =
  | 'Living Room'
  | 'Kitchen'
  | 'Bedroom'
  | 'Bathroom'
  | 'Home Office'
  | 'Dining Room'
  | 'Hallway';

// ─── Picsum seed helpers ────────────────────────────────────────────────────
// Using deterministic seed IDs so images remain stable across builds.
// Each project gets its own seed range for visual variety.
const picsum = (seed: number, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. MODERN — Living Room (Luxury)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-001',
    title: 'Marina One Penthouse Living',
    slug: 'marina-one-penthouse-living',
    description:
      'A sweeping 1,800 sq ft living space in Singapore\'s Marina Bay financial district. Floor-to-ceiling windows flood the room with natural light, framed by custom motorised blinds. The palette pairs warm oak herringbone flooring with a neutral bouclé sectional and a statement marble coffee table. A built-in wet bar with backlit onyx adds the evening glamour. Every surface was selected for tactile richness — fluted glass, brushed brass, and textured wallcoverings.',
    client: 'Lim Family',
    location: 'Marina One Residences, Singapore',
    year: 2025,
    style: ['Modern'],
    roomType: ['Living Room'],
    budgetTier: 'luxury',
    featured: true,
    images: [
      { url: picsum(101, 1200, 1600), alt: 'Marina One living room — panoramic city view through floor-to-ceiling windows', caption: 'The living room anchors the bay view', width: 1200, height: 1600, order: 1 },
      { url: picsum(102, 1600, 1200), alt: 'Marina One living room — bouclé sectional and marble coffee table arrangement', caption: 'Bouclé sectional anchors the conversation zone', width: 1600, height: 1200, order: 2 },
      { url: picsum(103, 1200, 900), alt: 'Marina One living room — wet bar with backlit onyx counter', caption: 'Backlit onyx turns the wet bar into evening sculpture', width: 1200, height: 900, order: 3 },
      { url: picsum(104, 900, 1200), alt: 'Marina One living room — fluted glass partition detail', caption: 'Fluted glass screens the study without blocking light', width: 900, height: 1200, order: 4 },
      { url: picsum(105, 1600, 1067), alt: 'Marina One living room — herringbone oak flooring close-up', caption: 'Warm oak herringbone underfoot throughout', width: 1600, height: 1067, order: 5 },
      { url: picsum(106, 1200, 1500), alt: 'Marina One living room — evening mood with dimmed lighting', caption: 'Dimmable LED strips create layered evening ambience', width: 1200, height: 1500, order: 6 },
    ],
    testimonial:
      'We\'ve lived in our apartment for ten years and never really loved the living room until Studio Nous reimagined it. The way the light moves through the space now — it feels like a completely different home.',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. SCANDINAVIAN — Kitchen (Mid-range)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-002',
    title: 'Holland Village Scandinavian Kitchen',
    slug: 'holland-village-scandi-kitchen',
    description:
      'A bright, hygge-inspired kitchen renovation for a 3-room HDB flat in Holland Village. The brief was simple: maximise storage without sacrificing the airy, open feel. We specified ash veneer cabinetry with integrated finger pulls, a matte white subway tile splashback, and warm oak open shelving. A slim peninsula doubles as a breakfast bar. Under-cabinet task lighting and a skylight above the sink keep the space luminous even on grey afternoons.',
    client: 'Sarah & Mike Tan',
    location: 'Holland Village, Singapore',
    year: 2025,
    style: ['Scandinavian'],
    roomType: ['Kitchen'],
    budgetTier: 'mid-range',
    featured: true,
    images: [
      { url: picsum(201, 1600, 1200), alt: 'Holland Village kitchen — ash cabinetry and white subway tile backsplash', caption: 'Light ash cabinets keep the kitchen feeling open', width: 1600, height: 1200, order: 1 },
      { url: picsum(202, 1200, 1600), alt: 'Holland Village kitchen — peninsula breakfast bar with bar stools', caption: 'Peninsula breakfast bar seats two comfortably', width: 1200, height: 1600, order: 2 },
      { url: picsum(203, 1200, 900), alt: 'Holland Village kitchen — open shelving with ceramic dishware', caption: 'Open shelving displays curated ceramics', width: 1200, height: 900, order: 3 },
      { url: picsum(204, 900, 1200), alt: 'Holland Village kitchen — skylight above sink area', caption: 'Skylight floods the sink zone with natural light', width: 900, height: 1200, order: 4 },
      { url: picsum(205, 1600, 1067), alt: 'Holland Village kitchen — pull-out pantry storage detail', caption: 'Full-extension pantry maximises every inch', width: 1600, height: 1067, order: 5 },
    ],
    testimonial:
      'We were nervous about renovating our kitchen — it\'s the heart of our home. The team listened to every one of our quirks, and the result is both beautiful and miraculously functional.',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. INDUSTRIAL — Home Office (Mid-range)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-003',
    title: 'Tanjong Pagar Warehouse Office',
    slug: 'tanjong-pagar-warehouse-office',
    description:
      'A converted shophouse unit in Tanjong Pagar becomes a character-rich home office for a creative director. We preserved the original exposed brick wall and added steel-framed glazed partitions to define zones without losing the loft feel. A 3-metre solid timber desk floats on blackened steel legs. Concealed cable management, adjustable task lighting, and acoustic wall panels ensure the space works as hard as it looks. The blackened steel stair leads to a mezzanine lounge.',
    client: 'Marcus Chen',
    location: 'Tanjong Pagar, Singapore',
    year: 2024,
    style: ['Industrial'],
    roomType: ['Home Office'],
    budgetTier: 'mid-range',
    featured: true,
    images: [
      { url: picsum(301, 1200, 1600), alt: 'Tanjong Pagar office — exposed brick wall and steel-framed partitions', caption: 'Original brick retained as the hero feature', width: 1200, height: 1600, order: 1 },
      { url: picsum(302, 1600, 1200), alt: 'Tanjong Pagar office — 3-metre timber desk on blackened steel legs', caption: 'A monolithic timber desk commands the room', width: 1600, height: 1200, order: 2 },
      { url: picsum(303, 1200, 900), alt: 'Tanjong Pagar office — mezzanine lounge with leather sofa', caption: 'Mezzanine lounge offers a breakout perch', width: 1200, height: 900, order: 3 },
      { url: picsum(304, 900, 1200), alt: 'Tanjong Pagar office — blackened steel stair detail', caption: 'Blackened steel stair with open risers preserves light flow', width: 900, height: 1200, order: 4 },
      { url: picsum(305, 1600, 1067), alt: 'Tanjong Pagar office — acoustic panel wall in charcoal felt', caption: 'Charcoal felt panels tame the warehouse echo', width: 1600, height: 1067, order: 5 },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. JAPANDI — Bedroom (Luxury)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-004',
    title: 'Mount Elizabeth Japandi Master Suite',
    slug: 'mount-elizabeth-japandi-suite',
    description:
      'A serene master bedroom retreat in Singapore\'s prestigious Mount Elizabeth enclave. The design is a deliberate study in restraint: a low platform bed in solid walnut, shoji-inspired sliding screens, and a hand-trowelled plaster feature wall in warm limestone. The en-suite bathroom continues the language with a deep freestanding stone bathtub, rain shower, and a custom double vanity in brushed oak. Every element was chosen for its material honesty — no applied ornament, only texture and grain.',
    client: 'Dr. Priya Nair',
    location: 'Mount Elizabeth, Singapore',
    year: 2025,
    style: ['Japandi', 'Minimalist'],
    roomType: ['Bedroom', 'Bathroom'],
    budgetTier: 'luxury',
    featured: true,
    images: [
      { url: picsum(401, 1600, 1200), alt: 'Mount Elizabeth master bedroom — walnut platform bed with shoji screens', caption: 'Walnut platform bed anchors the serene bedroom', width: 1600, height: 1200, order: 1 },
      { url: picsum(402, 1200, 1600), alt: 'Mount Elizabeth bedroom — hand-trowelled plaster feature wall', caption: 'Limestone-toned plaster wall adds subtle texture', width: 1200, height: 1600, order: 2 },
      { url: picsum(403, 1200, 900), alt: 'Mount Elizabeth bathroom — freestanding stone bathtub', caption: 'Stone bathtub as a sculptural centrepiece', width: 1200, height: 900, order: 3 },
      { url: picsum(404, 900, 1200), alt: 'Mount Elizabeth bathroom — double vanity in brushed oak', caption: 'Brushed oak vanity with integrated vessel basins', width: 900, height: 1200, order: 4 },
      { url: picsum(405, 1600, 1067), alt: 'Mount Elizabeth bedroom — sliding shoji screen detail', caption: 'Shoji-inspired screens diffuse morning light', width: 1600, height: 1067, order: 5 },
    ],
    testimonial:
      'I wanted my bedroom to feel like a hotel — but one that actually feels personal. The team understood immediately. I sleep better now than I have in years.',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. TROPICAL — Living Room (Mid-range)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-005',
    title: 'Sentosa Cove Tropical Living',
    slug: 'sentosa-cove-tropical-living',
    description:
      'An open-plan living and dining space on Sentosa that blurs the boundary between indoors and the lush tropical garden beyond. We specified a natural material palette of rattan, terrazzo, and bleached teak. Bi-fold doors retract fully to connect the living room with a covered lanai. A live-edge timber dining table seats eight under a custom rattan pendant cluster. Indoor plants — fiddle-leaf figs, monstera, and bird of paradise — complete the jungle-luxe vibe.',
    client: 'The Andersons',
    location: 'Sentosa Cove, Singapore',
    year: 2024,
    style: ['Tropical', 'Modern'],
    roomType: ['Living Room', 'Dining Room'],
    budgetTier: 'mid-range',
    featured: true,
    images: [
      { url: picsum(501, 1600, 1200), alt: 'Sentosa Cove living room — bi-fold doors open to tropical garden', caption: 'Bi-fold doors erase the boundary between inside and out', width: 1600, height: 1200, order: 1 },
      { url: picsum(502, 1200, 1600), alt: 'Sentosa Cove dining area — rattan pendant cluster over timber table', caption: 'Rattan pendants float above the live-edge dining table', width: 1200, height: 1600, order: 2 },
      { url: picsum(503, 1200, 900), alt: 'Sentosa Cove living room — rattan sofa and terrazzo coffee table', caption: 'Rattan sofa keeps the look relaxed and airy', width: 1200, height: 900, order: 3 },
      { url: picsum(504, 900, 1200), alt: 'Sentosa Cove — indoor fiddle-leaf fig and monstera arrangement', caption: 'Lush greenery softens the architecture', width: 900, height: 1200, order: 4 },
      { url: picsum(505, 1600, 1067), alt: 'Sentosa Cove — covered lanai with daybed and outdoor curtains', caption: 'The lanai extends the living room into the garden', width: 1600, height: 1067, order: 5 },
      { url: picsum(506, 1200, 1500), alt: 'Sentosa Cove — terrazzo floor detail with tropical leaf shadows', caption: 'Terrazzo flooring stays cool underfoot', width: 1200, height: 1500, order: 6 },
    ],
    testimonial:
      'Every weekend feels like a holiday now. The kids spend more time in the garden because the room flows right into it. It changed how we live in our home.',
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. MINIMALIST — Bathroom (Budget)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-006',
    title: 'Toa Payoh HDB Minimalist Bathroom',
    slug: 'toa-payoh-hdb-minimalist-bathroom',
    description:
      'A compact common bathroom renovation for a 4-room HDB flat in Toa Payoh. The challenge: 4 sq metres, limited natural light, and a tight budget. We chose large-format matte white tiles (600x600mm) to minimise grout lines and visually expand the space. A floating vanity in pale oak offers storage without visual bulk. A rainfall shower head and a single niche shelf keep the look uncluttered. The result proves that minimalist doesn\'t mean cold — the warm lighting and natural timber bring the human touch.',
    client: 'Mr. & Mrs. Koh',
    location: 'Toa Payoh, Singapore',
    year: 2024,
    style: ['Minimalist'],
    roomType: ['Bathroom'],
    budgetTier: 'budget',
    featured: false,
    images: [
      { url: picsum(601, 1200, 1600), alt: 'Toa Payoh bathroom — large-format white tiles and floating oak vanity', caption: 'Large-format tiles keep the small bathroom feeling expansive', width: 1200, height: 1600, order: 1 },
      { url: picsum(602, 900, 1200), alt: 'Toa Payoh bathroom — rainfall shower head and niche', caption: 'Rainfall shower with recessed niche for essentials', width: 900, height: 1200, order: 2 },
      { url: picsum(603, 1200, 900), alt: 'Toa Payoh bathroom — floating vanity with integrated basin', caption: 'Floating vanity preserves floor space and visual lightness', width: 1200, height: 900, order: 3 },
      { url: picsum(604, 1600, 1067), alt: 'Toa Payoh bathroom — warm LED strip lighting under vanity', caption: 'Indirect under-vanity lighting adds warmth', width: 1600, height: 1067, order: 4 },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. SCANDINAVIAN x MINIMALIST — Bedroom (Budget)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-007',
    title: 'Bishan HDB Scandi Guest Room',
    slug: 'bishan-hdb-scandi-guest-room',
    description:
      'A multi-functional guest bedroom and study in a 5-room HDB flat in Bishan. The client needed it to serve three roles: a comfortable guest space, a weekday work-from-home desk, and a hobby sewing corner. We designed a built-in wall bed with flanking cabinets, a fold-down desk that tucks away, and pegboard wall storage for sewing tools. The palette is soft Scandi — pale blue walls, natural pine, and cream textiles — keeping the small room (3.5 x 3m) light and flexible.',
    client: 'Amanda Lee',
    location: 'Bishan, Singapore',
    year: 2024,
    style: ['Scandinavian', 'Minimalist'],
    roomType: ['Bedroom', 'Home Office'],
    budgetTier: 'budget',
    featured: false,
    images: [
      { url: picsum(701, 1200, 1600), alt: 'Bishan guest room — wall bed folded down with bedding', caption: 'Wall bed transforms the room in seconds', width: 1200, height: 1600, order: 1 },
      { url: picsum(702, 1600, 1200), alt: 'Bishan guest room — fold-down desk with sewing pegboard', caption: 'Fold-down desk and pegboard maximise a small footprint', width: 1600, height: 1200, order: 2 },
      { url: picsum(703, 900, 1200), alt: 'Bishan guest room — wall bed folded up revealing desk area', caption: 'Bed stowed: the room becomes a bright study', width: 900, height: 1200, order: 3 },
      { url: picsum(704, 1200, 900), alt: 'Bishan guest room — pegboard detail with sewing tools organised', caption: 'Pegboard keeps sewing tools visible and accessible', width: 1200, height: 900, order: 4 },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. JAPANDI x MODERN — Kitchen (Luxury)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'proj-008',
    title: 'Goodwood Hill Japandi Kitchen',
    slug: 'goodwood-hill-japandi-kitchen',
    description:
      'A quiet, meticulously detailed kitchen in a Goodwood Hill bungalow. The brief was for a kitchen that disappears — no visible handles, no upper wall cabinets, nothing competing with the view of the garden. We designed a run of full-height storage with push-to-open doors in figured walnut, a concealed induction cooktop, and a waterfall-edge Calacatta marble island. A butler\'s pantry behind a pocket door handles the visible mess. The result is a kitchen that feels more like a serene room than a workspace.',
    client: 'Wong Family',
    location: 'Goodwood Hill, Singapore',
    year: 2025,
    style: ['Japandi', 'Modern'],
    roomType: ['Kitchen'],
    budgetTier: 'luxury',
    featured: true,
    images: [
      { url: picsum(801, 1600, 1200), alt: 'Goodwood Hill kitchen — walnut full-height storage with push-to-open doors', caption: 'Handleless walnut storage creates a calm, uninterrupted plane', width: 1600, height: 1200, order: 1 },
      { url: picsum(802, 1200, 1600), alt: 'Goodwood Hill kitchen — Calacatta marble island with waterfall edge', caption: 'Calacatta marble island with waterfall edges anchors the room', width: 1200, height: 1600, order: 2 },
      { url: picsum(803, 1200, 900), alt: 'Goodwood Hill kitchen — concealed induction cooktop and sink', caption: 'Hidden cooktop preserves the minimalist surface', width: 1200, height: 900, order: 3 },
      { url: picsum(804, 900, 1200), alt: 'Goodwood Hill kitchen — butler\'s pantry behind pocket door', caption: 'Butler\'s pantry hides the working clutter', width: 900, height: 1200, order: 4 },
      { url: picsum(805, 1600, 1067), alt: 'Goodwood Hill kitchen — garden view from cooking zone', caption: 'The garden becomes kitchen artwork', width: 1600, height: 1067, order: 5 },
      { url: picsum(806, 1200, 1500), alt: 'Goodwood Hill kitchen — walnut grain close-up on cabinetry', caption: 'Figured walnut selected for its warm, living grain', width: 1200, height: 1500, order: 6 },
      { url: picsum(807, 1600, 1200), alt: 'Goodwood Hill kitchen — open shelving with ceramic and glassware', caption: 'Curated open shelving for daily-use pieces', width: 1600, height: 1200, order: 7 },
    ],
    testimonial:
      'People walk into our kitchen and ask if we actually cook in it. The answer is yes — constantly. The design doesn\'t get in the way of real life. It just makes it beautiful.',
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

/** Get all unique style tags across all projects */
export function getAllStyles(): Style[] {
  const styleSet = new Set<Style>();
  projects.forEach((p) => p.style.forEach((s) => styleSet.add(s)));
  return Array.from(styleSet);
}

/** Get all unique room type tags across all projects */
export function getAllRoomTypes(): RoomType[] {
  const roomSet = new Set<RoomType>();
  projects.forEach((p) => p.roomType.forEach((r) => roomSet.add(r)));
  return Array.from(roomSet);
}

/** Get all unique budget tiers */
export function getAllBudgetTiers(): string[] {
  const tiers = new Set<string>();
  projects.forEach((p) => {
    if (p.budgetTier) tiers.add(p.budgetTier);
  });
  return Array.from(tiers);
}

/** Get featured projects only */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Get a single project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Get all project slugs (for generateStaticParams) */
export function getAllProjectSlugs(): { slug: string }[] {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Filter projects by criteria */
export function filterProjects(filters: {
  style?: Style | null;
  roomType?: RoomType | null;
  budgetTier?: string | null;
}): Project[] {
  return projects.filter((p) => {
    if (filters.style && !p.style.includes(filters.style)) return false;
    if (filters.roomType && !p.roomType.includes(filters.roomType)) return false;
    if (filters.budgetTier && p.budgetTier !== filters.budgetTier) return false;
    return true;
  });
}

/** Build masonry items with interleaved CTAs every `interval` items */
export function buildMasonryItems(
  sourceProjects: Project[],
  interval: number = 7,
  callToActions?: { project?: Project }[]
): (Project | { type: 'cta'; projectTitle?: string })[] {
  const items: (Project | { type: 'cta'; projectTitle?: string })[] = [];

  sourceProjects.forEach((project, index) => {
    items.push(project);

    // Insert CTA every `interval` projects, but not after the last one
    if ((index + 1) % interval === 0 && index < sourceProjects.length - 1) {
      items.push({
        type: 'cta',
        projectTitle: project.title,
      });
    }
  });

  return items;
}

// ─── Default export ──────────────────────────────────────────────────────────
export default projects;
