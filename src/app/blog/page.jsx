"use client";

import Link from "next/link";
import { GUIDES } from "@/data/guides";
import { IMG } from "@/data/site";
import { crumbsLd, useSeo } from "@/lib/seo";
import { Reveal } from "@/components/site/ui";
import {
  CtaBand, PageHero,
} from "@/components/site/sections";
import { ArrowUpRight } from "lucide-react";

export default function BlogPage() {
  useSeo({
    title: "Landscaping blog | Blue Heaven Landscape",
    desc: "Practical guides on resort landscaping, lawns, artificial turf, terrace gardens, irrigation and green walls from the Blue Heaven Landscape team.",
    path: "/blog",
    ld: [crumbsLd([["Home", "/"], ["Blog", "/blog"]])],
  });

  const [first, ...rest] = GUIDES;

  return (
    <>
      <PageHero
        crumbs={[["Blog"]]}
        title="Landscaping blog"
        lede="Practical guides on terrace gardens, lawns, turf, irrigation and resort landscaping, written by the Blue Heaven Landscape team from our work across Tamil Nadu."
        img={IMG.fernDay}
      />

      <section className="bg-white py-20 lg:py-28" data-testid="blog-page">
        <div className="wrap">
          <Reveal>
            <Link
              href={`/blog/${first.id}`}
              data-testid={`blog-feature-${first.id}`}
              className="group mb-10 grid overflow-hidden rounded-[32px] bg-forest text-white lg:grid-cols-2"
            >
              <div className="overflow-hidden">
                <img
                  src={first.img}
                  alt={first.title}
                  className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">Featured guide</span>
                <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">{first.title}</h2>
                <p className="mt-4 text-white/65">{first.desc}</p>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.08}>
                <Link
                  href={`/blog/${g.id}`}
                  data-testid={`blog-card-${g.id}`}
                  className="group flex flex-col justify-between rounded-3xl border border-forest/10 p-6 transition-colors duration-300 hover:border-forest/30"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-widest text-lime-700">Guide</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 transition-transform duration-300 group-hover:rotate-45 group-hover:border-forest">
                        <ArrowUpRight className="h-4 w-4 text-forest" />
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-light text-forest">{g.title}</h3>
                    <p className="mt-2.5 text-sm text-forest/70">{g.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 font-mono text-xs text-forest/50">
                    <span>Read guide</span>
                    <span>→</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Have a question about your space?" body="Book a consultation call and ask our team." />
    </>
  );
}

