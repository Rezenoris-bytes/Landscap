"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, svcById } from "@/data/services";
import { guideById } from "@/data/guides";
import { SITE } from "@/data/site";
import { crumbsLd, faqLd, serviceLd, useSeo } from "@/lib/seo";
import { Btn, Label, Reveal, Rich } from "@/components/site/ui";
import {
  AnswerBlock, CtaBand, FaqSection, Head, PageHero, Ticks,
} from "@/components/site/sections";
import BeforeAfter, { sampleBA } from "@/components/site/BeforeAfter";

const Steps = ({ steps }) => (
  <section className="bg-forest py-24 text-white lg:py-32" data-testid="service-steps">
    <div className="wrap">
      <Head dark label="How we do it" title="Four steps, no guesswork" intro="You see the plan before we start." />
      <div className="grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.08} className="group bg-forest p-8 transition-colors duration-500 hover:bg-forest-800">
            <span className="font-display text-5xl font-light text-lime">0{i + 1}</span>
            <h3 className="mt-10 font-display text-xl font-medium">{t}</h3>
            <p className="mt-3 text-sm text-white/65">{d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const s = svcById[id];
  const g = s && guideById[s.guide];
  const path = `/services/${id}`;

  useSeo({
    title: s ? s.title : "Service not found | Blue Heaven Landscape",
    desc: s ? s.desc : "",
    path,
    ld: s ? [serviceLd(s.name, s.answer, path), faqLd(s.faq), crumbsLd([["Home", "/"], ["Services", "/services"], [s.name, path]])] : [],
  });

  if (!s) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-display text-3xl font-light text-forest">Service not found</h1>
        <p className="mt-3 text-forest/70">The service you are looking for does not exist.</p>
        <Btn to="/services" className="mt-6">Back to all services</Btn>
      </div>
    );
  }

  const others = SERVICES.filter((x) => x.id !== id).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[["What we do", "/services"], [s.name]]}
        title={s.h1}
        lede={`${s.short} Designed for your site and built by our own team.`}
        img={s.img}
        video={["irrigation", "lawn"].includes(s.id) ? s.id : undefined}
        chip={<><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Good for</p><div className="mt-3 flex flex-wrap gap-1.5">{s.tags.map((t) => <span key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs">{t}</span>)}</div></>}
      >
        <Btn to={`/book?service=${s.id}`} testId="service-book-btn">Book a consultation</Btn>
        <Btn href={SITE.whatsapp} variant="ghostLight" testId="service-whatsapp-btn">WhatsApp us</Btn>
      </PageHero>
      <AnswerBlock title={`What is a ${s.name.toLowerCase()}?`} text={s.answer} />
      <section className="bg-white py-24 lg:py-28" data-testid="service-suits-get">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[28px] bg-mist p-8 lg:p-10"><Label>Who it suits</Label><h2 className="mb-7 mt-4 font-display text-3xl font-light text-forest">Made for these spaces</h2><Ticks items={s.suits} /></Reveal>
          <Reveal delay={0.1} className="rounded-[28px] border border-forest/10 p-8 lg:p-10"><Label>What you get</Label><h2 className="mb-7 mt-4 font-display text-3xl font-light text-forest">Included in the job</h2><Ticks items={s.get} /></Reveal>
        </div>
      </section>
      <Steps steps={s.steps} />
      <section className="bg-white py-24 lg:py-28" data-testid="service-before-after">
        <div className="wrap">
          <Head label="Before and after" title={`The same space, before and after a ${s.name.toLowerCase()}`} intro="Drag the handle to compare." action={<Btn to="/projects" variant="ghostDark" testId="service-ba-projects">See projects</Btn>} />
          <Reveal><BeforeAfter {...sampleBA(s.id)} alt={s.name} testId={`ba-${s.id}`} /></Reveal>
        </div>
      </section>
      <section className="bg-white py-24 lg:py-28" data-testid="service-options-cost">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Label>Options</Label>
            <h2 className="mt-4 font-display text-3xl font-light text-forest sm:text-4xl">Choose what fits</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {s.options.map(([t, d]) => (
                <div key={t} className="rounded-3xl border border-forest/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest/30">
                  <h3 className="font-display text-xl font-medium text-forest">{t}</h3>
                  <p className="mt-2 text-sm text-forest/65"><Rich text={d} /></p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[28px] bg-forest p-8 text-white lg:p-10">
            <Label dark>What affects the cost</Label>
            <h2 className="mb-7 mt-4 font-display text-3xl font-light">Your quote depends on</h2>
            <Ticks items={s.cost} dark />
            <p className="mt-7 text-sm text-white/60">We give you a clear quote after seeing the site. Never cheap materials.</p>
          </Reveal>
        </div>
      </section>
      <section className="bg-mist py-20" data-testid="service-care">
        <div className="wrap grid gap-8 lg:grid-cols-[0.8fr_2fr]">
          <Label>Care in short</Label>
          <div>
            <p className="font-display text-2xl font-light leading-relaxed text-forest md:text-3xl">{s.care}</p>
            {g && <Link href={`/insights/${g.id}`} className="mt-6 inline-flex items-center gap-1.5 border-b border-forest/30 pb-0.5 text-forest hover:border-forest" data-testid="service-guide-link">Read: {g.title} <ArrowUpRight className="h-4 w-4" /></Link>}
          </div>
        </div>
      </section>
      <FaqSection title={`Questions about ${s.name.toLowerCase()}`} list={s.faq} prefix={`${id}-faq`} />
      <section className="bg-white pb-24" data-testid="related-services">
        <div className="wrap">
          <Label>Related services</Label>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.id} href={`/services/${o.id}`} className="group relative overflow-hidden rounded-[28px]" data-testid={`related-${o.id}`}>
                <img src={o.img} alt={o.name} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white"><h3 className="font-display text-2xl font-light">{o.name}</h3><p className="text-sm text-white/70">{o.short}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={`Thinking about a ${s.name.toLowerCase()}?`} body="Book a consultation. We will check your space and show you the plan first." svc={s.id} />
    </>
  );
}

