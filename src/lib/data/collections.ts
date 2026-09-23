import type { Img } from "@/lib/images";

export type Collection = {
  slug: string;
  name: string;
  /** Short line used on cards and in the menu. */
  strapline: string;
  description: string;
  /** Long-form intro on the collection detail page. */
  story: string[];
  year: number;
  productCount: number;
  palette: string[];
  finishes: string[];
  formats: string[];
  hero: Img;
  cover: Img;
  gallery: Img[];
};

export const COLLECTIONS: Collection[] = [
  {
    slug: "earth",
    name: "Earth",
    strapline: "Unglazed bodies, pressed and left honest.",
    description:
      "Raw clay surfaces with an open, matte grain. The colour runs through the body, so every cut edge reads the same as the face.",
    story: [
      "Earth began with a question from an architect in Lisbon: could a floor look like the ground it replaced? We spent two years pressing unglazed bodies until the answer stopped feeling like a compromise.",
      "Each tile is full-body pigmented, which means the tone is not a coating but the material itself. Chip it, cut it, mitre it, and the colour holds. It is the quietest range we make and, by some distance, the most specified.",
    ],
    year: 2019,
    productCount: 14,
    palette: ["Ash", "Millstone", "Dune", "Peat"],
    finishes: ["Matte", "Natural", "Textured"],
    formats: ["600 x 600", "800 x 800", "1200 x 600"],
    hero: {
      id: 6104788,
      alt: "Close-up of a pale kaolin clay surface showing its natural grain",
    },
    cover: {
      id: 6693779,
      alt: "Abstract clay wall in neutral tones with a soft textured finish",
    },
    gallery: [
      {
        id: 33980199,
        alt: "Adobe brick texture with natural imperfections in warm earth tones",
      },
      { id: 8063829, alt: "Textured clay surface with swirling tonal patterns" },
      {
        id: 17885652,
        alt: "Minimal interior wall with sunlight falling through an arched opening",
      },
      { id: 5950839, alt: "Wet clay with a rippled surface catching low light" },
    ],
  },
  {
    slug: "stone",
    name: "Stone",
    strapline: "Quarry depth without the quarry.",
    description:
      "Large-format porcelain that reads as cut stone, with grain, fleck and shadow, at a fraction of the weight and none of the sealing.",
    story: [
      "Stone is our answer to a practical problem: designers wanted the depth of quarried material on walls that could not carry it. We scanned six stone faces, then rebuilt them as porcelain bodies with matched variation across four faces.",
      "The result holds up close, which is where most stone-effect surfaces fail. Slabs run to 1600 x 3200 for near-seamless walls, and every batch is shade-matched at the press.",
    ],
    year: 2021,
    productCount: 11,
    palette: ["Grey Mist", "Basalt", "Travertine", "Slate"],
    finishes: ["Natural", "Satin", "Polished"],
    formats: ["1200 x 1200", "1600 x 3200", "900 x 1800"],
    hero: {
      id: 7232667,
      alt: "Speckled stone surface photographed close, showing natural mineral detail",
    },
    cover: { id: 7599796, alt: "Rough stone surface in warm earthy tones" },
    gallery: [
      { id: 6104932, alt: "Textured grey cement wall surface" },
      { id: 4709030, alt: "Natural stone with beige and brown veining" },
      {
        id: 7166562,
        alt: "Contemporary kitchen with a stone counter and undercounter sink",
      },
      {
        id: 4705932,
        alt: "Marble surface with unique patterning in earthy tones",
      },
    ],
  },
  {
    slug: "terracotta",
    name: "Terracotta",
    strapline: "Fired clay with the kiln still in it.",
    description:
      "Warm, hand-finished bodies in the old Mediterranean register: irregular edge, variable tone, unmistakably fired.",
    story: [
      "Terracotta is the range our kiln crew argue over most. Each batch shifts slightly with the firing, and we let it. Tone variation is specified as a feature, not a tolerance.",
      "Extruded in three thicknesses for floors, walls and facades, it weathers the way fired clay is meant to: slowly, and better for it.",
    ],
    year: 2016,
    productCount: 9,
    palette: ["Sienna", "Rosso", "Amber", "Clay"],
    finishes: ["Natural", "Matte"],
    formats: ["200 x 200", "300 x 150", "600 x 300"],
    hero: {
      id: 39485802,
      alt: "Stacked terracotta roof tiles showing texture and repetition",
    },
    cover: {
      id: 36090539,
      alt: "Stacked terracotta pots in a pottery workshop",
    },
    gallery: [
      {
        id: 31483307,
        alt: "Square window set into a terracotta wall with greenery reflected",
      },
      {
        id: 17166669,
        alt: "Colonial-style window on a warm terracotta facade",
      },
      {
        id: 38302904,
        alt: "Brick wall with terracotta pots set into geometric alcoves",
      },
      { id: 7399421, alt: "Handmade clay pots drying in outdoor sunlight" },
    ],
  },
  {
    slug: "marble",
    name: "Marble",
    strapline: "Veining drawn, not printed.",
    description:
      "Porcelain slabs with vein structures modelled through the body, so bookmatched joints line up and mitres never break the story.",
    story: [
      "Most marble-effect porcelain gives itself away at the edge. Ours carries vein through the depth of the slab, which means mitred corners and waterfall counters continue the pattern instead of interrupting it.",
      "Six faces per design, sequenced so a wall of forty tiles never repeats within eye-line.",
    ],
    year: 2022,
    productCount: 8,
    palette: ["Bianco", "Calacatta Warm", "Pietra Grigia", "Nero"],
    finishes: ["Polished", "Satin", "Natural"],
    formats: ["1200 x 2400", "1600 x 3200", "600 x 1200"],
    hero: {
      id: 4709481,
      alt: "Light marble texture with intricate natural patterning",
    },
    cover: {
      id: 6952650,
      alt: "Beige marble surface with soft natural patterning",
    },
    gallery: [
      { id: 3847492, alt: "Smooth white marble texture" },
      {
        id: 4207891,
        alt: "Marble table with a white ceramic vase and decorative leaves",
      },
      {
        id: 4138128,
        alt: "Black shower fittings beside a curved white bathtub in a bright bathroom",
      },
      {
        id: 4705932,
        alt: "Marble surface showing unique patterns in earthy tones",
      },
    ],
  },
  {
    slug: "minimal",
    name: "Minimal",
    strapline: "One tone, wall to floor, no seam in sight.",
    description:
      "A monolithic system of matched surfaces: floor, wall, skirting and step in a single continuous tone.",
    story: [
      "Minimal is less a collection than a kit of parts. Twelve neutrals, each available as floor tile, wall tile, coved skirting, stair nosing and 6mm sheet for wrapping joinery.",
      "Specified correctly, a room can be built entirely from one reference. That was the brief, and it is the whole of the idea.",
    ],
    year: 2023,
    productCount: 12,
    palette: ["Chalk", "Greige", "Fog", "Graphite"],
    finishes: ["Matte", "Satin", "Natural"],
    formats: ["600 x 1200", "1200 x 1200", "300 x 600"],
    hero: {
      id: 9992549,
      alt: "Beige ceramic tiled wall with a single light switch",
    },
    cover: {
      id: 7587747,
      alt: "Sleek bathroom with textured walls and a glass shower",
    },
    gallery: [
      { id: 6800930, alt: "Minimalist wicker chair against a neutral wall" },
      {
        id: 8134805,
        alt: "Spacious bathroom with a sleek bath and clean tiling",
      },
      { id: 37895793, alt: "Slim gold tap against a smooth beige wall" },
      { id: 5793642, alt: "Minimalist interior with a mirror, vase and lamp" },
    ],
  },
  {
    slug: "artisan",
    name: "Artisan",
    strapline: "Thrown by hand, signed by the maker.",
    description:
      "Small-batch vessels and glazed objects from the studio floor, the range where our surface work started.",
    story: [
      "Before we pressed a single tile, we threw pots. Artisan keeps that line running: bowls, vessels and serving pieces made in runs of forty or fewer by three throwers in the Sassuolo studio.",
      "Glazes are mixed in-house from the same oxides that colour our architectural bodies, which is why a vessel can sit on a surface from any other collection and look related rather than matched.",
    ],
    year: 1998,
    productCount: 16,
    palette: ["Oatmeal", "Ash Glaze", "Iron", "Celadon"],
    finishes: ["Glazed", "Satin", "Raw"],
    formats: ["120mm", "220mm", "320mm"],
    hero: {
      id: 6805522,
      alt: "A curated assortment of ceramic vases in neutral tones",
    },
    cover: {
      id: 6611418,
      alt: "Handcrafted ceramic cups and bowls displayed on wooden shelves",
    },
    gallery: [
      {
        id: 28486217,
        alt: "Organic-shaped ceramic cup with a rustic glaze on soft fabric",
      },
      {
        id: 9736720,
        alt: "Handmade ceramic pots with a rich brown glaze on a wooden table",
      },
      { id: 13575092, alt: "Overhead view of stacked ceramic mugs and jugs" },
      {
        id: 29286722,
        alt: "Rows of handmade ceramic cups and bowls on rustic studio shelves",
      },
    ],
  },
];

export const collectionBySlug = (slug: string) =>
  COLLECTIONS.find((c) => c.slug === slug);
