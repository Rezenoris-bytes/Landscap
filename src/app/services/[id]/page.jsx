import { SERVICES } from "@/data/services";
import ServiceClient from "./ServiceClient";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

export default function ServicePage() {
  return <ServiceClient />;
}

