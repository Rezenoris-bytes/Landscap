import {
  BadgeCheck, Building2, Droplets, Eye, Flower2, Grid3x3, Hotel, House, LandPlot, Mountain, ShieldCheck, Sparkles, Sprout, Trees,
} from "lucide-react";

export const SERVICE_ICONS = {
  lawn: Sprout,
  "vertical-garden": Grid3x3,
  "living-wall": Flower2,
  "terrace-garden": Building2,
  "artificial-turf": LandPlot,
  "rock-garden": Mountain,
  irrigation: Droplets,
};

export const WHO_ICONS = { "/resorts": Hotel, "/commercial": Building2, "/homes": House };

export const PILLAR_ICONS = [Eye, ShieldCheck, Sparkles, BadgeCheck];

export const FallbackIcon = Trees;
