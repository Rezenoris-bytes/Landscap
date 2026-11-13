"use client";

import { IMG } from "@/data/site";
import { crumbsLd, useSeo } from "@/lib/seo";
import { Btn, Label, Reveal, Rich } from "@/components/site/ui";
import {
  AnswerBlock, CtaBand, Head, PageHero, Pillars,
} from "@/components/site/sections";
import BgVideo from "@/components/site/BgVideo";

const TEAM = [
  { name: "Tamilarasan", role: "Founder", bio: "Leading BHL's vision to make every space greener through thoughtful design and quality execution." },
  { name: "Kalpana", role: "Finance Head", bio: "Managing transparent quotations, structured project accounting and operational finances." },
  { name: "Bharath", role: "Marketing Head", bio: "Connecting resort owners, commercial property managers and homeowners with BHL." },
];

export default function AboutPage() {
  useSeo({
    title: "About Blue Heaven Landscape (BHL)",
    desc: "Blue Heaven Landscape (BHL) is a landscaping company in Tamil Nadu, founded by Tamilarasan, serving resorts, commercial properties and homes.",
    path: "/about",
    ld: [crumbsLd([["Home", "/"], ["About", "/about"]])],
  });

  return (
    <>
      <PageHero
        crumbs={[["About us"]]}
        title="About Blue Heaven Landscape"
        lede="A landscaping company in Tamil Nadu, founded by Tamilarasan. We design, develop and maintain landscapes for resorts, commercial properties and homes."
        img={IMG.moss}
        chip={
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Founded by</p>
            <p className="mt-2 font-display text-3xl font-light">Tamilarasan</p>
          </>
        }
      >
        <Btn to="/book" testId="about-book">Book a consultation</Btn>
      </PageHero>

      <AnswerBlock
        title="Who is Blue Heaven Landscape?"
        text="Blue Heaven Landscape (BHL) is a landscaping company in Tamil Nadu, India, founded by Tamilarasan. With more than four years of experience, BHL provides landscape design, development, irrigation and maintenance contracts for resorts, commercial properties and homes, with a focus on resort and commercial projects."
      />

      <section className="bg-white py-24 lg:py-32" data-testid="about-story">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="overflow-hidden rounded-[32px] bg-forest">
            <img
              src={IMG.gardener}
              alt="Blue Heaven Landscape team at work"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Label>Our story</Label>
            <h2 className="mt-4 font-display text-3xl font-light text-forest sm:text-4xl">
              Building landscapes the right way
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-forest/75">
              Tamilarasan founded Blue Heaven Landscape to solve a persistent problem in the industry: landscapes built cheaply, without proper soil preparation or irrigation, only to deteriorate after a single season.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-forest/75">
              BHL was built on a different foundation: listen to the client first, present a detailed design you approve before any work begins, price fairly without hidden extras, and never compromise on plant quality or irrigation.
            </p>
            <p className="mt-6 font-display text-xl text-forest">
              — Tamilarasan, Founder
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-forest py-28 text-white lg:py-36" data-testid="about-vision">
        <BgVideo name="vision-forest" className="absolute inset-0 -z-10 h-full w-full opacity-35" />
        <div className="wrap">
          <Label dark>Our vision</Label>
          <Reveal>
            <p className="mt-8 max-w-5xl font-display text-3xl font-light leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
              To make the world greener by bringing plants into <span className="text-lime">every building, every corner,</span> and every possible space.
            </p>
          </Reveal>
          <div className="mt-12 max-w-3xl border-l-2 border-lime pl-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">Our mission</p>
            <p className="mt-2 text-lg text-white/80">
              To deliver landscapes that match each client's requirement, at a competitive price, without compromising on quality, and to keep them healthy for years through proper irrigation and maintenance.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="wrap">
          <Head
            label="How we work with clients"
            title="Our quality commitment"
            intro="We price our work competitively, but we never use low-grade plants, soil or irrigation parts to reduce cost."
          />
          <Pillars />
        </div>
      </section>

      <section className="bg-mist py-24 lg:py-28" data-testid="about-numbers">
        <div className="wrap">
          <Head
            label="Track record"
            title="Blue Heaven Landscape in numbers"
            intro="Consistent delivery across Tamil Nadu and major metro regions."
          />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-forest/10 lg:grid-cols-4">
            {[
              ["4+ years", "in landscaping"],
              ["30+", "projects completed"],
              ["50,000+ sq ft", "of landscape developed"],
              ["5+", "cities served in Tamil Nadu"],
            ].map(([n, l]) => (
              <div key={l} className="bg-white p-8">
                <p className="font-display text-4xl font-light text-forest">{n}</p>
                <p className="mt-2 text-sm text-forest/70">{l}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="font-display text-2xl font-light text-forest">Our team</h3>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {TEAM.map((m) => (
                <div key={m.name} className="rounded-3xl border border-forest/10 bg-white p-6 shadow-sm">
                  <span className="font-mono text-xs uppercase tracking-widest text-forest/50">{m.role}</span>
                  <h4 className="mt-2 font-display text-2xl font-medium text-forest">{m.name}</h4>
                  <p className="mt-2 text-sm text-forest/70">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Work with us" body="Book a consultation call and tell us about your project." />
    </>
  );
}
