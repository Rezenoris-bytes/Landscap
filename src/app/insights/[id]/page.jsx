export const runtime = "edge";

import { GUIDES } from "@/data/guides";
import InsightsClient from "./InsightsClient";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ id: g.id }));
}

export default function InsightDetailPage() {
  return <InsightsClient />;
}

