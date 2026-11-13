"use client";

import { FAQ_GROUPS, IMG } from "@/data/site";
import { crumbsLd, faqLd, useSeo } from "@/lib/seo";
import { Label } from "@/components/site/ui";
import {
  CtaBand, FaqList, PageHero,
} from "@/components/site/sections";

export default function FaqPage() {
  const all = FAQ_GROUPS.flatMap(([, l]) => l);
  useSeo({
    title: "Landscaping questions answered | Blue Heaven Landscape",
    desc: "Answers on cost, timelines, services and care. Ask us anything else when you book a consultation.",
    path: "/faq",
    ld: [faqLd(all), crumbsLd([["Home", "/"], ["FAQ", "/faq"]])],
  });
  return (
    <>
      <PageHero crumbs={[["FAQ"]]} title="Questions people ask us" lede="Straight answers on cost, time, services and care." img={IMG.fernGravel} />
      <section className="bg-white py-20 lg:py-28" data-testid="faq-page">
        <div className="wrap grid gap-16 lg:grid-cols-[260px_1fr]">
          <nav className="hidden lg:block">
            <div className="sticky top-28 space-y-3">
              {FAQ_GROUPS.map(([g], i) => (
                <a key={g} href={`#faq-g${i}`} className="block text-forest/60 hover:text-forest">{g}</a>
              ))}
            </div>
          </nav>
          <div className="space-y-16">
            {FAQ_GROUPS.map(([g, l], i) => (
              <div key={g} id={`faq-g${i}`} className="scroll-mt-28">
                <Label>{g}</Label>
                <div className="mt-4"><FaqList list={l} prefix={`faqp-${i}`} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Still have a question?" body="Book a consultation and ask us anything." />
    </>
  );
}

