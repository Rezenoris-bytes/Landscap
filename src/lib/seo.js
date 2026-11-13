import { useEffect } from "react";

const getOrigin = () => (typeof window !== "undefined" ? window.location.origin : "https://blueheavenlandscape.com");

const setMeta = (attr, key, content) => {
  if (typeof document === "undefined") return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

export const crumbsLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${getOrigin()}${path}`,
  })),
});

export const faqLd = (list) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a.replace(/\[\[|\]\]/g, "") },
  })),
});

export const serviceLd = (name, desc, path) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description: desc,
  url: `${getOrigin()}${path}`,
  provider: { "@type": "LocalBusiness", name: "Blue Heaven Landscape (BHL)", telephone: "+91 63806 56237" },
  areaServed: { "@type": "State", name: "Tamil Nadu" },
});

export function useSeo({ title, desc, path, ld = [], noindex = false }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = title;
    setMeta("name", "description", desc);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", `${getOrigin()}${path}`);
    setMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${getOrigin()}${path}`;
    let script = document.getElementById("page-ld");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-ld";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }, [title, desc, path]);
}
