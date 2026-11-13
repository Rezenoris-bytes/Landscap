const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SITE = {
  name: "Blue Heaven Landscape",
  short: "BHL",
  tagline: "Feel heaven in every breath.",
  phone: "+91 63806 56237",
  phoneHref: "tel:+916380656237",
  whatsapp: "https://wa.me/916380656237",
  email: "blueheavenlandscape@gmail.com",
  founder: "Tamilarasan",
  region: "Tamil Nadu",
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
  { id: "resorts", name: "Resorts", line: "Arrival, pool decks, lawns and pathways that guests remember.", img: IMG.resortGarden },
  { id: "commercial", name: "Commercial", line: "Offices, hotels, schools and apartments that look cared for every day.", img: IMG.campusPath },
  { id: "homes", name: "Homes", line: "Villas, terraces and balconies that feel calm to come home to.", img: IMG.villa },
];

export const SPACES_MARQUEE = ["Resorts", "Hotels", "Offices", "IT parks", "Schools", "Apartments", "Villas", "Terraces", "Restaurants", "Showrooms"];

export const HOW = [
  { t: "Consultation", d: "Tell us about your space and pick a time. It takes about a minute.", img: IMG.handshake },
  { t: "Site visit", d: "We walk the site with you and check sun, soil, water and how the space is used.", img: IMG.gardener },
  { t: "Design presentation", d: "You see the full design: layout, plants and materials, before any work starts.", img: IMG.plan },
  { t: "Clear quote", d: "A written quote for the design you approved. No hidden extras.", img: IMG.soilBed },
  { t: "Build and handover", d: "Our team builds it, clears the site and hands over working irrigation.", img: IMG.planting },
];

export const PILLARS = [
  ["Seen before it is built", "We listen first, then show you the design. You approve the look before work begins."],
  ["We do not do cheap", "We keep our price fair, but we never lower the quality to win a job."],
  ["Made for first impressions", "For a resort or a business, the landscape is the first thing people see."],
  ["Finished clean", "Straight edges, a tidy site and working irrigation on handover day."],
];

export const PROJECTS = [
  { type: "resort", label: "Resort", name: "[[Resort name, place]]", line: "Arrival lawn, pool deck turf and drip irrigation", img: IMG.resortLawn },
  { type: "commercial", label: "Commercial", name: "[[Office or campus, place]]", line: "Courtyard lawn, living wall in reception", img: IMG.office },
  { type: "home", label: "Home", name: "[[Villa, place]]", line: "Front garden, rock garden and sprinklers", img: IMG.houseLawn },
  { type: "resort", label: "Resort", name: "[[Resort name, place]]", line: "Pathway planting and rock garden slope", img: IMG.poolAerial },
  { type: "commercial", label: "Commercial", name: "[[School or hotel, place]]", line: "Play turf and entrance planting", img: IMG.campusLawn },
  { type: "home", label: "Home", name: "[[Terrace, place]]", line: "Terrace garden with turf and planters", img: IMG.rooftopAerial },
];

export const TESTI = ["resort owner", "facility manager", "home owner"];

export const HOME_FAQ = [
  ["How much does landscaping cost?", "Every site is different, so we do not publish fixed prices. The cost depends on the area, the design, the plants and the irrigation. After a site visit, we give you a clear, fair quote."],
  ["How long does a project take?", "A balcony or small garden can take days. A resort or campus takes longer. You get a clear timeline before work starts."],
  ["Do you install irrigation too?", "Yes. We plan and install it together with the landscape."],
  ["What happens in a consultation?", "We talk about your space and what you want, then plan a site visit. After the visit, we show you a design and a quote."],
  ["Do you look after the garden after handover?", "Garden care is available on request. Every handover also comes with simple care steps for your team or family."],
];

export const FAQ_GROUPS = [
  ["Cost and quotes", [
    ["How much does landscaping cost?", "We do not publish fixed prices, because every site is different. The cost depends on the area, the design, the plants, the materials and the irrigation. After a site visit, we give you a clear, fair quote."],
    ["Why don't you show prices?", "A price without seeing the site would be a guess. We would rather give you one honest number after the visit."],
    ["What if my budget is small?", "We will tell you what good work is possible within it. If it cannot cover the whole space, we suggest what to do first, or give advice only."],
  ]],
  ["Process and time", [
    ["What happens after I book?", "We call to understand your space, then visit your site at the time you picked."],
    ["Will I see the design before you build?", "Always. You approve the design before any work starts."],
    ["How long does a project take?", "From days for a balcony to longer for a resort or campus. You get a timeline before we start."],
  ]],
  ["Services", [
    ["Do you install irrigation?", "Yes. We plan and install it together with the landscape."],
    ["Do you work indoors?", "Yes, for living walls and vertical gardens in lobbies and receptions."],
    ["Can you redo an old garden?", "Yes. We keep what is healthy and plan around it."],
  ]],
  ["Care after handover", [
    ["Do you look after the garden after handover?", "Garden care is available on request. Every project ends with simple care steps, and we stay one call away."],
    ["Who do I call if something goes wrong?", "The same person who ran your project. One contact, from first visit to handover and after."],
  ]],
];

export const NAV = {
  who: [
    { to: "/resorts", label: "Resorts", sub: "Arrival, pool decks, lawns and pathways" },
    { to: "/commercial", label: "Commercial", sub: "Offices, hotels, schools and apartments" },
    { to: "/homes", label: "Homes", sub: "Villas, terraces and balconies" },
  ],
};
