"use client";

import { IMG } from "@/data/site";
import { useSeo } from "@/lib/seo";
import { Btn } from "@/components/site/ui";
import { PageHero } from "@/components/site/sections";

export default function NotFound() {
  useSeo({
    title: "Page not found | Blue Heaven Landscape",
    desc: "This page does not exist. Go back to the home page or book a consultation.",
    path: "/404",
    noindex: true,
  });
  return (
    <PageHero
      title="This page has moved or never existed"
      lede="Try the home page, or book a consultation and tell us what you were looking for."
      img={IMG.fernDark}
    >
      <Btn to="/" variant="ghostLight" testId="notfound-home">Go to the home page</Btn>
      <Btn to="/book" testId="notfound-book">Book a consultation</Btn>
    </PageHero>
  );
}

