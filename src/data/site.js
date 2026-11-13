const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SITE = {
  name: "Blue Heaven Landscape",
  short: "BHL",
  tagline: "Feel heaven in every breath.",
  phone: "+91 63806 56237",
  phoneHref: "tel:+916380656237",
  whatsapp: "https://wa.me/916380656237",
  email: "hello@blueheavenlandscape.com",
  founder: "Tamilarasan",
  region: "Tamil Nadu",
  hours: "Monday to Saturday, 9 AM to 6 PM",
  cities: "Chennai, Coimbatore, Madurai, Trichy, Salem and beyond (Tamil Nadu). Also Bengaluru, Hyderabad, Mumbai, Delhi.",
};

export const IMG = {
  hero: "/img/bhl-banner.webp",
  moss: "/img/hero.webp",
  resortLawn: u("photo-1776762893034-c437e452f1be"),
  resortGarden: u("photo-1778500442322-12939e0ce87d"),
  resortPath: u("photo-1599685315640-9ceab2f58148"),
  gardenPath: u("photo-1765421528551-2bdcce4ddade"),
  poolTurf: u("photo-1780559146299-2cf95a4ffa82"),
  office: u("photo-1779062553598-80c1240e149c"),
  lobbyWall: u("photo-1761971975065-8e1fcf101303"),
  lobbyPlants: u("photo-1599580546605-a86af98dbdb0"),
  villa: u("photo-1762862170871-159e329ac5a8"),
  houseLawn: u("photo-1598714805247-5dd440d87124"),
  cottageLawn: u("photo-1636301587190-88cbb412fea0"),
  lawn: u("photo-1576897955702-24ad19680db3"),
  terrace: u("photo-1633330948542-0b3bdeefcdb3"),
  balcony: u("photo-1693585576674-2e1b7166f583"),
  vertical: u("photo-1774440602181-a8f2d598c04f"),
  livingWall: u("photo-1604573152847-ca89d57dbb25"),
  rock: u("photo-1761092409160-590d57eb0aaf"),
  irrigation: "https://images.pexels.com/photos/11678428/pexels-photo-11678428.jpeg?auto=compress&cs=tinysrgb&w=1600",
  mossDark: u("photo-1708022772151-26030f4a4ba4"),
  plan: u("photo-1599110906632-28d25094470f"),
  planting: u("photo-1622383563227-04401ab4e5ea"),
  raisedBeds: u("photo-1601001815894-4bb6c81416d7"),
  gardener: u("photo-1637531347055-4fa8aa80c111"),
  resortGate: u("photo-1674657059925-246b46a52a16"),
  resortArch: u("photo-1709307431744-a0144ab25510"),
  tropicalDrive: u("photo-1667365922373-2b5db281d116"),
  eventLawn: u("photo-1523438885200-e635ba2c371e"),
  picnicLawn: u("photo-1620704043184-bc985bebeb8e"),
  rooftopDining: u("photo-1785486250446-b048054c8484"),
  poolUmbrella: u("photo-1778702954718-c9e517540aef"),
  poolAerial: u("photo-1587870306141-4f19861e6c73"),
  palmReflect: u("photo-1507187632231-5beb21a654a2"),
  campusPath: u("photo-1683669623354-82a0edf378a6"),
  campusLawn: u("photo-1725101671209-cf29e5627a24"),
  campusTerraces: u("photo-1685626377770-ae5f42d6ce4f"),
  cafeCourtyard: u("photo-1791542389557-5ae6e4f5466b"),
  apartments: u("photo-1785428497380-5a84e60052cd"),
  rooftopAerial: u("photo-1789374505178-b8b2d85af729"),
  storefront: u("photo-1771948550755-d8f639bcbc26"),
  frontYard: u("photo-1608463123864-40a2961b7d00"),
  cottageGarden: u("photo-1585107328143-be98f5f6119b"),
  dripBed: u("photo-1748432171507-c1d62fe2e859"),
  dripClose: u("photo-1752775312083-1cefe2f93358"),
  sprinklerSunset: u("photo-1770664945615-52203ab54c88"),
  dewGrass: u("photo-1492185244344-91fde303149e"),
  fernDark: u("photo-1596575931579-35d15399567c"),
  fernBlack: u("photo-1533563906091-fdfdffc3e3c4"),
  fernDay: u("photo-1595971348132-009effb2a9b3"),
  hedgeTrim: u("photo-1543309959-4d45288d1629"),
  hedgeCrew: u("photo-1792475247918-9e75c96f8314"),
  handshake: u("photo-1758599543157-bc1a94fec33c"),
  soilBed: u("photo-1779760346345-669a477fa233"),
  succulents: u("photo-1700749284390-54800106c11f"),
  balconyPots: u("photo-1708223578831-5c737a3074ab"),
  fernGravel: u("photo-1776721975504-49ed4993625d"),
  pebbles: u("photo-1768426233888-cdfec671e05f"),
  seedlingHand: u("photo-1615671524827-c1fe3973b648"),
  greenhouse: u("photo-1508857650881-64475119d798"),
  siteWalk: u("photo-1625682693064-a2fdb94b2644"),
  planReview: u("photo-1608303588026-884930af2559"),
  quoteWriting: u("photo-1598368195835-91e67f80c9d7"),
  aiLawn: "/img/ba/lawn-after.webp",
  aiLivingWall: "/img/ba/living-wall-after.webp",
  aiTerrace: "/img/ba/terrace-garden-after.webp",
  aiTurf: "/img/ba/artificial-turf-after.webp",
  aiRock: "/img/ba/rock-garden-after.webp",
  aiVertical: "/img/ba/vertical-garden-after.webp",
  aiIrrigation: "/img/ba/irrigation-after.webp",
};

