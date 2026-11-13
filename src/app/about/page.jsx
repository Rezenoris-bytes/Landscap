"use client";

import { IMG } from "@/data/site";
import { crumbsLd, useSeo } from "@/lib/seo";
import { Btn, Label, Reveal, Rich } from "@/components/site/ui";
import {
  CtaBand, Head, PageHero, Pillars,
} from "@/components/site/sections";
import BgVideo from "@/components/site/BgVideo";

export default function AboutPage() {
  useSeo({
    title: "About Blue Heaven Landscape (BHL)",
    desc: "Founded by Tamilarasan, Blue Heaven Landscape designs, builds and cares for landscapes in Tamil Nadu. Fair price, honest advice, never cheap work.",
    path: "/about",
    ld: [crumbsLd([["Home", "/"], ["About", "/about"]])],
  });
  return (
    <>
      <PageHero
        crumbs={[["About us"]]}
        title="The people behind Blue Heaven Landscape"
        lede="Blue Heaven Landscape (BHL) was started by Tamilarasan to build landscapes the right way: designed first, built well and priced fairly."
        img={IMG.moss}
        chip={<><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Founded by</p><p className="mt-2 font-display text-3xl font-light">Tamilarasan</p></>}
      >
        <Btn to="/book" testId="about-book">Book a consultation</Btn>
      </PageHero>
      <section className="bg-white py-24 lg:py-32" data-testid="about-story">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="flex aspect-[4/5] items-center justify-center rounded-[32px] border-2 border-dashed border-forest/25 bg-mist text-center text-forest/50">
            <span className="tbc">Photo of Tamilarasan</span>
          </Reveal>
          <Reveal delay={0.1}>
            <Label>Our story</Label>
            <p className="mt-6 font-display text-2xl font-light leading-relaxed text-forest md:text-3xl">
              <Rich text="[[Draft: Tamilarasan started Blue Heaven Landscape after seeing too many gardens built cheaply and left to fail. He wanted a team that shows clients the design first, keeps the price fair, and says no to cheap work.]]" />
            </p>
            <p className="mt-6 text-forest/60">Today BHL builds for resorts, businesses and homes across Tamil Nadu. — Tamilarasan, Founder</p>
          </Reveal>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-forest py-28 text-white lg:py-40" data-testid="about-vision">
        <BgVideo name="vision-forest" className="absolute inset-0 -z-10 h-full w-full opacity-35" />
        <div className="wrap">
          <Label dark>Our vision</Label>
          <Reveal><p className="mt-8 max-w-5xl font-display text-3xl font-light leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">To make the world greener by bringing plants into <span className="text-lime">every building, every corner,</span> and every possible space.</p></Reveal>
        </div>
      </section>
      <section className="bg-white py-24 lg:py-32">
        <div className="wrap">
          <Head label="What we believe" title="Four things we do not bend on" intro="Every project, every size." />
          <Pillars />
        </div>
      </section>
      <section className="bg-mist py-24 lg:py-28" data-testid="about-numbers">
        <div className="wrap">
          <Head label="The team" title="Who you will work with" intro={<Rich text="[[Add team members, roles and photos]]" />} />
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-forest/10 lg:grid-cols-4">
            {[["4+ years", "of work"], ["[[X]]", "projects"], ["[[Y]]", "team members"], ["[[Z]]", "cities"]].map(([n, l]) => (
              <div key={l} className="bg-white p-8"><p className="font-display text-4xl font-light text-forest"><Rich text={n} /></p><p className="mt-2 text-forest/60">{l}</p></div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Work with us" body="Book a consultation and meet the team on your site." />
    </>
  );
}

