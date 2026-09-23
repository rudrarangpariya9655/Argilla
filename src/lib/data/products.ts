import type { Img } from "@/lib/images";

export type Product = {
  slug: string;
  name: string;
  collection: string;
  /** Marketing one-liner used on cards. */
  tagline: string;
  description: string[];
  material: string;
  finish: string;
  finishes: string[];
  dimensions: string;
  thickness: string;
  colours: { name: string; hex: string }[];
  applications: string[];
  /** DEMO pricing, per square metre or per piece. */
  price: string;
  year: number;
  /** Primary card image. */
  cover: Img;
  /** Revealed on hover, second image of the same piece in situ. */
  alt: Img;
  gallery: Img[];
  spec: { label: string; value: string }[];
  related: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "millstone-field",
    name: "Millstone Field",
    collection: "earth",
    tagline: "Full-body porcelain the colour of dry riverbed.",
    description: [
      "Millstone Field is the tile that made the Earth collection work. Pigment is blended into the body before pressing, so the tone survives cutting, mitring and forty years of foot traffic.",
      "Specified flat for floors or stack-bonded up a wall, it holds a room together without asking for attention.",
    ],
    material: "Full-body porcelain stoneware",
    finish: "Matte",
    finishes: ["Matte", "Natural", "Textured"],
    dimensions: "1200 x 600 mm",
    thickness: "9 mm",
    colours: [
      { name: "Ash", hex: "#c9c3ba" },
      { name: "Millstone", hex: "#a79c8e" },
      { name: "Dune", hex: "#cdb59b" },
      { name: "Peat", hex: "#5d5148" },
    ],
    applications: ["Floors", "Walls", "Wet areas", "Commercial"],
    price: "From EUR 74 / m2",
    year: 2019,
    cover: {
      id: 6104788,
      alt: "Millstone Field porcelain shown close, revealing a fine clay grain",
    },
    alt: {
      id: 17885652,
      alt: "Millstone Field on a minimal interior wall lit by an arched opening",
    },
    gallery: [
      { id: 6693779, alt: "Millstone Field surface in a neutral clay tone" },
      { id: 33980199, alt: "Detail of the tile edge showing full-body colour" },
      { id: 6800930, alt: "A room finished in Millstone Field with a wicker chair" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.5% (BIa)" },
      { label: "Slip resistance", value: "R10 / A+B" },
      { label: "Rectified", value: "Yes, all four edges" },
      { label: "Shade variation", value: "V2 — slight" },
      { label: "Frost resistant", value: "Yes" },
    ],
    related: ["peat-monolith", "basalt-slab", "chalk-continuum"],
  },
  {
    slug: "peat-monolith",
    name: "Peat Monolith",
    collection: "earth",
    tagline: "The darkest body we fire, and the most forgiving.",
    description: [
      "A deep brown-black clay body with a texture close to unfinished plaster. Peat Monolith absorbs light rather than reflecting it, which makes it unusually good in rooms with a single window.",
      "Available textured for external terraces at the same tone, so an interior floor can run straight out to a garden.",
    ],
    material: "Full-body porcelain stoneware",
    finish: "Textured",
    finishes: ["Textured", "Matte"],
    dimensions: "800 x 800 mm",
    thickness: "9 mm / 20 mm outdoor",
    colours: [
      { name: "Peat", hex: "#4a4038" },
      { name: "Iron", hex: "#332d29" },
    ],
    applications: ["Floors", "Terraces", "Walls", "Pool surrounds"],
    price: "From EUR 82 / m2",
    year: 2020,
    cover: {
      id: 8063829,
      alt: "Peat Monolith shown as a dark textured clay surface",
    },
    alt: {
      id: 5950839,
      alt: "Peat Monolith texture detail with a rippled, matte face",
    },
    gallery: [
      { id: 6104932, alt: "Peat Monolith surface photographed in raking light" },
      { id: 7599796, alt: "A rough, earthy face of the Peat Monolith body" },
      { id: 31483307, alt: "Peat Monolith used on an external wall opening" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.5% (BIa)" },
      { label: "Slip resistance", value: "R11 / A+B+C" },
      { label: "Rectified", value: "Yes, all four edges" },
      { label: "Shade variation", value: "V3 — moderate" },
      { label: "Frost resistant", value: "Yes" },
    ],
    related: ["millstone-field", "sienna-extrude", "basalt-slab"],
  },
  {
    slug: "basalt-slab",
    name: "Basalt Slab",
    collection: "stone",
    tagline: "Volcanic grain in a 1600 x 3200 sheet.",
    description: [
      "Basalt Slab reproduces the close, even fleck of volcanic stone across a slab large enough to clad a wall with a single joint.",
      "Six faces are printed and pressed in rotation, so pattern repetition is effectively invisible at room scale.",
    ],
    material: "Porcelain slab",
    finish: "Natural",
    finishes: ["Natural", "Satin"],
    dimensions: "1600 x 3200 mm",
    thickness: "6 mm / 12 mm",
    colours: [
      { name: "Basalt", hex: "#6f6a64" },
      { name: "Slate", hex: "#4c4f52" },
      { name: "Grey Mist", hex: "#a6a49f" },
    ],
    applications: ["Walls", "Worktops", "Joinery", "Facades"],
    price: "From EUR 138 / m2",
    year: 2021,
    cover: {
      id: 7232667,
      alt: "Basalt Slab showing a fine speckled stone face",
    },
    alt: {
      id: 7166562,
      alt: "Basalt Slab used as a kitchen worktop with an undercounter sink",
    },
    gallery: [
      { id: 7599796, alt: "Close detail of the Basalt Slab mineral fleck" },
      { id: 4709030, alt: "Basalt Slab in a warmer beige-grey face" },
      { id: 10099115, alt: "A kitchen finished in Basalt Slab surfaces" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.1%" },
      { label: "Slip resistance", value: "R9" },
      { label: "Rectified", value: "Yes" },
      { label: "Shade variation", value: "V2 — slight" },
      { label: "Food safe", value: "Yes, unsealed" },
    ],
    related: ["travertine-warm", "bianco-vena", "millstone-field"],
  },
  {
    slug: "travertine-warm",
    name: "Travertine Warm",
    collection: "stone",
    tagline: "Open-pore travertine, without the filling and sealing.",
    description: [
      "The look of vein-cut travertine with its characteristic open pores rendered in relief rather than printed flat.",
      "Because it is porcelain, it goes into wet rooms and commercial floors where real travertine would be a maintenance contract.",
    ],
    material: "Porcelain stoneware",
    finish: "Natural",
    finishes: ["Natural", "Satin", "Polished"],
    dimensions: "1200 x 1200 mm",
    thickness: "9 mm",
    colours: [
      { name: "Travertine", hex: "#c4b39c" },
      { name: "Noce", hex: "#9c7f63" },
    ],
    applications: ["Floors", "Walls", "Bathrooms", "Hospitality"],
    price: "From EUR 96 / m2",
    year: 2021,
    cover: {
      id: 4709030,
      alt: "Travertine Warm showing beige and brown natural veining",
    },
    alt: {
      id: 7587289,
      alt: "Travertine Warm in a bathroom with a ceramic bath",
    },
    gallery: [
      { id: 6952650, alt: "Travertine Warm surface in soft daylight" },
      { id: 4705932, alt: "Detail of the open-pore travertine relief" },
      { id: 8134805, alt: "A bathroom clad in Travertine Warm" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.5% (BIa)" },
      { label: "Slip resistance", value: "R10" },
      { label: "Rectified", value: "Yes" },
      { label: "Shade variation", value: "V3 — moderate" },
      { label: "Frost resistant", value: "Yes" },
    ],
    related: ["basalt-slab", "bianco-vena", "chalk-continuum"],
  },
  {
    slug: "sienna-extrude",
    name: "Sienna Extrude",
    collection: "terracotta",
    tagline: "Extruded terracotta with the kiln's own colour shift.",
    description: [
      "Sienna Extrude is pushed through a die rather than pressed, which leaves a slightly irregular edge and a denser body.",
      "Firing variation across a pallet is deliberate. Lay it from four boxes at once and the wall gains a depth that a uniform tile cannot reach.",
    ],
    material: "Extruded terracotta",
    finish: "Natural",
    finishes: ["Natural", "Matte"],
    dimensions: "300 x 150 mm",
    thickness: "12 mm",
    colours: [
      { name: "Sienna", hex: "#a85436" },
      { name: "Rosso", hex: "#8f4229" },
      { name: "Amber", hex: "#c07b41" },
    ],
    applications: ["Walls", "Floors", "Facades", "Fireplaces"],
    price: "From EUR 88 / m2",
    year: 2016,
    cover: {
      id: 39485802,
      alt: "Sienna Extrude terracotta tiles stacked, showing tonal variation",
    },
    alt: {
      id: 17166669,
      alt: "Sienna Extrude on a facade around a colonial window",
    },
    gallery: [
      { id: 36090539, alt: "Terracotta pieces stacked in the workshop" },
      { id: 38302904, alt: "Sienna Extrude set into geometric wall alcoves" },
      { id: 7399421, alt: "Terracotta drying in sunlight before firing" },
    ],
    spec: [
      { label: "Water absorption", value: "3 to 6% (BIb)" },
      { label: "Slip resistance", value: "R10" },
      { label: "Rectified", value: "No — natural edge" },
      { label: "Shade variation", value: "V4 — substantial" },
      { label: "Frost resistant", value: "Yes" },
    ],
    related: ["amber-field", "peat-monolith", "millstone-field"],
  },
  {
    slug: "amber-field",
    name: "Amber Field",
    collection: "terracotta",
    tagline: "A square terracotta for floors that want warmth underfoot.",
    description: [
      "A traditional 200mm square in a lighter amber body, hand-finished at the edge and left unglazed.",
      "It takes a wax or oil finish beautifully, though most of our specifiers now leave it raw and let it patinate.",
    ],
    material: "Pressed terracotta",
    finish: "Matte",
    finishes: ["Matte", "Natural"],
    dimensions: "200 x 200 mm",
    thickness: "14 mm",
    colours: [
      { name: "Amber", hex: "#c07b41" },
      { name: "Clay", hex: "#b08055" },
    ],
    applications: ["Floors", "Kitchens", "Courtyards", "Residential"],
    price: "From EUR 79 / m2",
    year: 2017,
    cover: {
      id: 36090539,
      alt: "Amber Field terracotta pieces stacked in the workshop",
    },
    alt: {
      id: 7399421,
      alt: "Amber Field tiles drying outdoors in warm sunlight",
    },
    gallery: [
      { id: 33980199, alt: "Close texture of the fired amber clay body" },
      { id: 38302904, alt: "Amber Field used on a brick-and-clay wall" },
      { id: 31483307, alt: "An opening framed in warm terracotta" },
    ],
    spec: [
      { label: "Water absorption", value: "3 to 6% (BIb)" },
      { label: "Slip resistance", value: "R10" },
      { label: "Rectified", value: "No — natural edge" },
      { label: "Shade variation", value: "V4 — substantial" },
      { label: "Frost resistant", value: "Yes" },
    ],
    related: ["sienna-extrude", "millstone-field", "oatmeal-vessel"],
  },
  {
    slug: "bianco-vena",
    name: "Bianco Vena",
    collection: "marble",
    tagline: "Bookmatched veining that survives the mitre.",
    description: [
      "Bianco Vena carries its grey-gold vein through the full thickness of the slab, so a waterfall counter reads as one piece of stone rather than three.",
      "Supplied in bookmatched pairs on request, sequenced at the factory and labelled for site.",
    ],
    material: "Porcelain slab, through-body vein",
    finish: "Polished",
    finishes: ["Polished", "Satin", "Natural"],
    dimensions: "1600 x 3200 mm",
    thickness: "12 mm",
    colours: [
      { name: "Bianco", hex: "#efece6" },
      { name: "Calacatta Warm", hex: "#e3d9c9" },
    ],
    applications: ["Worktops", "Walls", "Bathrooms", "Joinery"],
    price: "From EUR 164 / m2",
    year: 2022,
    cover: {
      id: 4709481,
      alt: "Bianco Vena slab showing fine grey veining on a pale ground",
    },
    alt: {
      id: 4207891,
      alt: "Bianco Vena as a table surface with a ceramic vase",
    },
    gallery: [
      { id: 3847492, alt: "Smooth polished face of the Bianco Vena slab" },
      { id: 6952650, alt: "Bianco Vena in a warmer Calacatta tone" },
      { id: 4138128, alt: "A bathroom finished in Bianco Vena" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.1%" },
      { label: "Slip resistance", value: "R9" },
      { label: "Rectified", value: "Yes" },
      { label: "Shade variation", value: "V3 — moderate" },
      { label: "Bookmatched", value: "Available to order" },
    ],
    related: ["nero-profondo", "travertine-warm", "chalk-continuum"],
  },
  {
    slug: "nero-profondo",
    name: "Nero Profondo",
    collection: "marble",
    tagline: "Black marble with a single gold vein, used sparingly.",
    description: [
      "A deep black ground crossed by one dominant vein. Nero Profondo is designed to be used once in a room, as a counter or a single wall, and nowhere else.",
      "Satin is the finish we recommend: polished black shows every fingerprint, and the satin face keeps the depth without the maintenance.",
    ],
    material: "Porcelain slab, through-body vein",
    finish: "Satin",
    finishes: ["Satin", "Polished"],
    dimensions: "1200 x 2400 mm",
    thickness: "12 mm",
    colours: [
      { name: "Nero", hex: "#221f1d" },
      { name: "Pietra Grigia", hex: "#565451" },
    ],
    applications: ["Worktops", "Feature walls", "Hospitality", "Retail"],
    price: "From EUR 178 / m2",
    year: 2023,
    cover: {
      id: 12494703,
      alt: "Nero Profondo shown as a dark ornate surface with gold detail",
    },
    alt: {
      id: 10099115,
      alt: "Nero Profondo used as a dark kitchen surface",
    },
    gallery: [
      { id: 7232667, alt: "Detail of the dark mineral ground" },
      { id: 4705932, alt: "Vein structure running through the slab body" },
      { id: 10486271, alt: "A kitchen with a Nero Profondo counter" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.1%" },
      { label: "Slip resistance", value: "R9" },
      { label: "Rectified", value: "Yes" },
      { label: "Shade variation", value: "V2 — slight" },
      { label: "Food safe", value: "Yes, unsealed" },
    ],
    related: ["bianco-vena", "basalt-slab", "graphite-continuum"],
  },
  {
    slug: "chalk-continuum",
    name: "Chalk Continuum",
    collection: "minimal",
    tagline: "One neutral, every format, no visible junction.",
    description: [
      "Chalk Continuum is supplied as a system: floor tile, wall tile, coved skirting, stair nosing and a 6mm sheet for wrapping joinery, all in a single shade.",
      "Used end to end, the room loses its corners. That is the point.",
    ],
    material: "Porcelain stoneware system",
    finish: "Matte",
    finishes: ["Matte", "Satin", "Natural"],
    dimensions: "600 x 1200 mm",
    thickness: "9 mm",
    colours: [
      { name: "Chalk", hex: "#e8e3da" },
      { name: "Greige", hex: "#c3bbaf" },
      { name: "Fog", hex: "#a9a8a4" },
    ],
    applications: ["Floors", "Walls", "Bathrooms", "Joinery"],
    price: "From EUR 92 / m2",
    year: 2023,
    cover: {
      id: 9992549,
      alt: "Chalk Continuum tiled wall with a single light switch",
    },
    alt: {
      id: 7587747,
      alt: "Chalk Continuum in a bathroom with a glass shower",
    },
    gallery: [
      { id: 8134805, alt: "A bathroom running floor to ceiling in Chalk" },
      { id: 37895793, alt: "A tap set against a smooth Chalk wall" },
      { id: 5793642, alt: "A minimal interior finished in Chalk Continuum" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.5% (BIa)" },
      { label: "Slip resistance", value: "R10 / A+B" },
      { label: "Rectified", value: "Yes" },
      { label: "Shade variation", value: "V1 — uniform" },
      { label: "System parts", value: "Skirting, nosing, 6mm sheet" },
    ],
    related: ["graphite-continuum", "millstone-field", "travertine-warm"],
  },
  {
    slug: "graphite-continuum",
    name: "Graphite Continuum",
    collection: "minimal",
    tagline: "The dark end of the Continuum system.",
    description: [
      "Same system, opposite end of the scale. Graphite is the neutral we reach for in hospitality, where a floor has to hide a season of traffic.",
      "Satin finish holds a low sheen that reads as depth rather than shine.",
    ],
    material: "Porcelain stoneware system",
    finish: "Satin",
    finishes: ["Satin", "Matte"],
    dimensions: "1200 x 1200 mm",
    thickness: "9 mm",
    colours: [
      { name: "Graphite", hex: "#43413e" },
      { name: "Fog", hex: "#a9a8a4" },
    ],
    applications: ["Floors", "Walls", "Hospitality", "Retail"],
    price: "From EUR 92 / m2",
    year: 2023,
    cover: {
      id: 6104932,
      alt: "Graphite Continuum shown as a dark textured wall surface",
    },
    alt: {
      id: 10486084,
      alt: "Graphite Continuum in a shower with geometric detailing",
    },
    gallery: [
      { id: 7599796, alt: "Graphite surface detail in raking light" },
      { id: 10486271, alt: "A kitchen grounded by a Graphite floor" },
      { id: 7303782, alt: "A minimal corner finished in Graphite" },
    ],
    spec: [
      { label: "Water absorption", value: "Below 0.5% (BIa)" },
      { label: "Slip resistance", value: "R10 / A+B" },
      { label: "Rectified", value: "Yes" },
      { label: "Shade variation", value: "V1 — uniform" },
      { label: "System parts", value: "Skirting, nosing, 6mm sheet" },
    ],
    related: ["chalk-continuum", "nero-profondo", "peat-monolith"],
  },
  {
    slug: "oatmeal-vessel",
    name: "Oatmeal Vessel",
    collection: "artisan",
    tagline: "Thrown in runs of forty, no two identical.",
    description: [
      "A wide-bellied stoneware vessel finished in our house oatmeal glaze, with the throwing rings left visible on the inside wall.",
      "Each piece is signed underneath by the thrower and dated to the firing.",
    ],
    material: "Hand-thrown stoneware",
    finish: "Glazed",
    finishes: ["Glazed", "Raw"],
    dimensions: "220 mm diameter x 260 mm high",
    thickness: "6 mm wall",
    colours: [
      { name: "Oatmeal", hex: "#d6c7b0" },
      { name: "Ash Glaze", hex: "#b6b0a4" },
    ],
    applications: ["Vessels", "Styling", "Hospitality", "Gifting"],
    price: "EUR 180 each",
    year: 2024,
    cover: {
      id: 6805522,
      alt: "Oatmeal Vessel among a group of ceramic vases in neutral tones",
    },
    alt: {
      id: 6801449,
      alt: "Oatmeal Vessel in a still life with a textured stone block",
    },
    gallery: [
      { id: 7663201, alt: "A simple ceramic pot in soft beige tones" },
      { id: 8987439, alt: "The vessel on a white shelf in daylight" },
      { id: 4207892, alt: "The vessel styled with dried grass on a pedestal" },
    ],
    spec: [
      { label: "Firing", value: "Cone 6 oxidation, 1222 C" },
      { label: "Food safe", value: "Yes, interior glazed" },
      { label: "Dishwasher", value: "Not recommended" },
      { label: "Batch size", value: "40 pieces or fewer" },
      { label: "Signed", value: "Yes, thrower and firing date" },
    ],
    related: ["ash-bowl", "iron-carafe", "amber-field"],
  },
  {
    slug: "ash-bowl",
    name: "Ash Bowl",
    collection: "artisan",
    tagline: "A serving bowl glazed with wood ash from the kiln.",
    description: [
      "The glaze is mixed with ash collected from our own wood firings, which gives a soft grey-green break over the rim where it runs thinnest.",
      "Because the ash changes with the season, each run of Ash Bowl differs slightly from the last.",
    ],
    material: "Hand-thrown stoneware",
    finish: "Satin",
    finishes: ["Satin", "Glazed"],
    dimensions: "320 mm diameter x 110 mm high",
    thickness: "7 mm wall",
    colours: [
      { name: "Ash Glaze", hex: "#b6b0a4" },
      { name: "Celadon", hex: "#a8b2a2" },
    ],
    applications: ["Tableware", "Serving", "Hospitality", "Styling"],
    price: "EUR 145 each",
    year: 2024,
    cover: {
      id: 6945266,
      alt: "Ash Bowl, a minimalist stoneware bowl on a concrete surface",
    },
    alt: {
      id: 7578303,
      alt: "Hands holding the rustic Ash Bowl against a grey ground",
    },
    gallery: [
      { id: 6739690, alt: "Nesting bowls arranged on a marble surface" },
      { id: 11065504, alt: "The bowl with a matching plate and mug" },
      { id: 3847451, alt: "An arrangement of studio bowls, cups and plates" },
    ],
    spec: [
      { label: "Firing", value: "Cone 6 oxidation, 1222 C" },
      { label: "Food safe", value: "Yes" },
      { label: "Dishwasher", value: "Not recommended" },
      { label: "Batch size", value: "40 pieces or fewer" },
      { label: "Signed", value: "Yes, thrower and firing date" },
    ],
    related: ["oatmeal-vessel", "iron-carafe", "chalk-continuum"],
  },
  {
    slug: "iron-carafe",
    name: "Iron Carafe",
    collection: "artisan",
    tagline: "A dark carafe with an unglazed foot you can feel.",
    description: [
      "Iron oxide gives this carafe its near-black surface, broken only where the glaze thins over the shoulder.",
      "The foot is left raw so the clay body is visible, and so it does not slide on a set table.",
    ],
    material: "Hand-thrown stoneware",
    finish: "Glazed",
    finishes: ["Glazed", "Raw"],
    dimensions: "120 mm diameter x 240 mm high",
    thickness: "5 mm wall",
    colours: [
      { name: "Iron", hex: "#3a332e" },
      { name: "Oatmeal", hex: "#d6c7b0" },
    ],
    applications: ["Tableware", "Serving", "Hospitality", "Gifting"],
    price: "EUR 165 each",
    year: 2023,
    cover: {
      id: 31203858,
      alt: "Iron Carafe among handmade ceramic pots with a dark finish",
    },
    alt: {
      id: 9736720,
      alt: "Iron Carafe with brown-glazed pots on a wooden table",
    },
    gallery: [
      { id: 28486203, alt: "Handcrafted mug in earthy brown tones" },
      { id: 31203863, alt: "Earthenware pieces with a metallic finish" },
      { id: 28486217, alt: "An organic-shaped cup with a rustic glaze" },
    ],
    spec: [
      { label: "Firing", value: "Cone 6 oxidation, 1222 C" },
      { label: "Food safe", value: "Yes, interior glazed" },
      { label: "Dishwasher", value: "Not recommended" },
      { label: "Capacity", value: "Approximately 900 ml" },
      { label: "Signed", value: "Yes, thrower and firing date" },
    ],
    related: ["ash-bowl", "oatmeal-vessel", "sienna-extrude"],
  },
];

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const productsByCollection = (slug: string) =>
  PRODUCTS.filter((p) => p.collection === slug);