export const WHO = [
  { id: "resorts", name: "Resorts", line: "Your landscape is part of the guest experience. Entrances, pool decks, cottages and event lawns.", img: IMG.resortGarden },
  { id: "commercial", name: "Commercial properties", line: "Offices, IT parks, hotels, schools, apartments and factories that look cared for every day.", img: IMG.campusPath },
  { id: "homes", name: "Residential", line: "Villas, independent houses, terraces and balconies with the same design process and material standard.", img: IMG.villa },
];

export const SPACES_MARQUEE = ["Resorts", "Hotels", "Offices", "IT parks", "Schools & colleges", "Apartments", "Factories", "Villas", "Rooftops"];

export const STATS = [
  { val: "4+", label: "years in landscaping" },
  { val: "30+", label: "projects completed" },
  { val: "50,000+", label: "sq ft developed" },
  { val: "5+", label: "cities in Tamil Nadu" },
];

export const HOW = [
  { t: "Consultation call", d: "Book online. Our team calls you to understand your space, requirement and timeline.", img: IMG.handshake },
  { t: "Site visit", d: "We visit to measure and check sun, soil, drainage and water. Fee adjusted in project cost.", img: IMG.gardener },
  { t: "Design presentation", d: "Layout, plant list and materials. Up to 3 rounds of corrections before any work starts.", img: IMG.plan },
  { t: "Quotation", d: "Detailed quotation within 1 day of design approval, with full scope and timeline.", img: IMG.soilBed },
  { t: "Development & irrigation", d: "Ground prep, plant installation, hardscape and automated drip irrigation.", img: IMG.planting },
  { t: "Handover & maintenance", d: "Finished site with care instructions. Continue with our 6- or 12-month AMC.", img: IMG.cottageLawn },
];

export const PILLARS = [
  ["You approve the design first", "We present the full design before any work begins, with up to three full rounds of corrections. What you approve is what we deliver."],
  ["The best plants for your place", "We select plants and grass for your sunlight, soil, rainfall and water supply. We promise to source the best plants for your place."],
  ["Clear, competitive quotations", "You get a detailed quotation with every item listed. No hidden costs."],
  ["One team from design to maintenance", "The same team designs, develops, installs the irrigation and maintains your landscape."],
];

