export interface ProjectImage {
  src: string
  width: number
  height: number
  alt: string
}

export interface Project {
  id: number
  title: string
  slug: string
  style: string
  room: string
  budget: string
  location: string
  year: number
  description: string
  longDescription: string
  images: ProjectImage[]
  tags: string[]
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Sunlit Minimalist Loft",
    slug: "sunlit-minimalist-loft",
    style: "Minimalist",
    room: "Living Room",
    budget: "Moderate",
    location: "Brooklyn, NY",
    year: 2024,
    description:
      "A bright, airy loft conversion that strips back to essentials with warm natural light and sculptural furnishings.",
    longDescription:
      "This Brooklyn loft was reimagined as a sanctuary of calm. Every element was curated to maximize light and space, from the floor-to-ceiling windows to the custom white oak millwork. The result is a minimalist interior that feels warm, lived-in, and deeply intentional.",
    images: [
      { src: "https://picsum.photos/seed/loft1/800/1000", width: 800, height: 1000, alt: "Living room with floor-to-ceiling windows" },
      { src: "https://picsum.photos/seed/loft2/800/600", width: 800, height: 600, alt: "Minimalist kitchen with white oak cabinetry" },
      { src: "https://picsum.photos/seed/loft3/800/900", width: 800, height: 900, alt: "Sculptural dining area" },
      { src: "https://picsum.photos/seed/loft4/800/700", width: 800, height: 700, alt: "Reading nook by the window" },
    ],
    tags: ["Minimalist", "Warm Tones", "Open Plan"],
    featured: true,
  },
  {
    id: 2,
    title: "Scandinavian Forest Retreat",
    slug: "scandinavian-forest-retreat",
    style: "Scandinavian",
    room: "Bedroom",
    budget: "Luxury",
    location: "Oslo, Norway",
    year: 2024,
    description:
      "A serene bedroom inspired by Nordic forests, blending organic textures with muted earthy hues.",
    longDescription:
      "Drawing from the surrounding pine forests of Oslo, this bedroom retreat uses layered textiles, reclaimed timber, and a restrained palette of sage, clay, and cream. The design prioritizes restfulness and a deep connection to nature.",
    images: [
      { src: "https://picsum.photos/seed/scandi1/800/1100", width: 800, height: 1100, alt: "Bedroom with wooden headboard" },
      { src: "https://picsum.photos/seed/scandi2/800/650", width: 800, height: 650, alt: "Organic linen bedding" },
      { src: "https://picsum.photos/seed/scandi3/800/800", width: 800, height: 800, alt: "Reading chair by window" },
    ],
    tags: ["Scandinavian", "Organic", "Nature-Inspired"],
    featured: true,
  },
  {
    id: 3,
    title: "Industrial Warehouse Kitchen",
    slug: "industrial-warehouse-kitchen",
    style: "Industrial",
    room: "Kitchen",
    budget: "Moderate",
    location: "Berlin, Germany",
    year: 2023,
    description:
      "Exposed brick, steel shelving, and concrete counters define this raw-yet-refined urban kitchen.",
    longDescription:
      "Housed in a converted Berlin warehouse, this kitchen celebrates its industrial heritage. Original brick walls and timber ceilings are paired with blackened steel open shelving, polished concrete worktops, and warm pendant lighting that softens the edge.",
    images: [
      { src: "https://picsum.photos/seed/industrial1/800/950", width: 800, height: 950, alt: "Industrial kitchen with exposed brick" },
      { src: "https://picsum.photos/seed/industrial2/800/600", width: 800, height: 600, alt: "Steel shelving and concrete counters" },
      { src: "https://picsum.photos/seed/industrial3/800/850", width: 800, height: 850, alt: "Dining area with pendant lights" },
      { src: "https://picsum.photos/seed/industrial4/800/750", width: 800, height: 750, alt: "Kitchen island detail" },
    ],
    tags: ["Industrial", "Urban", "Raw Materials"],
    featured: false,
  },
  {
    id: 4,
    title: "Japandi Guest House",
    slug: "japandi-guest-house",
    style: "Japandi",
    room: "Bathroom",
    budget: "Economy",
    location: "Kyoto, Japan",
    year: 2024,
    description:
      "A minimalist bathroom blending Japanese wabi-sabi with Scandinavian functionality.",
    longDescription:
      "This compact guest house bathroom embodies the Japandi ethos — a union of Japanese restraint and Scandinavian warmth. Handmade tiles, a free-standing hinoki tub, and matte black fixtures sit alongside soft linen touches and a neutral palette.",
    images: [
      { src: "https://picsum.photos/seed/japandi1/800/1000", width: 800, height: 1000, alt: "Japandi bathroom with wooden tub" },
      { src: "https://picsum.photos/seed/japandi2/800/700", width: 800, height: 700, alt: "Handmade tile detail" },
      { src: "https://picsum.photos/seed/japandi3/800/550", width: 800, height: 550, alt: "Minimalist vanity area" },
    ],
    tags: ["Japandi", "Minimalist", "Spa-Like"],
    featured: true,
  },
  {
    id: 5,
    title: "Tropical Courtyard Villa",
    slug: "tropical-courtyard-villa",
    style: "Tropical",
    room: "Outdoor",
    budget: "Luxury",
    location: "Bali, Indonesia",
    year: 2023,
    description:
      "An open-air villa where indoor and outdoor living blur amid lush tropical foliage.",
    longDescription:
      "Nestled in the Balinese jungle, this villa dissolves the boundary between interior and exterior. Rattan furniture, monsoon-proof outdoor fabrics, and a palette of deep greens and terracotta create a resort-like everyday experience.",
    images: [
      { src: "https://picsum.photos/seed/tropic1/800/900", width: 800, height: 900, alt: "Open-air living room" },
      { src: "https://picsum.photos/seed/tropic2/800/600", width: 800, height: 600, alt: "Poolside daybed" },
      { src: "https://picsum.photos/seed/tropic3/800/800", width: 800, height: 800, alt: "Outdoor dining pavilion" },
      { src: "https://picsum.photos/seed/tropic4/800/1000", width: 800, height: 1000, alt: "Jungle view from bedroom" },
      { src: "https://picsum.photos/seed/tropic5/800/700", width: 800, height: 700, alt: "Rattan furniture detail" },
    ],
    tags: ["Tropical", "Indoor-Outdoor", "Resort"],
    featured: true,
  },
  {
    id: 6,
    title: "Modernist City Apartment",
    slug: "modernist-city-apartment",
    style: "Modern",
    room: "Living Room",
    budget: "Moderate",
    location: "Singapore",
    year: 2024,
    description:
      "Clean lines, bold art, and smart storage transform a compact city apartment.",
    longDescription:
      "This Singapore apartment proves that great design thrives in small spaces. Custom joinery hides every clutter point, while a statement art wall and sculptural furniture pieces add personality without overwhelming the compact footprint.",
    images: [
      { src: "https://picsum.photos/seed/modern1/800/850", width: 800, height: 850, alt: "Modern living room with art wall" },
      { src: "https://picsum.photos/seed/modern2/800/600", width: 800, height: 600, alt: "Compact dining area" },
      { src: "https://picsum.photos/seed/modern3/800/750", width: 800, height: 750, alt: "Smart storage solutions" },
    ],
    tags: ["Modern", "Compact Living", "Bold Art"],
    featured: false,
  },
  {
    id: 7,
    title: "Scandi-Meets-Japandi Study",
    slug: "scandi-meets-japandi-study",
    style: "Japandi",
    room: "Home Office",
    budget: "Economy",
    location: "Copenhagen, Denmark",
    year: 2024,
    description:
      "A functional yet serene home office blending Scandinavian warmth with Japanese minimalism.",
    longDescription:
      "This Copenhagen study is a hybrid of two design philosophies — the cozy warmth of hygge and the disciplined simplicity of wabi-sabi. A dark-stained oak desk, paper lantern pendant, and curated ceramic collection make it a space for deep focus.",
    images: [
      { src: "https://picsum.photos/seed/study1/800/700", width: 800, height: 700, alt: "Home office desk setup" },
      { src: "https://picsum.photos/seed/study2/800/950", width: 800, height: 950, alt: "Bookshelf and ceramic collection" },
      { src: "https://picsum.photos/seed/study3/800/600", width: 800, height: 600, alt: "Reading corner with paper lantern" },
    ],
    tags: ["Scandinavian", "Japandi", "Wabi-Sabi"],
    featured: false,
  },
  {
    id: 8,
    title: "Rustic Modern Farmhouse",
    slug: "rustic-modern-farmhouse",
    style: "Modern",
    room: "Kitchen",
    budget: "Luxury",
    location: "Tuscany, Italy",
    year: 2023,
    description:
      "A restored Tuscan farmhouse where rustic stone meets sleek contemporary design.",
    longDescription:
      "This Tuscan farmhouse restoration marries 200-year-old stone walls with clean modernist interventions. A marble island floats in the original stable, while floor-to-ceiling steel windows frame vineyard views. The result is heritage without stuffiness.",
    images: [
      { src: "https://picsum.photos/seed/farm1/800/1050", width: 800, height: 1050, alt: "Farmhouse kitchen with marble island" },
      { src: "https://picsum.photos/seed/farm2/800/650", width: 800, height: 650, alt: "Steel windows overlooking vineyards" },
      { src: "https://picsum.photos/seed/farm3/800/800", width: 800, height: 800, alt: "Original stone wall detail" },
      { src: "https://picsum.photos/seed/farm4/800/900", width: 800, height: 900, alt: "Dining room with modern chandelier" },
    ],
    tags: ["Modern Rustic", "Heritage", "Farmhouse"],
    featured: true,
  },
]

export const styles = ["Modern", "Scandinavian", "Industrial", "Japandi", "Tropical", "Minimalist"]
export const rooms = ["Living Room", "Bedroom", "Kitchen", "Bathroom", "Outdoor", "Home Office"]
export const budgets = ["Economy", "Moderate", "Luxury"]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFilteredProjects(
  style?: string,
  room?: string,
  budget?: string
): Project[] {
  return projects.filter((p) => {
    if (style && style !== "all" && p.style !== style) return false
    if (room && room !== "all" && p.room !== room) return false
    if (budget && budget !== "all" && p.budget !== budget) return false
    return true
  })
}
