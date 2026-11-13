"use client";

import { IMG } from "@/data/site";
import { crumbsLd, useSeo } from "@/lib/seo";
import { Btn, Label, Reveal, Rich } from "@/components/site/ui";
import {
  CtaBand, FaqSection, PageHero, PromiseBand,
} from "@/components/site/sections";

const HOW_STEPS = [
  ["Book a consultation", "Tell us about your space and pick a time. It takes about a minute.", IMG.lobbyPlants],
  ["Site visit", "We walk the site with you, check sun, soil, water and use, and listen to what you want.", IMG.siteWalk],
  ["Design presentation", "We show you the full design: layout, plants, materials and how each area will look. [[Confirm format]]", IMG.planReview],
  ["Clear quote", "A written quote for the design you approved. No hidden extras.", IMG.quoteWriting],
  ["Build", "Our own team builds what you approved, with a tidy site every day.", IMG.seedlingHand],
  ["Handover and care", "Clean edges, a tidy site and working irrigation on the last day. Garden care is available on request.", IMG.cottageLawn],
];

export default function HowWeWorkPage() {
  useSeo({
    title: "How we work: see your design first | Blue Heaven Landscape",
    desc: "Six clear steps from consultation to handover. You see and approve the design before we build, so there are no surprises on the last day.",
    path: "/how-we-work",
    ld: [crumbsLd([["Home", "/"], ["How we work", "/how-we-work"]])],
  });
  const faq = [
    ["Can I change the design?", "Yes. We change it until you are happy, before work starts."],
    ["Who will I talk to during the project?", "One person from our team, from the first visit to handover."],
    ["What if my budget is smaller than the design?", "We tell you honestly and help you phase it, starting with the zone that matters most."]
  ];
  return (
    <>
      <PageHero crumbs={[["How we work"]]} title="You see it before we build it" lede="Six clear steps from the first call to the last day. The design comes before the digging, always." img={IMG.greenhouse}>
        <Btn to="/book" testId="how-hero-book">Book a consultation</Btn>
      </PageHero>
      <section className="bg-white py-24 lg:py-32" data-testid="how-steps">
        <div className="wrap space-y-5">
          {HOW_STEPS.map(([t, d, img], i) => (
            <Reveal key={t}>
              <article className="group grid items-center gap-6 overflow-hidden rounded-[28px] border border-forest/10 p-3 transition-colors duration-500 hover:border-forest/30 md:grid-cols-[100px_1fr_280px] md:p-4">
                <span className="pl-4 font-display text-5xl font-light text-forest/25 transition-colors group-hover:text-forest">0{i + 1}</span>
                <div className="px-4 md:px-0"><h2 className="font-display text-2xl font-light text-forest md:text-3xl">{t}</h2><p className="mt-2 max-w-xl text-forest/65"><Rich text={d} /></p></div>
                <div className="overflow-hidden rounded-2xl"><img src={img} alt={t} className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" /></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-mist py-24 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <Reveal><Label>When the budget does not fit</Label><h2 className="h-section mt-5 text-forest">We will tell you, honestly</h2></Reveal>
          <Reveal delay={0.1}><p className="text-lg leading-relaxed text-forest/70">Sometimes a budget cannot pay for good work on the whole space. When that happens, we do not lower the quality. We tell you, and we help you choose: build the most important zone first, plan the rest in phases, or start with our advice only.</p></Reveal>
        </div>
      </section>
      <PromiseBand body="Our price is fair and our quality does not move. That is the deal, on every project, big or small." />
      <FaqSection title="Questions about the process" list={faq} prefix="how-faq" />
      <CtaBand title="Ready for step one?" body="Book a consultation. It takes about a minute." />
    </>
  );
}

