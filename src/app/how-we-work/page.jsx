"use client";

import { IMG } from "@/data/site";
import { crumbsLd, faqLd, useSeo } from "@/lib/seo";
import { Btn, Label, Reveal, Rich } from "@/components/site/ui";
import {
  AnswerBlock, CtaBand, FaqSection, PageHero, PromiseBand,
} from "@/components/site/sections";

const HOW_STEPS = [
  {
    step: "01",
    t: "Consultation call",
    d: "You book a time online. Our team calls you to understand the space, who will use it, what you expect and your timeline. You get: clear next steps.",
    img: IMG.lobbyPlants,
  },
  {
    step: "02",
    t: "Site visit",
    d: "We measure the area and check sunlight, soil, drainage, water supply and access. We charge a small fee for the site visit, to cover our team's time and travel to your place. If you go ahead with the project, this fee is adjusted in the final project cost. You get: an understanding of what is possible on your site.",
    img: IMG.plan,
  },
  {
    step: "03",
    t: "Design presentation",
    d: "We present the layout, plant list and materials. You get up to three full rounds of corrections, because we respect your feedback. You get: an approved design.",
    img: IMG.campusTerraces,
  },
  {
    step: "04",
    t: "Quotation",
    d: "We share a detailed quotation within one day of your design approval. You get: the full scope of work, cost and timeline in writing.",
    img: IMG.office,
  },
  {
    step: "05",
    t: "Development and irrigation",
    d: "Our team prepares the ground, installs plants, lawn, turf or stone, and sets up the irrigation. We promise to source the best plants for your place. You get: a landscape built to the approved design.",
    img: IMG.planting,
  },
  {
    step: "06",
    t: "Handover and maintenance",
    d: "We test the irrigation, clear the site and share care instructions. You can continue with a 6-month or 12-month maintenance contract (AMC). You get: a finished, clean site.",
    img: IMG.cottageLawn,
  },
];

const FAQ = [
  ["Do you charge for the site visit?", "Yes. We charge a small fee for the site visit, to cover our team's time and travel to your place. If you go ahead with the project, this fee is adjusted in the final project cost."],
  ["Can I change the design?", "Yes. You get up to three full rounds of corrections before the design is final, because we respect your feedback."],
  ["When will I receive the quotation?", "Within one day after you approve the design."],
  ["Who will I talk to during the project?", "One person from our team manages your project from the site visit to handover."],
  ["Do you offer maintenance after handover?", "Yes. We offer 6-month and 12-month maintenance contracts (AMC), with visits scheduled as committed in the contract."],
];

export default function HowWeWorkPage() {
  useSeo({
    title: "How we work | Blue Heaven Landscape",
    desc: "Our six-step process: consultation call, site visit, design presentation with three rounds of corrections, quotation, development and handover.",
    path: "/how-we-work",
    ld: [
      crumbsLd([["Home", "/"], ["How we work", "/how-we-work"]]),
      faqLd(FAQ),
    ],
  });

  return (
    <>
      <PageHero
        crumbs={[["How we work"]]}
        title="How we work"
        lede="A clear, six-step process from your first call to the final handover. Work starts only after you approve the design."
        img={IMG.resortGarden}
      >
        <Btn to="/book" testId="how-hero-book">Book a consultation</Btn>
      </PageHero>

      <AnswerBlock
        title="How does a landscaping project with BHL work?"
        text="A BHL project has six steps: a consultation call, a site visit, a design presentation with up to three rounds of corrections, a detailed quotation, development and irrigation, and handover with an optional maintenance contract. You approve the design before any work begins, so the finished landscape matches what you agreed."
      />

      <section className="bg-white py-24 lg:py-32" data-testid="how-steps">
        <div className="wrap space-y-5">
          {HOW_STEPS.map((s) => (
            <Reveal key={s.t}>
              <article className="group grid items-center gap-6 overflow-hidden rounded-[28px] border border-forest/10 p-4 transition-colors duration-500 hover:border-forest/30 md:grid-cols-[100px_1fr_280px] md:p-6">
                <span className="pl-2 font-display text-5xl font-light text-forest/25 transition-colors group-hover:text-forest">
                  {s.step}
                </span>
                <div className="px-2 md:px-0">
                  <h2 className="font-display text-2xl font-light text-forest md:text-3xl">{s.t}</h2>
                  <p className="mt-2.5 max-w-xl text-forest/70">{s.d}</p>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={s.img}
                    alt={s.t}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-mist py-24 lg:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <Reveal>
            <Label>If your budget does not match the scope</Label>
            <h2 className="h-section mt-5 text-forest">We will not lower quality to fit a budget</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-forest/75">
              We will not lower the quality of plants, soil or irrigation parts to fit a budget. If the budget cannot cover the full scope, we tell you at the start and offer clear options:
            </p>
            <ul className="mt-4 space-y-2 text-forest/80">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-forest" />
                <span><strong>Phased development:</strong> Start with the most important areas and complete the rest later</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-forest" />
                <span><strong>Revised scope:</strong> A smaller design that fits the budget at our quality standard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-forest" />
                <span><strong>Consulting only:</strong> A complete design and plan you can develop later</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <PromiseBand body="Competitive pricing, quality materials, a design you approve first and a clean handover, on every project." />

      <FaqSection title="Questions about our process" list={FAQ} prefix="how-faq" />

      <CtaBand title="Ready for step one?" body="Book a consultation call. We will understand your space, requirement and timeline." />
    </>
  );
}
