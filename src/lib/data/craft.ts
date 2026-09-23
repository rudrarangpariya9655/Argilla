import type { Img } from "@/lib/images";

export type CraftStage = {
  index: string;
  title: string;
  subtitle: string;
  body: string;
  detail: { label: string; value: string }[];
  image: Img;
};

/** The five stages that turn a hillside into a finished surface. */
export const CRAFT_STAGES: CraftStage[] = [
  {
    index: "01",
    title: "Raw Earth",
    subtitle: "Sourcing and blending",
    body: "Everything starts with a body recipe. We blend ball clays for plasticity, kaolin for whiteness and feldspar for the glassy phase that arrives at temperature. Each batch is tested wet before it is allowed anywhere near a press.",
    detail: [
      { label: "Inputs", value: "Ball clay, kaolin, feldspar, quartz" },
      { label: "Tested for", value: "Plasticity, shrinkage, iron content" },
    ],
    image: {
      id: 5950839,
      alt: "Wet clay with a rippled surface, ready for blending",
    },
  },
  {
    index: "02",
    title: "Form",
    subtitle: "Pressing and throwing",
    body: "Architectural bodies are pressed under roughly 450 kg per square centimetre. Studio pieces are thrown by hand on the wheel. Both are the same decision made at different scales: how much pressure a material needs before it holds a shape.",
    detail: [
      { label: "Press force", value: "Approximately 450 kg/cm2" },
      { label: "Studio runs", value: "40 pieces or fewer" },
    ],
    image: {
      id: 20362429,
      alt: "Hands shaping a clay vessel on a spinning pottery wheel",
    },
  },
  {
    index: "03",
    title: "Fire",
    subtitle: "Nineteen hours to 1220 degrees",
    body: "The kiln is where clay stops being clay. Feldspar melts and flows between the harder particles, the body shrinks by around seven per cent, and what leaves the tunnel is porcelain. The curve cannot be rushed.",
    detail: [
      { label: "Peak", value: "1220 C" },
      { label: "Cycle", value: "19 hours, kiln length 96 m" },
    ],
    image: {
      id: 34584522,
      alt: "The glow of a kiln with embers visible through the openings",
    },
  },
  {
    index: "04",
    title: "Glaze",
    subtitle: "Oxides, mixed in-house",
    body: "Our glazes are mixed on site from the same oxides that colour the architectural bodies. That is why a hand-thrown vessel can sit on a pressed surface and look related rather than coincidental.",
    detail: [
      { label: "Mixed", value: "In-house, by batch" },
      { label: "Applied", value: "Dipped, poured or sprayed" },
    ],
    image: {
      id: 9736510,
      alt: "Earthenware plates inside a kiln in a pottery workshop",
    },
  },
  {
    index: "05",
    title: "Finish",
    subtitle: "Rectifying, grading, sequencing",
    body: "Edges are ground square to within a fraction of a millimetre, faces are graded for shade, and slabs destined for bookmatching are sequenced and labelled before they are crated. The last step is the one that shows on site.",
    detail: [
      { label: "Rectified to", value: "Plus or minus 0.2 mm" },
      { label: "Graded by", value: "Shade, calibre, face" },
    ],
    image: {
      id: 15122649,
      alt: "An artisan arranging finished ceramics on studio shelves",
    },
  },
];

export type Texture = {
  name: string;
  finish: string;
  description: string;
  sizes: string[];
  image: Img;
};

/** The "Find Your Surface" sampler. */
export const TEXTURES: Texture[] = [
  {
    name: "Matte",
    finish: "R10 / A+B",
    description:
      "An open, light-absorbing face. The workhorse finish for floors that need to look calm and stay safe underfoot.",
    sizes: ["600 x 600", "1200 x 600", "600 x 1200"],
    image: { id: 6693779, alt: "A matte clay surface in a soft neutral tone" },
  },
  {
    name: "Polished",
    finish: "R9",
    description:
      "Ground and buffed to a mirror. Reserved for walls, worktops and the kind of floor nobody walks on in wet shoes.",
    sizes: ["1200 x 2400", "1600 x 3200"],
    image: { id: 3847492, alt: "A smooth polished marble-effect face" },
  },
  {
    name: "Natural",
    finish: "R10",
    description:
      "The face as it leaves the kiln, with the fine relief of the press tooling still readable across it.",
    sizes: ["1200 x 1200", "900 x 1800", "600 x 1200"],
    image: { id: 4709030, alt: "A natural stone-effect face with soft veining" },
  },
  {
    name: "Textured",
    finish: "R11 / A+B+C",
    description:
      "A deliberately coarse relief for terraces, pool surrounds and any floor that will be wet more often than dry.",
    sizes: ["800 x 800", "600 x 600"],
    image: { id: 33980199, alt: "A coarse textured clay face with visible grain" },
  },
  {
    name: "Satin",
    finish: "R9 / A",
    description:
      "A low sheen that holds depth without glare. Our default recommendation for dark bodies and for bathrooms.",
    sizes: ["1200 x 1200", "1200 x 2400"],
    image: { id: 6952650, alt: "A soft satin surface with a low, even sheen" },
  },
];

/** DEMO figures. Replace with verified, auditable numbers before publishing. */
export const STATS = [
  { value: 25, suffix: "+", label: "Years of craft", note: "Since 1998" },
  { value: 40, suffix: "+", label: "Countries", note: "Specified worldwide" },
  { value: 500, suffix: "+", label: "Surface designs", note: "Across six collections" },
  { value: 1200, suffix: "+", label: "Projects", note: "Residential to civic" },
] as const;

export type Pillar = {
  index: string;
  title: string;
  body: string;
  /** Lucide icon name, resolved in the component. */
  icon: "Mountain" | "Recycle" | "Factory" | "Clock" | "Trash2";
};

/**
 * DEMO sustainability content. These are descriptions of intent and process,
 * deliberately written without unverified quantitative claims. Any figure added
 * here must be backed by an audited source.
 */
export const PILLARS: Pillar[] = [
  {
    index: "01",
    title: "Responsible sourcing",
    body: "We buy clay from a small number of quarries we have visited, and we ask the same questions of each: rehabilitation plan, water use, distance to our works.",
    icon: "Mountain",
  },
  {
    index: "02",
    title: "Recycled material",
    body: "Unfired offcuts and press waste go back into the body blend rather than to landfill. Fired waste is crushed and used as aggregate.",
    icon: "Recycle",
  },
  {
    index: "03",
    title: "Efficient manufacturing",
    body: "Heat from the kiln exhaust is recovered to pre-dry incoming bodies, and the works runs on a metered energy contract we report on annually.",
    icon: "Factory",
  },
  {
    index: "04",
    title: "Long product life",
    body: "The most sustainable surface is one nobody replaces. We keep body recipes in production for a decade or more so a damaged floor can be repaired, not ripped out.",
    icon: "Clock",
  },
  {
    index: "05",
    title: "Reduced waste on site",
    body: "We sequence and label slabs at the factory so installers cut once. Offcuts above a threshold are taken back for crushing.",
    icon: "Trash2",
  },
];
