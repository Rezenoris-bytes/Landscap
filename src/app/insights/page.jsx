"use client";

import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { IMG } from "@/data/site";
import { crumbsLd, useSeo } from "@/lib/seo";
import { Reveal } from "@/components/site/ui";
import {
  CtaBand, InsightItem, PageHero,
} from "@/components/site/sections";

export default function InsightsPage() {
  useSeo({
    title: "Landscaping blogs and guides | Blue Heaven Landscape",
    desc: "Plain answers on lawns, turf, terrace gardens, irrigation and resort landscaping, from the Blue Heaven team in Tamil Nadu.",
    path: "/insights",
    ld: [crumbsLd([["Home", "/"], ["Insights", "/insights"]])],
  });
  const [first, ...rest] = GUIDES;
  return (
    <>
      <PageHero crumbs={[["Insights"]]} title="Guides and straight answers" lede="Short, honest answers to the questions we hear most, from resort owners to home owners." img={IMG.fernDay} />
      <section className="bg-white py-20 lg:py-28" data-testid="insights-page">
        <div className="wrap">
          <Reveal>
            <Link href={`/insights/${first.id}`} data-testid={`insight-feature-${first.id}`} className="group mb-10 grid overflow-hidden rounded-[32px] bg-forest text-white lg:grid-cols-2">
              <div className="overflow-hidden"><img src={first.img} alt="" className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">Featured guide</span>
                <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">{first.title}</h2>
                <p className="mt-4 text-white/65">{first.desc}</p>
              </div>
            </Link>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-2">{rest.map((g, i) => <InsightItem key={g.id} g={g} i={i} />)}</div>
        </div>
      </section>
      <CtaBand title="Have a question we did not answer?" body="Book a consultation and ask us on your site." />
    </>
  );
}

