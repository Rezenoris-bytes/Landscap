"use client";

import Link from "next/link";
import { SERVICES } from "@/data/services";
import { IMG } from "@/data/site";
import { crumbsLd, useSeo } from "@/lib/seo";
import { Btn, Reveal, Rich } from "@/components/site/ui";
import {
  CtaBand, Head, HowSlider, PageHero, ServicesBand,
} from "@/components/site/sections";

export default function ServicesPage() {
  useSeo({
    title: "Landscaping services: lawns, turf, irrigation | Blue Heaven Landscape",
    desc: "Lawns, vertical gardens, living walls, terrace gardens, artificial turf, rock gardens and irrigation for resorts, businesses and homes in Tamil Nadu.",
    path: "/services",
    ld: [crumbsLd([["Home", "/"], ["Services", "/services"]])],
  });
  const rows = [
    ["Feel", "Soft and cool", "Soft, can get warm in sun", "Natural, textured"],
    ["Water", "Regular", "Very little", "Little, for the plants"],
    ["Care", "Mowing and feeding", "Brushing now and then", "Weeding now and then"],
    ["Best for", "Event lawns, gardens", "Pool decks, play areas, shade", "Slopes, dry corners, entrances"]
  ];
  return (
    <>
      <PageHero crumbs={[["What we do"]]} title="What we build" lede="Seven services, one team. Every one is designed for your site, built by our own people and planned with water from day one." img={IMG.resortLawn} video="services">
        <Btn to="/book" testId="services-hero-book">Book a consultation</Btn>
      </PageHero>
      <ServicesBand title="Pick a service" intro="Each page explains who it suits, what you get and what affects the cost." />
      <section className="bg-white py-24 lg:py-32" data-testid="compare-table">
        <div className="wrap">
          <Head label="Not sure which fits?" title="Lawn, turf or rock garden" intro="Three ways to cover open ground. Here is how they compare." />
          <Reveal className="overflow-x-auto rounded-[28px] border border-forest/10">
            <table className="w-full min-w-[640px] text-left">
              <thead className="bg-forest text-white">
                <tr>{["", "Lawn", "Artificial turf", "Rock garden"].map((h) => <th key={h} className="px-6 py-5 font-display text-lg font-light">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map(([k, ...v]) => (
                  <tr key={k} className="border-t border-forest/10 transition-colors hover:bg-mist">
                    <td className="px-6 py-5 font-mono text-xs uppercase tracking-[0.16em] text-forest/60">{k}</td>
                    {v.map((x) => <td key={x} className="px-6 py-5 text-forest/80">{x}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
      <section className="bg-mist py-24 lg:py-32">
        <div className="wrap">
          <Head label="How we work" title="You see it before we build it" intro="Every service follows the same simple path, from first call to handover." action={<Btn to="/how-we-work" variant="ghostDark">See every step</Btn>} />
          <HowSlider />
        </div>
      </section>
      <section className="bg-white py-24 lg:py-32">
        <div className="wrap">
          <Head label="Other help" title="When you need advice, not a build" intro="Sometimes the right first step is a plan." />
          <div className="grid gap-5 md:grid-cols-3">
            {[["Design only", "A landscape design you can build in stages. [[Confirm]]"], ["Consulting", "Honest advice on what to do first, especially when the budget does not fit a full build."], ["Garden care", "Care visits after handover, available on request."]].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="rounded-[28px] border border-forest/10 p-8 transition-colors hover:border-forest/30">
                <h3 className="font-display text-2xl font-light text-forest">{t}</h3>
                <p className="mt-3 text-forest/65"><Rich text={d} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Not sure where to start?" body="Book a consultation. We will look at your space and tell you what fits." />
    </>
  );
}

