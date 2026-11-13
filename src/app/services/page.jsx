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
    title: "Landscaping services in Tamil Nadu | Blue Heaven Landscape",
    desc: "Vertical gardens, living walls, terrace gardens, lawns, artificial turf, rock gardens, irrigation and AMC in Tamil Nadu. Book a consultation.",
    path: "/services",
    ld: [crumbsLd([["Home", "/"], ["Services", "/services"]])],
  });
  const rows = [
    ["Feel underfoot", "Soft and cool", "Soft, can get hot in direct sun", "Firm, textured"],
    ["Water need", "Regular", "Very low", "Low, for plants only"],
    ["Maintenance", "Mowing, feeding, watering", "Brushing and rinsing", "Weeding now and then"],
    ["Best for", "Event lawns, gardens, campuses", "Pool decks, play areas, shade, rooftops", "Slopes, dry areas, entrances"]
  ];
  return (
    <>
      <PageHero crumbs={[["What we do"]]} title="Landscaping services in Tamil Nadu" lede="Vertical gardens, living walls, terrace gardens, lawns, artificial turf, rock gardens, drip irrigation systems and annual maintenance contracts (AMC) for resorts, commercial properties and homes." img={IMG.resortLawn} video="services">
        <Btn to="/book" testId="services-hero-book">Book a consultation</Btn>
      </PageHero>
      <ServicesBand title="Our landscaping services" intro="Every service includes a site study, design, installation and a clean handover. You can choose one service or combine several in one project." />
      <section className="bg-white py-24 lg:py-32" data-testid="compare-table">
        <div className="wrap">
          <Head label="How to choose" title="Lawn, artificial turf or rock garden: a quick comparison" intro="Three ways to cover open ground. Here is how they compare." />
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
          <Head label="How we work" title="How every project works" intro="A clear process from your first call to the final handover." action={<Btn to="/how-we-work" variant="ghostDark">See every step</Btn>} />
          <HowSlider />
        </div>
      </section>
      <section className="bg-white py-24 lg:py-32">
        <div className="wrap">
          <Head label="Other services" title="Design and consulting services" intro="When you need expert guidance, phased planning, or plant sourcing." />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Landscape design only", "A complete design you can develop yourself or in phases."],
              ["Landscape consulting", "Expert advice on scope, plants and phasing, useful when the budget does not cover the full project."],
              ["Plant sourcing", "We source the best plants for your place, along with stone and turf for your project."]
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="rounded-[28px] border border-forest/10 p-8 transition-colors hover:border-forest/30">
                <h3 className="font-display text-2xl font-light text-forest">{t}</h3>
                <p className="mt-3 text-forest/65"><Rich text={d} /></p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Not sure which service you need?" body="Book a consultation call. We will understand your space and suggest the right service." />
    </>
  );
}

