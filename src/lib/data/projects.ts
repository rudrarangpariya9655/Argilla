import type { Img } from "@/lib/images";

export type ProjectCategory =
  | "Residential"
  | "Hospitality"
  | "Commercial"
  | "Bathroom"
  | "Kitchen"
  | "Architecture";

export type Project = {
  slug: string;
  name: string;
  location: string;
  architect: string;
  collections: string[];
  year: number;
  category: ProjectCategory;
  summary: string;
  story: string[];
  /** Pull-quote credited to the project's designer. */
  quote?: { text: string; author: string; role: string };
  facts: { label: string; value: string }[];
  cover: Img;
  gallery: Img[];
};

export const PROJECTS: Project[] = [
  {
    slug: "casa-fornace",
    name: "Casa Fornace",
    location: "Modena, Italy",
    architect: "Studio Bellini",
    collections: ["terracotta", "earth"],
    year: 2024,
    category: "Residential",
    summary:
      "A converted kiln house where the original firing chamber became the courtyard.",
    story: [
      "The building spent sixty years as a working kiln before it was sold, and the brief was not to hide that. Studio Bellini kept the firing chamber open to the sky and built the house around it.",
      "Sienna Extrude runs from the courtyard walls into the living space, changing only in laying pattern. Inside, Millstone Field grounds the floor so the terracotta stays the loudest thing in the room.",
      "Nothing about the house is precious. The terracotta will darken where the family walks, and that is in the specification.",
    ],
    quote: {
      text: "We wanted the house to remember what it used to do. The clay does that for us.",
      author: "Chiara Bellini",
      role: "Founding partner, Studio Bellini",
    },
    facts: [
      { label: "Floor area", value: "310 m2" },
      { label: "Surfaces", value: "Sienna Extrude, Millstone Field" },
      { label: "Completed", value: "Spring 2024" },
      { label: "Photography", value: "Demo imagery" },
    ],
    cover: {
      id: 31483307,
      alt: "Casa Fornace: a square window set into a terracotta wall",
    },
    gallery: [
      { id: 17166669, alt: "A window on the warm terracotta facade" },
      { id: 38302904, alt: "Terracotta pots set into geometric wall alcoves" },
      { id: 36090539, alt: "Stacked terracotta in the original kiln building" },
      { id: 6104788, alt: "Detail of the pale clay floor body" },
    ],
  },
  {
    slug: "hotel-calcare",
    name: "Hotel Calcare",
    location: "Lisbon, Portugal",
    architect: "Aro Arquitectos",
    collections: ["stone", "minimal"],
    year: 2023,
    category: "Hospitality",
    summary:
      "Forty-two rooms where every surface resolves into one of three neutrals.",
    story: [
      "Hotel Calcare is an exercise in restraint. Aro Arquitectos specified three tones across the whole building and refused to add a fourth, even in the spa.",
      "Basalt Slab clads the lobby and lift cores in 3200mm sheets, which meant a single horizontal joint in a six-metre wall. The guest bathrooms run entirely in Chalk Continuum, skirting and nosing included.",
      "The effect is quieter than a photograph suggests. You notice the light before you notice the material.",
    ],
    quote: {
      text: "Three tones, forty-two rooms. The discipline was the design.",
      author: "Miguel Aro",
      role: "Principal, Aro Arquitectos",
    },
    facts: [
      { label: "Rooms", value: "42" },
      { label: "Surfaces", value: "Basalt Slab, Chalk Continuum" },
      { label: "Completed", value: "Autumn 2023" },
      { label: "Photography", value: "Demo imagery" },
    ],
    cover: {
      id: 7587747,
      alt: "Hotel Calcare: a sleek bathroom with textured walls and glass shower",
    },
    gallery: [
      { id: 8134805, alt: "A guest bathroom finished in a single neutral" },
      { id: 7232667, alt: "Detail of the speckled stone lobby cladding" },
      { id: 10486084, alt: "A shower lined in geometric tiling" },
      { id: 6957081, alt: "A round ceramic bath in a guest suite" },
    ],
  },
  {
    slug: "atelier-nord",
    name: "Atelier Nord",
    location: "Copenhagen, Denmark",
    architect: "Holm & Vestergaard",
    collections: ["minimal", "marble"],
    year: 2024,
    category: "Commercial",
    summary:
      "A design studio where the material palette stops at the desk edge.",
    story: [
      "The studio wanted a workspace that would not compete with the work on the walls. Graphite Continuum covers the floor plate end to end, with no thresholds between zones.",
      "One exception was allowed: a single Bianco Vena island in the kitchen, bookmatched and mitred so the vein turns the corner.",
      "It is the only decorative gesture in 640 square metres, and it works because it is the only one.",
    ],
    facts: [
      { label: "Floor area", value: "640 m2" },
      { label: "Surfaces", value: "Graphite Continuum, Bianco Vena" },
      { label: "Completed", value: "Summer 2024" },
      { label: "Photography", value: "Demo imagery" },
    ],
    cover: {
      id: 7303782,
      alt: "Atelier Nord: a minimal studio corner with a wooden chair",
    },
    gallery: [
      { id: 6104932, alt: "The dark continuous floor plate" },
      { id: 4709481, alt: "The bookmatched marble island surface" },
      { id: 10486271, alt: "The studio kitchen with its single stone gesture" },
      { id: 17885652, alt: "Daylight raking across a minimal wall" },
    ],
  },
  {
    slug: "villa-argilla",
    name: "Villa Argilla",
    location: "Mallorca, Spain",
    architect: "Nadal Studio",
    collections: ["earth", "terracotta"],
    year: 2023,
    category: "Architecture",
    summary:
      "A house built to disappear into a hillside of the same colour.",
    story: [
      "Nadal Studio matched the external render to a sample of the hillside soil, then asked us to fire a body to the same reference. Peat Monolith in its textured 20mm outdoor format runs across every terrace.",
      "Inside, the same tone continues in a 9mm interior format, so the floor level reads as continuous through the glazing.",
      "From the road, in late afternoon, the house is genuinely hard to find.",
    ],
    quote: {
      text: "The client asked for a house you could lose. The clay made that possible.",
      author: "Joana Nadal",
      role: "Director, Nadal Studio",
    },
    facts: [
      { label: "Floor area", value: "480 m2" },
      { label: "Surfaces", value: "Peat Monolith, Amber Field" },
      { label: "Completed", value: "Winter 2023" },
      { label: "Photography", value: "Demo imagery" },
    ],
    cover: {
      id: 39485802,
      alt: "Villa Argilla: stacked terracotta roof tiles in warm sunlight",
    },
    gallery: [
      { id: 8063829, alt: "The textured dark body used across the terraces" },
      { id: 7399421, alt: "Clay pieces drying in Mediterranean sun" },
      { id: 5950839, alt: "Detail of the earth-toned exterior surface" },
      { id: 31483307, alt: "An opening framed in warm clay" },
    ],
  },
  {
    slug: "bagno-sorgente",
    name: "Bagno Sorgente",
    location: "Milan, Italy",
    architect: "Ferrari Interni",
    collections: ["marble", "minimal"],
    year: 2024,
    category: "Bathroom",
    summary:
      "A private spa bathroom cut from two slabs and nothing else.",
    story: [
      "The entire room is made from four pieces of Bianco Vena and a single Chalk Continuum floor. There are no skirtings, no trims and no visible fixings.",
      "Ferrari Interni designed the bath surround as a mitred box so the vein runs unbroken over the edge and down the face.",
      "It took three weeks of dry-laying to sequence the slabs. The install took four days.",
    ],
    facts: [
      { label: "Room area", value: "18 m2" },
      { label: "Surfaces", value: "Bianco Vena, Chalk Continuum" },
      { label: "Completed", value: "Spring 2024" },
      { label: "Photography", value: "Demo imagery" },
    ],
    cover: {
      id: 4138128,
      alt: "Bagno Sorgente: black shower fittings beside a curved white bath",
    },
    gallery: [
      { id: 7587289, alt: "The bath surround in bookmatched marble" },
      { id: 3847492, alt: "Detail of the polished slab face" },
      { id: 37895793, alt: "A slim tap against a smooth pale wall" },
      { id: 6957081, alt: "The room seen from the doorway" },
    ],
  },
  {
    slug: "cucina-bruna",
    name: "Cucina Bruna",
    location: "Antwerp, Belgium",
    architect: "Peeters Werkplaats",
    collections: ["stone", "artisan"],
    year: 2023,
    category: "Kitchen",
    summary:
      "A working kitchen where the worktop and the crockery come from the same oxides.",
    story: [
      "The owners are both chefs, so the kitchen was specified for heat, acid and volume rather than for photographs.",
      "Basalt Slab takes the worktops and the splashback in one continuous material, unsealed. The open shelving holds Ash Bowl and Iron Carafe from our studio range, glazed with the same iron that colours the slab.",
      "Two years in, the surface has no marks. The crockery has plenty, which is how it should be.",
    ],
    quote: {
      text: "We cook eleven hours a day on it. It looks exactly like it did on delivery.",
      author: "Sanne Peeters",
      role: "Owner and chef",
    },
    facts: [
      { label: "Worktop run", value: "7.4 m" },
      { label: "Surfaces", value: "Basalt Slab, Artisan vessels" },
      { label: "Completed", value: "Autumn 2023" },
      { label: "Photography", value: "Demo imagery" },
    ],
    cover: {
      id: 7166562,
      alt: "Cucina Bruna: a stone counter with an undercounter sink",
    },
    gallery: [
      { id: 10099115, alt: "The kitchen with its continuous stone splashback" },
      { id: 6963838, alt: "Studio ceramics on the open shelving" },
      { id: 6611418, alt: "Handcrafted cups and bowls in daily use" },
      { id: 10486271, alt: "The full kitchen elevation" },
    ],
  },
];

export const projectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Residential",
  "Hospitality",
  "Commercial",
  "Bathroom",
  "Kitchen",
  "Architecture",
];
