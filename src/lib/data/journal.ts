import type { Img } from "@/lib/images";

export type Article = {
  slug: string;
  title: string;
  category:
    | "Design"
    | "Architecture"
    | "Material"
    | "Craft"
    | "Projects"
    | "Trends";
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  /** Standfirst shown under the title on the article page. */
  standfirst: string;
  cover: Img;
  body: { heading?: string; paragraphs: string[]; image?: Img }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "why-unglazed-is-harder",
    title: "Why unglazed is the harder tile to make",
    category: "Material",
    date: "2025-06-18",
    author: "Elena Marchetti",
    readTime: "6 min",
    excerpt:
      "A glaze hides a multitude of sins. Take it away and the body has to be right from the first press.",
    standfirst:
      "Glaze is a forgiving material. It covers pinholes, evens out tone and gives a press operator somewhere to hide. An unglazed body has none of that, which is why so few factories make one well.",
    cover: {
      id: 6104788,
      alt: "Close-up of a pale clay body showing its unglazed grain",
    },
    body: [
      {
        paragraphs: [
          "Every ceramic surface starts as a powder. What happens next decides whether the tile will look like a material or like a print of one.",
          "In a glazed tile, the body is a substrate. It can be off-colour, slightly porous, a little uneven, because a layer of glass is going over the top of it. In an unglazed tile the body is the finished face. There is nowhere to put a mistake.",
        ],
      },
      {
        heading: "Colour has to go all the way through",
        paragraphs: [
          "Full-body pigmentation means the colouring oxides are blended into the powder before it ever reaches the press. It costs more, because you are colouring nine millimetres of material to see one.",
          "The payoff arrives on site. A mitred corner shows the same tone as the face. A drilled hole does not reveal a white interior. A chipped edge, three years later, is a chip rather than a defect.",
        ],
        image: {
          id: 33980199,
          alt: "Detail of a fired clay body with natural colour variation",
        },
      },
      {
        heading: "The press does the work",
        paragraphs: [
          "Pressing an unglazed body is a matter of pressure and patience. Too little and the surface stays open and dusty. Too much and you lose the soft grain that makes the tile worth specifying.",
          "Our Earth bodies are pressed at around 450 kg per square centimetre and then fired slowly, because a fast firing puts stress into a body that has no glaze to hold it together.",
        ],
      },
      {
        heading: "What you get for the trouble",
        paragraphs: [
          "An unglazed floor ages rather than wears. Foot traffic polishes it slightly in the routes people actually take, which after a decade gives a room a record of how it has been lived in.",
          "No glazed tile can do that, because the glaze either survives or it does not.",
        ],
      },
    ],
  },
  {
    slug: "large-format-detailing",
    title: "Large format, small details",
    category: "Architecture",
    date: "2025-05-02",
    author: "Tomas Ruiz",
    readTime: "7 min",
    excerpt:
      "A 3200mm slab solves the joint problem and creates four new ones. Here is how the good installers handle them.",
    standfirst:
      "Specifying a six-metre wall with one horizontal joint is easy. Getting it on site, up a stairwell and onto a substrate flat enough to take it is the actual project.",
    cover: {
      id: 7232667,
      alt: "Large-format stone-effect slab photographed close",
    },
    body: [
      {
        paragraphs: [
          "The appeal of a large slab is obvious: fewer joints, fewer interruptions, a wall that reads as one material. The difficulties are less obvious and they all arrive at once.",
        ],
      },
      {
        heading: "The substrate decides everything",
        paragraphs: [
          "A 1600 x 3200 slab will telegraph any deviation greater than about 2mm over two metres. On a plastered wall that usually means a skim and a full re-check before a single tile is lifted.",
          "Budget the time for it. The install itself is fast once the wall is right, and impossible if it is not.",
        ],
        image: {
          id: 4709030,
          alt: "Stone-effect surface with natural veining in warm tones",
        },
      },
      {
        heading: "Plan the cuts before the delivery",
        paragraphs: [
          "Slabs this size are cut on a bridge saw with a rail, usually on site. Every cut is a decision about where the pattern lands, so dry-lay digitally first and mark the sequence on the crate.",
          "On our Marble bodies we label bookmatched pairs at the factory precisely so this step does not happen twice.",
        ],
      },
      {
        heading: "Movement joints are not optional",
        paragraphs: [
          "Large formats move. Perimeter joints of 8mm, kept clear of adhesive and filled with a flexible sealant, are the difference between a wall that lasts and a wall that tents in its second summer.",
          "This is the detail that gets value-engineered out most often, and it is the one that comes back.",
        ],
      },
    ],
  },
  {
    slug: "reading-a-glaze",
    title: "How to read a glaze",
    category: "Craft",
    date: "2025-03-27",
    author: "Elena Marchetti",
    readTime: "5 min",
    excerpt:
      "Pooling, breaking, crazing, pinholing. A short field guide to what a glazed surface is telling you.",
    standfirst:
      "Glaze is glass that has been persuaded to stay on a curved surface. Everything interesting about it happens while it is molten, and everything you can see is the record of that.",
    cover: {
      id: 28486217,
      alt: "Organic ceramic cup with a rustic glaze on soft fabric",
    },
    body: [
      {
        paragraphs: [
          "Hold a hand-glazed piece up to a window and you can usually reconstruct how it was made. Here is what to look for.",
        ],
      },
      {
        heading: "Breaking",
        paragraphs: [
          "Where a glaze runs thin over an edge or a throwing ring, the colour beneath shows through. Potters call this breaking, and on our Ash Bowl it is the whole point: the rim goes pale grey-green while the well stays dark.",
          "A glaze that breaks well is difficult to formulate and easy to ruin with one extra dip.",
        ],
        image: {
          id: 6945266,
          alt: "Minimalist stoneware bowl on a textured concrete surface",
        },
      },
      {
        heading: "Pooling",
        paragraphs: [
          "Glaze moves downhill while molten. In the base of a bowl it gathers and fires deeper and glossier than the walls. A little is beautiful. A lot means the piece was over-dipped or fired too hot.",
        ],
      },
      {
        heading: "Crazing",
        paragraphs: [
          "The fine crackle you sometimes see is the glaze and the body shrinking at different rates as they cool. On decorative work it is a finish. On tableware it is a fault, because food gets into the cracks.",
          "We adjust our glaze fit for every new clay body specifically to keep this off anything that will hold food.",
        ],
      },
    ],
  },
  {
    slug: "colour-of-a-room",
    title: "The colour of a room is the floor",
    category: "Design",
    date: "2025-02-11",
    author: "Sofia Lindqvist",
    readTime: "4 min",
    excerpt:
      "Wall colour gets the attention. The floor decides what the light in a room actually does.",
    standfirst:
      "Most rooms are lit from the side and read from the middle. That makes the floor the single largest reflector in the space, and the surface that sets everything else.",
    cover: {
      id: 17885652,
      alt: "Minimal interior wall with sunlight through an arched opening",
    },
    body: [
      {
        paragraphs: [
          "Paint a room white and lay a dark floor and the walls will read grey by mid-afternoon. Lay a warm clay floor under the same paint and the walls turn cream. The paint has not changed.",
        ],
      },
      {
        heading: "Start at the bottom",
        paragraphs: [
          "We suggest choosing the floor before anything else, then holding paint samples against it at three times of day. The floor is the constant; everything above it is a response.",
        ],
        image: {
          id: 6800930,
          alt: "Minimalist chair against a neutral wall above a warm floor",
        },
      },
      {
        heading: "Matte floors, softer rooms",
        paragraphs: [
          "A polished floor throws light in one direction and creates hotspots. A matte body scatters it, which is why rooms with unglazed floors feel evenly lit even when they are not.",
          "In north-facing rooms this matters more than the colour you choose.",
        ],
      },
    ],
  },
  {
    slug: "inside-the-kiln",
    title: "Nineteen hours inside the kiln",
    category: "Craft",
    date: "2024-12-04",
    author: "Tomas Ruiz",
    readTime: "8 min",
    excerpt:
      "What actually happens to a pressed tile between room temperature and 1220 degrees.",
    standfirst:
      "A firing curve is a long, boring document that decides whether a tile is a tile or a pile of fragments. We spent a shift watching one.",
    cover: {
      id: 34584522,
      alt: "The warm glow of a kiln with embers visible through openings",
    },
    body: [
      {
        paragraphs: [
          "The kiln at our Sassuolo works is a roller hearth, 96 metres long. A tile enters cold at one end and leaves finished at the other, and in between it passes through five distinct events.",
        ],
      },
      {
        heading: "Drying, to 200 degrees",
        paragraphs: [
          "Whatever water is left in the pressed body leaves now. Rush this and the body cracks from the inside, which you will not discover until it is much too late.",
        ],
        image: {
          id: 9736509,
          alt: "Warm-toned ceramic plates stacked inside a kiln before firing",
        },
      },
      {
        heading: "Burnout, 200 to 600 degrees",
        paragraphs: [
          "Organic material in the clay burns off. If the kiln atmosphere is short of oxygen here, carbon stays trapped and the finished tile carries a grey core that will show at any cut edge.",
        ],
      },
      {
        heading: "Vitrification, 900 to 1220 degrees",
        paragraphs: [
          "This is where the tile becomes porcelain. Feldspars melt and flow into the gaps between the harder particles, and the body shrinks by around seven per cent.",
          "Every dimension on our spec sheets is a post-shrinkage figure. The press tooling is cut oversize to account for it.",
        ],
      },
      {
        heading: "Cooling, and the quartz inversion",
        paragraphs: [
          "At 573 degrees on the way down, the quartz in the body changes crystal structure and abruptly changes volume. Cool through that window too fast and the tile splits.",
          "It is the single most-watched number on the control panel, and the reason a nineteen-hour cycle cannot be shortened to twelve.",
        ],
      },
    ],
  },
  {
    slug: "specifying-for-forty-years",
    title: "Specifying for forty years, not four",
    category: "Projects",
    date: "2024-10-22",
    author: "Sofia Lindqvist",
    readTime: "6 min",
    excerpt:
      "The questions worth asking before a surface goes into a building you will not be maintaining.",
    standfirst:
      "Most specification decisions are made against a mood board and a budget. A few simple questions at the start change what the building looks like a decade later.",
    cover: {
      id: 10486271,
      alt: "A kitchen with a large-format stone-effect surface",
    },
    body: [
      {
        paragraphs: [
          "We are asked to help specify surfaces for buildings we will never visit again. These are the questions we ask first.",
        ],
      },
      {
        heading: "Will anyone ever match this tile?",
        paragraphs: [
          "If a floor is damaged in year seven, can a replacement be bought? Ranges get discontinued. Ask how long a body has been in production, not how new it is.",
          "Our Terracotta range has run since 2016 with the same body recipe for exactly this reason.",
        ],
        image: {
          id: 36090539,
          alt: "Stacked terracotta pieces in a production workshop",
        },
      },
      {
        heading: "What does it look like dirty?",
        paragraphs: [
          "Every surface gets dirty. The useful question is whether it reads as patina or as neglect. Mid-tone, textured bodies hide traffic. High-gloss dark surfaces do not.",
        ],
      },
      {
        heading: "Who is cleaning it, and with what?",
        paragraphs: [
          "A hotel floor will be cleaned nightly by a contractor with whatever is on the trolley. Specify a body that tolerates a wide range of pH, or accept that it will be stripped of its finish within two years.",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);
