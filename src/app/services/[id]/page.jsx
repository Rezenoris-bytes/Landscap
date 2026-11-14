import { SERVICES, svcById } from "@/data/services";
import ServiceClient from "./ServiceClient";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

export function generateMetadata({ params }) {
  const svc = svcById[params?.id];
  if (!svc) {
    return {
      title: "Landscaping Service | Blue Heaven Landscape",
    };
  }

  const title = svc.title || `${svc.name} Services in Tamil Nadu`;
  const description = svc.desc || svc.short;
  const canonical = `/services/${svc.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | Blue Heaven Landscape`,
      description,
      url: `https://blueheavenlandscape.com${canonical}`,
      images: [
        {
          url: svc.img || "/img/bhl-banner.webp",
          width: 1200,
          height: 630,
          alt: svc.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [svc.img || "/img/bhl-banner.webp"],
    },
  };
}

export default function ServicePage() {
  return <ServiceClient />;
}
