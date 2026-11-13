import { IMG } from "./site";

export const GUIDES = [
  {
    id: "resort-landscaping-plan", title: "How to plan landscaping for a resort", service: "lawn", img: IMG.gardenPath,
    desc: "Start with the guest's walk from gate to room. A simple way to plan resort landscaping zone by zone, with water and care in mind.",
    answer: "Plan resort landscaping in the order a guest experiences it: gate, drive, lobby, pathways, pool and rooms. Decide what each zone should make the guest feel, then choose plants, lawn and irrigation to match. Plan water and care from day one, so the landscape still looks good after the first season.",
    points: [["Walk the property as a guest", "Start at the gate and note what a guest sees first, second and third."], ["Give each zone one job", "Welcome at the gate, calm on the pathways, shade by the pool."], ["Plan water with the design", "Large grounds stay green only when irrigation is planned with them."], ["Build in phases if needed", "Start with the zones guests see first and add the rest later."]],
  },
  {
    id: "grass-or-turf-pool-deck", title: "Grass or artificial turf for a pool deck?", service: "artificial-turf", img: IMG.poolUmbrella,
    desc: "Natural grass feels cool and soft. Turf stays green with little care. How to choose for a resort or home pool deck.",
    answer: "Natural grass feels cool and soft underfoot but needs water, mowing and time to recover from heavy use. Artificial turf stays green all year, drains fast and needs little care, but can get warm in full sun. For busy pool decks, turf usually wins. For shaded, low-use areas, grass can work well.",
    points: [["Think about use", "Heavy daily use favours turf."], ["Think about sun", "Full sun can make turf warm. Shade helps."], ["Think about care", "Turf needs no mowing. Grass needs regular care."], ["Mix both", "Grass in open areas, turf near the water."]],
  },
  {
    id: "terrace-garden-roof-safety", title: "Is a terrace garden safe for my roof?", service: "terrace-garden", img: IMG.succulents,
    desc: "Yes, when the weight, drainage and waterproofing are checked first. What to check before you build a terrace garden.",
    answer: "A terrace garden is safe when three things are checked first: how much weight the roof can carry, how water drains away, and the condition of the waterproofing. Wet soil is heavy, so the design must match the roof. When these are right, a terrace garden protects the roof from direct sun.",
    points: [["Check the weight", "Wet soil and large planters are heavy. Match the design to the roof."], ["Check drainage", "Water must flow to the drains, not sit on the roof."], ["Check waterproofing", "Fix any weak spots before building."], ["Choose light options", "Pots, planters and turf weigh less than deep beds."]],
  },
  {
    id: "why-is-my-lawn-turning-yellow", title: "Why is my lawn turning yellow?", service: "lawn", img: IMG.dewGrass,
    desc: "The most common reasons are too much water, too little water, poor soil or too much shade. How to find the cause and fix it.",
    answer: "A lawn usually turns yellow because of too much water, too little water, poor soil, too much shade or mowing too short. Look at where the yellow patches are and when they started. Patches near sprinklers or low spots often mean too much water; patches in the sun often mean too little.",
    points: [["Check the water", "Soggy soil means too much. Dry, hard soil means too little."], ["Check the soil", "Hard, poor soil stops roots from growing."], ["Check the shade", "Most lawn grasses need several hours of sun."], ["Check the mowing", "Cutting too short stresses the grass."]],
  },
  {
    id: "drip-or-sprinkler", title: "Drip or sprinkler: which irrigation do you need?", service: "irrigation", img: IMG.dripClose,
    desc: "Drip suits beds, hedges and pots. Sprinklers suit lawns. Most large properties need both. How to choose for your site.",
    answer: "Drip irrigation puts water straight at the roots, so it suits planting beds, hedges and pots. Sprinklers spread water over a wide area, so they suit lawns. Most resorts, campuses and large gardens need both, each on its own zone and timer, so every part of the landscape gets the right amount.",
    points: [["Use drip for beds and pots", "Less waste and dry paths."], ["Use sprinklers for lawns", "Even cover over open grass."], ["Split into zones", "Lawns and beds need different amounts of water."], ["Add timers", "Water early in the day, without anyone remembering to."]],
  },
  {
    id: "living-wall-vs-vertical-garden", title: "Living wall or vertical garden: what is the difference?", service: "living-wall", img: IMG.livingWall,
    desc: "Both put plants on a wall. A living wall is a large built-in feature. A vertical garden is smaller and simpler. Which one fits your space.",
    answer: "Both put real plants on a wall. A vertical garden is smaller and simpler, good for balconies, compound walls and small courtyards. A living wall is a large, built-in feature for lobbies, receptions and entrances, with its own watering system and a design made for the space. Choose by size, location and the impression you want.",
    points: [["Small wall at home", "A vertical garden is usually enough."], ["Lobby or entrance", "A living wall makes the stronger first impression."], ["Indoors", "Choose plants for low light, and plan the watering carefully."], ["Care", "Both need regular checks of the watering."]],
  },
];

export const guideById = Object.fromEntries(GUIDES.map((g) => [g.id, g]));