export const PROJECTS = [
  { type: "resort", label: "Resort", name: "Resort Lawn & Pool Deck", place: "Coimbatore", line: "Arrival lawn, pool deck turf and automated drip irrigation", img: IMG.resortLawn },
  { type: "commercial", label: "Commercial", name: "IT Park Courtyard & Living Wall", place: "Chennai", line: "Courtyard lawn, living wall in reception lobby", img: IMG.office },
  { type: "home", label: "Residential", name: "Luxury Villa Garden & Rock Garden", place: "Salem", line: "Front garden, natural rock garden and automated sprinklers", img: IMG.houseLawn },
  { type: "resort", label: "Resort", name: "Hilltop Resort Pathways", place: "Ooty", line: "Pathway planting, slope stabilization and rock gardens", img: IMG.poolAerial },
  { type: "commercial", label: "Commercial", name: "International School Campus", place: "Madurai", line: "Play turf, native tree canopy and entrance planting", img: IMG.campusLawn },
  { type: "home", label: "Residential", name: "Penthouse Terrace Garden", place: "Trichy", line: "Terrace garden with turf, planter boxes and drip lines", img: IMG.rooftopAerial },
];

export const TESTI = ["resort owner", "facility manager", "home owner"];

export const HOME_FAQ = [
  ["How much does landscaping cost in Tamil Nadu?", "The cost depends on the area, design, plants, materials and irrigation. Because every site is different, we do not publish fixed prices. You receive a detailed quotation after the site visit and design approval."],
  ["Do you charge for the site visit?", "Yes. We charge a small fee for the site visit, to cover our team's time and travel to your place. If you go ahead with the project, this fee is adjusted in the final project cost."],
  ["How long does a landscaping project take?", "It depends on the size and scope of your project. You receive a clear timeline with the quotation."],
  ["Do you install irrigation?", "Yes. We design and install drip irrigation as part of the landscape, so every bed, planter and green wall gets the right amount of water."],
  ["Do you maintain the landscape after handover?", "Yes. We offer 6-month and 12-month annual maintenance contracts (AMC). Visits are scheduled as committed in your contract."],
  ["Which areas do you serve?", "We work across Tamil Nadu, mainly in Chennai, Coimbatore, Madurai, Trichy and Salem. We also take projects in major metro cities such as Bengaluru, Hyderabad, Mumbai and Delhi."],
];

export const FAQ_GROUPS = [
  ["Cost and quotations", [
    ["How much does landscaping cost in Tamil Nadu?", "The cost depends on the area, design, plants, materials and irrigation. Because every site is different, we do not publish fixed prices. You receive a detailed quotation after the site visit and design approval."],
    ["Do you charge for the site visit?", "Yes. We charge a small fee for the site visit, to cover our team's time and travel to your place. If you go ahead with the project, this fee is adjusted in the final project cost."],
    ["Why don't you show fixed package prices?", "A price without seeing the site would be a guess. We would rather give you one honest, accurate quotation after checking the site."],
    ["What if my budget is smaller than the design?", "We will tell you honestly and suggest what can be phased or built first in priority zones."],
  ]],
  ["Process and timeline", [
    ["What happens after I book a consultation?", "Our team calls you to understand your space, and then we schedule a site visit to measure and check conditions."],
    ["Will I see the design before you build?", "Always. We present the full design before any work begins, with up to three full rounds of corrections."],
    ["How long does a landscaping project take?", "It depends on the size and scope of your project. You receive a clear timeline with the quotation."],
  ]],
  ["Services & Irrigation", [
    ["Do you install irrigation?", "Yes. We design and install automated drip and sprinkler irrigation as part of the landscape."],
    ["Can you install vertical gardens indoors?", "Yes, we install indoor living walls and vertical gardens with lighting and watering designed for interior spaces."],
    ["Can you renovate an existing landscape?", "Yes. We inspect what is already healthy and plan improvements around it."],
  ]],
  ["Maintenance & AMC", [
    ["Do you maintain the landscape after handover?", "Yes. We offer 6-month and 12-month annual maintenance contracts (AMC)."],
    ["Can I start an AMC for a landscape you did not build?", "Yes, subject to inspection and terms. We first assess the condition of your plants and irrigation."],
    ["Who do I contact if an irrigation line needs repair?", "Call or WhatsApp us. Under our AMC, we respond within 24 hours."],
  ]],
];

export const NAV = {
  who: [
    { to: "/resorts", label: "Resorts", sub: "Arrival, pool decks, cottages and event lawns" },
    { to: "/commercial", label: "Commercial properties", sub: "Offices, IT parks, hotels, schools and apartments" },
    { to: "/homes", label: "Residential", sub: "Villas, independent houses, terraces and balconies" },
  ],
};
