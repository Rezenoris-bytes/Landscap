import { IMG } from "./site";

export const SERVICES = [
  {
    id: "vertical-garden",
    name: "Vertical garden",
    short: "Wall-mounted plant systems with built-in watering, for balconies, compound walls and building fronts.",
    img: IMG.vertical,
    h1: "Vertical garden services in Tamil Nadu",
    title: "Vertical garden services in Tamil Nadu | Blue Heaven",
    desc: "Vertical garden services in Tamil Nadu for balconies, compound walls and building fronts, with built-in irrigation. Book a consultation with BHL.",
    tags: ["Balconies", "Compound walls", "Interiors", "Building fronts"],
    answer: "A vertical garden is a system of plants fixed to a wall in panels or pots, with a built-in drip watering line. It adds greenery indoors or outdoors, where there is no floor space. BHL checks the wall, chooses plants for the light it receives, installs the frame and irrigation, and hands over with a care schedule.",
    suits: [
      "Balconies and small terraces",
      "Compound and boundary walls",
      "Indoor walls in homes, offices and receptions",
      "Courtyards and corridors",
      "Shop fronts and building fronts"
    ],
    get: [
      "Wall check for strength, moisture and light",
      "Frame and planter installation",
      "Plant selection for the wall's light",
      "Built-in drip irrigation",
      "Care instructions at handover"
    ],
    steps: [
      ["Wall check", "We check light, wall strength and where water will drain."],
      ["Plant plan", "We choose plants and the planting pattern, and share it with you for approval."],
      ["Installation", "We fix the frame, irrigation line and plants."],
      ["Testing and handover", "We test the watering and show you what to check."]
    ],
    options: [
      ["Outdoor vertical garden", "Hardy plants for sun and rain, for balconies, compound walls and building fronts."],
      ["Indoor vertical garden", "Plants that grow well in low light, for living rooms, offices, receptions and corridors. Plant lights can be added where needed."]
    ],
    cost: ["Wall size", "Indoor or outdoor location", "Plant selection", "Type of frame and irrigation"],
    care: "A vertical garden needs regular checks of its irrigation, light trimming to keep the shape, and replacement of any plant that struggles. Our AMC covers these checks.",
    faq: [
      ["Will a vertical garden damage my wall?", "No. The system is mounted with a small air gap behind the frame, and drainage is directed away from the wall."],
      ["How much light does a vertical garden need?", "It depends on the plants. We select plants based on the sunlight your wall gets, from direct sun to deep shade."],
      ["How is the vertical garden watered?", "A built-in drip irrigation system waters each plant at its roots, on a timer."],
      ["What is the difference between a vertical garden and a living wall?", "A vertical garden is typically a modular or pot-based wall garden suited to residential balconies and smaller walls. A living wall is an engineered, continuous plant installation designed as a large-scale architectural feature for lobbies, receptions and facades."]
    ],
    guide: "living-wall-vs-vertical-garden"
  },
  {
    id: "living-wall",
    name: "Living wall",
    short: "Large plant walls with built-in irrigation for hotel lobbies, office receptions and building entrances.",
    img: IMG.lobbyWall,
    h1: "Living walls for lobbies, receptions and entrances",
    title: "Living walls in Tamil Nadu | Blue Heaven Landscape",
    desc: "Living walls for hotel lobbies, office receptions and resort entrances in Tamil Nadu, with built-in irrigation. Book a consultation with BHL.",
    tags: ["Lobbies", "Receptions", "Entrances", "Feature walls"],
    answer: "A living wall is a large, engineered wall covered with real, growing plants, designed as an architectural feature for lobbies, receptions, restaurants and entrances. BHL designs each wall for the light in the space, installs the frame and drip watering, and offers maintenance so it stays green and healthy.",
    suits: [
      "Hotel and resort lobbies",
      "Office and IT park receptions",
      "Restaurant and cafe feature walls",
      "Building entrances and facades"
    ],
    get: [
      "Design created for your space and lighting",
      "Engineered frame and waterproofing barrier",
      "Plants chosen for the light, indoors or outdoors",
      "Automated drip irrigation and drainage",
      "Care plan and AMC options"
    ],
    steps: [
      ["Space study", "We check the light, wall size, wall strength and how people will see the wall."],
      ["Design presentation", "We present the plant pattern and how it will look, with up to three rounds of corrections."],
      ["Installation", "We install the structure, irrigation, drainage and plants."],
      ["Handover", "We test the system and agree a care plan with your team."]
    ],
    options: [
      ["Indoor living wall", "For lobbies and receptions, with plants that suit indoor light. Plant lights can be added where needed."],
      ["Outdoor living wall", "For entrances and facades, with plants suited to sun and rain."]
    ],
    cost: ["Wall size", "Indoor or outdoor location", "Plant mix and pattern", "Irrigation, drainage and lighting"],
    care: "A living wall needs regular checks of its irrigation and trimming to keep the pattern neat. Our AMC covers these checks.",
    faq: [
      ["Does a living wall need sunlight?", "Outdoor walls use plants that like sun. Indoor walls use low-light plants, and plant lights can be added where natural light is limited."],
      ["Will a living wall leak?", "It is built with drainage that keeps water away from the wall and floor."],
      ["How long does a living wall last?", "With regular care, a living wall stays full for many years."],
      ["Can you maintain it for us?", "Yes, through our 6-month or 12-month maintenance contract."]
    ],
    guide: "living-wall-vs-vertical-garden"
  },
  {
    id: "terrace-garden",
    name: "Terrace garden",
    short: "Rooftop gardens for homes, offices, hotels and restaurants, planned around roof load and drainage.",
    img: IMG.terrace,
    h1: "Terrace garden services in Tamil Nadu",
    title: "Terrace garden services in Tamil Nadu | Blue Heaven",
    desc: "Terrace garden services in Tamil Nadu for homes, offices, hotels and restaurants. Roof load and drainage checked before design. Book a consultation.",
    tags: ["Rooftops", "Terraces", "Cafes", "Homes"],
    answer: "A terrace garden is a garden built on a rooftop, using planters, raised beds, lawn or artificial turf, and an irrigation system. Before designing one, BHL checks how much weight the roof can carry, how water drains and the condition of the waterproofing. The design is then planned to suit the roof.",
    suits: [
      "Homes, villas and apartments",
      "Office rooftops and break-out terraces",
      "Hotel and resort rooftops",
      "Rooftop restaurants and cafes"
    ],
    get: [
      "Roof load, drainage and waterproofing check",
      "Layout plan you approve first",
      "Planters, soil mix and plants",
      "Lawn or artificial turf where suitable",
      "Drip irrigation system",
      "Care schedule at handover"
    ],
    steps: [
      ["Roof check", "We check the load capacity, drainage and waterproofing."],
      ["Design presentation", "We show you where plants, turf, seating and paths go, with up to three rounds of corrections."],
      ["Installation", "We place planters, soil mix, irrigation and plants."],
      ["Handover", "We test the watering and explain the care schedule."]
    ],
    options: [
      ["Light terrace garden", "Pots, planters and artificial turf for roofs with lower load capacity."],
      ["Full terrace garden", "Raised beds, lawn, seating and larger plants where the roof structure allows it."]
    ],
    cost: ["Terrace size", "Roof load capacity", "Planters and materials", "Plants and irrigation"],
    care: "Keep drains clear of fallen leaves, check the irrigation weekly and protect plants during peak summer heat. Our AMC covers terrace garden care.",
    faq: [
      ["Is a terrace garden safe for my roof?", "Yes, when roof load, drainage and waterproofing are checked first. We verify all three before designing."],
      ["Will a terrace garden cause water leaks?", "No, as long as waterproofing is intact and drainage is not blocked. We inspect the roof surface before installation."],
      ["Can I grow lawn grass on a terrace?", "Yes, if the roof can take the weight of soil and water. Where load is limited, artificial turf is a lightweight alternative."]
    ],
    guide: "terrace-garden-roof-safety"
  },
  {
    id: "lawn",
    name: "Lawn",
    short: "Natural grass lawns for resorts, commercial properties and homes, laid on properly prepared soil.",
    img: IMG.lawn,
    h1: "Lawn services in Tamil Nadu",
    title: "Lawn services in Tamil Nadu | Blue Heaven Landscape",
    desc: "Lawn services in Tamil Nadu for resorts, offices and homes, with soil preparation, grass selection and irrigation. Book a consultation with BHL.",
    tags: ["Event lawns", "Campuses", "Courtyards", "Villas"],
    answer: "A lawn service by BHL includes a soil and site check, soil preparation and levelling, choosing the right grass for your sunlight and use, laying the grass, edging and installing irrigation. We develop lawns for event spaces, campuses, courtyards and home gardens across Tamil Nadu, with maintenance contracts available after handover.",
    suits: [
      "Resort lawns and outdoor event spaces",
      "Office courtyards and campus grounds",
      "Clubhouses and apartment common areas",
      "Home and villa gardens"
    ],
    get: [
      "Soil checked, prepared and levelled",
      "Grass selected for your sunlight, shade and use",
      "Clean edging along paths and beds",
      "Irrigation planned with the lawn",
      "Care instructions at handover"
    ],
    steps: [
      ["Site study", "We check sunlight, shade, soil, slope and how the lawn will be used."],
      ["Ground preparation", "We clear, level and enrich the soil so the grass roots well."],
      ["Laying the grass", "We lay the grass evenly, with clean edges along paths and beds."],
      ["Watering and handover", "We set the irrigation and give you a care schedule."]
    ],
    options: [
      ["Mexican grass", "A fine-textured grass that suits sunny lawns and gardens."],
      ["Bermuda grass", "A hardy grass that handles heavy foot traffic, good for event spaces and sports areas."],
      ["Shade-tolerant grass", "For courtyards and areas with partial tree shade."]
    ],
    cost: ["Lawn area", "Soil preparation and levelling needed", "Grass type", "Irrigation system"],
    care: "A new lawn needs regular watering in the first few weeks while the roots settle. After that, water early in the morning, mow regularly and feed the lawn every few months. Most lawn problems come from too much or too little water. Our AMC covers mowing, feeding, pest checks and irrigation checks.",
    faq: [
      ["How long does a lawn take to develop?", "It depends on the size and scope of your project. You receive a clear timeline with the quotation."],
      ["When can we walk on a new lawn?", "After the roots settle. We confirm the exact time at handover."],
      ["Which grass is best for my site?", "It depends on sunlight, shade and use. We recommend the grass after the site visit."],
      ["How often should a lawn be watered?", "It depends on the season and soil. Watering early in the morning reduces water loss."],
      ["Why do lawns turn yellow?", "The most common causes are overwatering, underwatering, poor soil and too much shade. Read our guide on yellow lawns."]
    ],
    guide: "why-is-my-lawn-turning-yellow"
  },
  {
    id: "artificial-turf",
    name: "Artificial turf",
    short: "Synthetic grass for pool decks, play areas, rooftops and shaded areas where natural grass struggles.",
    img: IMG.poolTurf,
    h1: "Artificial turf services in Tamil Nadu",
    title: "Artificial turf services in Tamil Nadu | Blue Heaven",
    desc: "Artificial turf services in Tamil Nadu for pool decks, play areas, rooftops and shaded areas. Low water use and no mowing. Book a consultation.",
    tags: ["Pool decks", "Play areas", "Rooftops", "Shaded spots"],
    answer: "Artificial turf is a synthetic grass surface that stays green all year without mowing and with very little water. It suits pool decks, play areas, rooftops and shaded spots. BHL prepares and levels the base, adds drainage, and lays and joins the turf for a flat, clean finish.",
    suits: [
      "Pool decks",
      "Play areas and schools",
      "Rooftops and terraces",
      "Shaded areas and courtyards"
    ],
    get: [
      "Site check and base preparation",
      "Levelling and compaction",
      "Drainage layer",
      "Turf chosen for use and foot feel",
      "Clean joins and edges",
      "Care instructions at handover"
    ],
    steps: [
      ["Site study", "We check use, sun, drainage and the sub-base."],
      ["Base preparation", "We level and compact the base so the turf stays flat."],
      ["Laying the turf", "We lay, join and edge the turf neatly."],
      ["Handover", "A final brush and simple care instructions."]
    ],
    options: [
      ["Landscape turf", "Natural-looking turf with varied pile heights for gardens, rooftops and pool surrounds."],
      ["Play turf", "High-density, durable turf for play areas and schools."]
    ],
    cost: ["Area", "Base preparation needed", "Turf pile height and density", "Drainage and edging"],
    care: "Brush occasionally to keep the pile upright, rinse off dust and remove fallen leaves. No mowing, no fertilising and no regular watering required.",
    faq: [
      ["Does artificial turf get hot in summer?", "Yes, in direct sun during peak hours. In high-heat areas, we suggest shade structures, surrounding planting, or natural grass."],
      ["Can artificial turf be used around swimming pools?", "Yes. It drains fast, does not become muddy and does not drop grass clippings into the pool filter."],
      ["How long does artificial turf last?", "High-quality turf lasts 7 to 10 years with basic maintenance."]
    ],
    guide: "grass-or-turf-pool-deck"
  },
  {
    id: "rock-garden",
    name: "Rock garden",
    short: "Stone, pebble and hardy plant landscapes for slopes, entrances and dry zones that need little water.",
    img: IMG.rock,
    h1: "Rock garden services in Tamil Nadu",
    title: "Rock garden services in Tamil Nadu | Blue Heaven",
    desc: "Rock garden services in Tamil Nadu with stone, pebbles and drought-tolerant plants. Low water use and a natural look. Book a consultation with BHL.",
    tags: ["Slopes", "Entrances", "Pathways", "Low water"],
    answer: "A rock garden combines natural stone, pebbles, gravel and drought-tolerant plants to create a low-water, natural-looking landscape. It suits slopes, dry areas, entrances and spaces where a lawn is difficult to maintain. BHL designs the layout, sources stone and plants, and installs weed control beneath the stones.",
    suits: [
      "Slopes and uneven ground",
      "Dry corners and entrances",
      "Resort pathways and median strips",
      "Low-maintenance home gardens"
    ],
    get: [
      "Design layout you approve first",
      "Stone, boulders and pebbles sourced for your look",
      "Drought-tolerant plants suited to the stone layout",
      "Weed control membrane under the stones",
      "Drip irrigation for the plants",
      "Care instructions at handover"
    ],
    steps: [
      ["Site study", "We check slope, sunlight, drainage and the style you want."],
      ["Design presentation", "We show where boulders, pebbles, plants and pathways go."],
      ["Installation", "We prepare the base, lay weed barrier, place stones and plant."],
      ["Handover", "We test the irrigation and explain care steps."]
    ],
    options: [
      ["Natural boulder garden", "Larger rocks and hardy plants for slopes and natural landscapes."],
      ["Pebble and gravel garden", "Neat pebble beds with accent plants, suited to courtyards and entrances."],
      ["Dry creek bed", "A river-rock feature that doubles as surface drainage during heavy rain."]
    ],
    cost: ["Area", "Stone type, size and quantity", "Plant selection", "Base preparation and weed barrier"],
    care: "Remove weeds promptly, rinse dust off pebbles occasionally, and check drip lines for the plants. Rock gardens need very little regular maintenance.",
    faq: [
      ["Does a rock garden need watering?", "Only the plants need water, and we select drought-hardy species. Drip irrigation keeps water use minimal."],
      ["Will weeds grow through the stones?", "We lay a geotextile weed barrier under the stone layer, which stops almost all weed growth."],
      ["Can a rock garden be built on a steep slope?", "Yes. In fact, rock gardens are one of the most effective ways to stabilise sloped soil and prevent erosion."]
    ],
    guide: "resort-landscaping-plan"
  },
  {
    id: "irrigation",
    name: "Irrigation",
    short: "Drip irrigation systems for planting beds, hedges, planters, terraces and green walls, designed with your landscape.",
    img: IMG.irrigation,
    h1: "Irrigation services in Tamil Nadu",
    title: "Irrigation services in Tamil Nadu | Blue Heaven Landscape",
    desc: "Irrigation services in Tamil Nadu for resorts, commercial properties and homes, planned with your landscape. Book a consultation with BHL.",
    tags: ["Every zone", "Water saving", "Automated timers", "Beds & planters"],
    answer: "Drip irrigation is a system of pipes and small emitters that delivers water slowly and directly to plant roots. BHL designs and installs drip irrigation zone by zone with the landscape, so every bed, hedge, planter and green wall gets the right amount of water, with less waste and less manual work.",
    suits: [
      "Large resort and campus grounds",
      "Planting beds and hedges",
      "Terrace gardens and planters",
      "Vertical gardens and living walls",
      "Home gardens"
    ],
    get: [
      "Zone-wise watering plan",
      "Drip lines and emitters for beds, hedges and planters",
      "Filter to protect the emitters",
      "System testing at handover",
      "Care instructions at handover"
    ],
    steps: [
      ["Zone mapping", "We map beds, planters and lawns and the water each one needs."],
      ["System design", "We plan the pipes, drip lines and emitters for each zone."],
      ["Installation", "We install the system with most lines out of sight."],
      ["Testing and handover", "We run every zone with you and show you how to use the timer."]
    ],
    options: [
      ["Drip for beds and hedges", "Drip lines laid along planting beds and hedges."],
      ["Drip for planters, terraces and green walls", "Small emitters for pots, terrace planters, vertical gardens and living walls."]
    ],
    cost: ["Area and number of zones", "Length of drip lines and number of emitters", "Filters and fittings", "Water source and pressure"],
    care: "Check drip emitters monthly for blocks, clean the filter regularly and adjust watering when the season changes. Our AMC covers irrigation checks and minor repairs.",
    faq: [
      ["Why choose drip irrigation?", "Drip puts water directly at the roots, so very little is lost to evaporation or runoff. It also keeps paths dry and reduces weeds."],
      ["Can you add irrigation to an existing garden?", "Yes. We plan the system around the plants and paths that are already there."],
      ["Does drip irrigation save water?", "Yes. Watering by zone and at the roots uses less water than hand watering."],
      ["What if my water supply is limited?", "Drip irrigation is one of the best options for limited water, because it uses water efficiently."]
    ],
    guide: "drip-or-sprinkler"
  },
  {
    id: "landscape-maintenance",
    name: "Annual maintenance (AMC)",
    short: "Scheduled care visits that keep your lawns, plants, walls and irrigation in good condition. 6-month and 12-month contracts.",
    img: IMG.gardener,
    h1: "Landscape maintenance (AMC) services in Tamil Nadu",
    title: "Landscape maintenance (AMC) in Tamil Nadu | Blue Heaven",
    desc: "6-month and 12-month landscape maintenance contracts for resorts, commercial properties and homes in Tamil Nadu. Book a consultation.",
    tags: ["Scheduled visits", "6 & 12 months", "Soil & lawn care", "Irrigation checks"],
    answer: "A landscape annual maintenance contract (AMC) is an agreement for regular care of your landscape over 6 or 12 months. BHL's AMC includes scheduled visits for mowing, trimming, fertilising, pest and disease checks and irrigation checks. Visits follow the schedule committed in your contract.",
    suits: [
      "Resorts and hotels",
      "Offices, IT parks and commercial buildings",
      "Apartments and gated communities",
      "Villas, independent houses and terrace gardens"
    ],
    get: [
      "Lawn mowing and edging",
      "Hedge and shrub trimming",
      "Fertilising and soil care",
      "Pest and disease checks and treatment",
      "Weeding of beds and pebble areas",
      "Irrigation checks, cleaning and minor repairs",
      "Living wall and vertical garden checks"
    ],
    steps: [
      ["Property inspection", "We inspect your landscape, understand its current condition and determine visit frequency."],
      ["Contract agreement", "We agree on a 6-month or 12-month contract with a fixed schedule of visits."],
      ["Scheduled care visits", "Our trained team visits as scheduled to mow, trim, feed, treat pests and check irrigation."],
      ["Quick support", "If anything needs attention between visits, we respond as soon as possible, within 24 hours."]
    ],
    options: [
      ["6-month AMC", "Ideal for seasonal properties or initial care after new landscape installation."],
      ["12-month AMC", "Comprehensive year-round landscape care covering all seasons."]
    ],
    cost: ["Property area and number of zones", "Types of elements (lawns, living walls, terrace gardens, beds)", "Visit frequency", "Condition of the existing landscape"],
    care: "Visits follow the schedule committed in your contract. If any plant needs replacement, we share the details and cost with you first. We promise to source the best plants for your place.",
    faq: [
      ["How often do you visit?", "Visit frequency is fixed in your contract, based on the size and needs of your property."],
      ["How long is an AMC?", "We offer 6-month and 12-month contracts."],
      ["Can I start an AMC for a landscape you did not build?", "Yes, subject to our terms and conditions. We first inspect the landscape to understand its condition."],
      ["What happens if something needs repair between visits?", "Call or WhatsApp us. We respond as soon as possible, within 24 hours."]
    ],
    guide: "how-we-work"
  }
];

export const svcById = Object.fromEntries(SERVICES.map((s) => [s.id, s]));
