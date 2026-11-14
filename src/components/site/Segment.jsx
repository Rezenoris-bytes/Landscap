"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SEGMENTS } from "@/data/segments";
import { svcById } from "@/data/services";
import { crumbsLd, faqLd, serviceLd, useSeo } from "@/lib/seo";
import { Btn, Label, Reveal, Rich } from "@/components/site/ui";
import {
  AnswerBlock, CtaBand, FaqSection, Head, PageHero, ProjectsTeaser, PromiseBand, Testimonials, Ticks,
} from "@/components/site/sections";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

const Zones = ({ s }) => (
  <section data-testid="segment-zones" className="bg-white py-24 lg:py-32">
    <div className="wrap">
      <Head label={s.zKick} title={s.zTitle} intro={s.zIntro} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {s.zones.map(([t, d, img], i) => (
          <Reveal key={t} delay={(i % 3) * 0.08} className={cn(s.zones.length % 3 === 1 && (i === 0 || i === s.zones.length - 1) && "lg:col-span-2", s.zones.length % 3 === 2 && i === 0 && "lg:col-span-2")}>
            <article className="group relative h-full overflow-hidden rounded-[28px] bg-mist" data-testid={`zone-${i}`}>
              <div className="overflow-hidden"><img src={img} alt={t} className="h-60 w-full object-cover transition-transform duration-1000 group-hover:scale-110 lg:h-64" loading="lazy" /></div>
              <div className="p-6">
                <span className="font-mono text-xs text-forest/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-xl font-medium text-forest">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest/65">{d}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Extra = ({ e, i }) => (
  <section className={cn("py-24 lg:py-28", i % 2 ? "bg-white" : "bg-mist")} data-testid={`segment-extra-${i}`}>
    <div className={cn("wrap grid items-center gap-12 lg:grid-cols-2", i % 2 && "lg:[&>*:first-child]:order-2")}>
      <Reveal className="overflow-hidden rounded-[32px]"><img src={e.img} alt={e.title} className="aspect-[5/4] w-full object-cover" loading="lazy" /></Reveal>
      <Reveal delay={0.1}>
        <Label>{e.kick}</Label>
        <h2 className="mt-5 font-display text-3xl font-light leading-tight text-forest sm:text-4xl">{e.title}</h2>
        <p className="mt-5 text-forest/70"><Rich text={e.body} /></p>
        {e.list && <div className="mt-7"><Ticks items={e.list} /></div>}
        {e.link && <Link href={e.link[0]} className="mt-7 inline-flex items-center gap-1.5 border-b border-forest/30 pb-0.5 text-forest hover:border-forest">{e.link[1]} <ArrowUpRight className="h-4 w-4" /></Link>}
      </Reveal>
    </div>
  </section>
);

const SegmentServices = ({ ids }) => (
  <section className="bg-forest py-24 text-white lg:py-28" data-testid="segment-services">
    <div className="wrap">
      <Head dark label="Services that fit" title="What we usually build here" action={<Btn to="/services" variant="ghostLight">All services</Btn>} />
      <div className="divide-y divide-white/10 border-y border-white/10">
        {ids.map((id, i) => {
          const sv = svcById[id];
          return (
            <Reveal key={id} delay={i * 0.05}>
              <Link href={`/services/${id}`} data-testid={`segment-service-${id}`} className="group grid grid-cols-[40px_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[60px_1fr_1.2fr_auto]">
                <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                <span className="font-display text-2xl font-light transition-colors group-hover:text-lime sm:text-3xl">{sv.name}</span>
                <span className="hidden text-white/60 sm:block">{sv.short}</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-forest"><ArrowUpRight className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default function Segment({ id }) {
  const s = SEGMENTS[id];
  useSeo({
    title: s.title, desc: s.desc, path: `/${id}`,
    ld: [serviceLd(`${s.crumb} landscaping`, s.a, `/${id}`), faqLd(s.faq), crumbsLd([["Home", "/"], [s.crumb, `/${id}`]])],
  });
  return (
    <>
      <PageHero
        crumbs={[["Who we serve"], [s.crumb]]}
        title={s.h1}
        lede={s.lede}
        img={s.img}
        video={id}
        chip={<><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">For {s.crumb.toLowerCase()}</p><p className="mt-3 font-display text-2xl font-light">See the design before a single plant goes in.</p></>}
      >
        <Btn to={`/book?space=${s.space}`} testId="segment-book-btn">Book a consultation</Btn>
        <Btn href={SITE.whatsapp} variant="ghostLight" testId="segment-whatsapp-btn">WhatsApp us</Btn>
      </PageHero>
      <AnswerBlock title={s.aTitle} text={s.a} />
      <Zones s={s} />
      <SegmentServices ids={s.services} />
      {s.extras.map((e, i) => <Extra key={e.title} e={e} i={i} />)}
      <PromiseBand body={s.promise} />
      <ProjectsTeaser type={s.space} title={s.pTitle} />
      <Testimonials who={s.who} />
      <FaqSection title={`Questions from ${s.crumb.toLowerCase()}`} list={s.faq} prefix={`${id}-faq`} />
      <CtaBand title={s.ctaT} body={s.ctaB} />
    </>
  );
}

