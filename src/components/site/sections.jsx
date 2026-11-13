"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MessageCircleQuestion, Quote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { HOW, IMG, PILLARS, PROJECTS, SITE, TESTI, WHO } from "../../data/site";
import { SERVICES } from "../../data/services";
import { GUIDES } from "../../data/guides";
import { Btn, Label, Reveal, Rich } from "./ui";
import { PILLAR_ICONS, SERVICE_ICONS } from "../../data/icons";
import BeforeAfter, { sampleBA } from "./BeforeAfter";
import BgVideo from "./BgVideo";
import { cn } from "../../lib/utils";

/* ---------- Page hero (photo banner under the transparent header) ---------- */
export const PageHero = ({ crumbs = [], title, lede, img, video, children, chip }) => (
  <section data-testid="page-hero" className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-forest pb-16 pt-36 text-white lg:min-h-[82vh] lg:pb-24">
    {video ? (
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 -z-10">
        <BgVideo name={video} eager className="h-full w-full" />
      </motion.div>
    ) : (
      <motion.img
        src={img}
        alt=""
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
    )}
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/60 to-forest/30" />
    <div className="wrap">
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
        <Link href="/" className="hover:text-lime">Home</Link>
        {crumbs.map(([l, to]) => (
          <span key={l} className="flex items-center gap-2">
            <span className="text-lime">/</span>
            {to ? <Link href={to} className="hover:text-lime">{l}</Link> : <span className="text-white">{l}</span>}
          </span>
        ))}
      </nav>
      <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="max-w-4xl font-display text-4xl font-light leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {lede && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-6 max-w-2xl text-base text-white/75 md:text-lg">
              {lede}
            </motion.p>
          )}
          {children && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex flex-wrap gap-3">
              {children}
            </motion.div>
          )}
        </div>
        {chip && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass hidden justify-self-end rounded-3xl p-6 lg:block lg:w-80">
            {chip}
          </motion.div>
        )}
      </div>
    </div>
  </section>
);

/* ---------- Answer block (AEO: short, quotable answer near the top) ---------- */
export const AnswerBlock = ({ title, text, testId = "answer-block" }) => (
  <section data-testid={testId} className="border-b border-forest/10 bg-white py-16 lg:py-20">
    <div className="wrap grid gap-8 lg:grid-cols-[0.8fr_2fr]">
      <Reveal><Label>The short answer</Label><h2 className="mt-4 font-display text-2xl font-light text-forest md:text-3xl">{title}</h2></Reveal>
      <Reveal delay={0.1}><p className="border-l-2 border-lime pl-6 font-display text-xl font-light leading-relaxed text-forest/85 md:text-2xl"><Rich text={text} /></p></Reveal>
    </div>
  </section>
);

/* ---------- Section head ---------- */
export const Head = ({ label, title, intro, dark, action, className }) => (
  <div className={cn("mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end", className)}>
    <Reveal className="max-w-2xl">
      <Label dark={dark}>{label}</Label>
      <h2 className={cn("h-section mt-5", dark ? "text-white" : "text-forest")}>{title}</h2>
      {intro && <p className={cn("mt-5 text-base md:text-lg", dark ? "text-white/65" : "text-forest/65")}>{intro}</p>}
    </Reveal>
    {action && <Reveal delay={0.1}>{action}</Reveal>}
  </div>
);

/* ---------- Who we serve tiles ---------- */
export const WhoTiles = () => (
  <div className="grid gap-5 md:grid-cols-3">
    {WHO.map((w, i) => (
      <Reveal key={w.id} delay={i * 0.1}>
        <Link href={`/${w.id}`} data-testid={`who-tile-${w.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-[28px] bg-forest">
          <img src={w.img} alt={`${w.name} landscaping by Blue Heaven`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
          <span className="absolute left-6 top-6 font-mono text-xs text-white/70">0{i + 1}</span>
          <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-lime/70 text-lime transition-all duration-500 group-hover:rotate-45 group-hover:bg-lime group-hover:text-forest">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          <div className="absolute inset-x-6 bottom-6 text-white">
            <h3 className="font-display text-3xl font-light">{w.name}</h3>
            <p className="mt-2 max-w-xs text-sm text-white/75">{w.line}</p>
          </div>
        </Link>
      </Reveal>
    ))}
  </div>
);

/* ---------- Services glass band (dark photo + glass cards) ---------- */
export const ServicesBand = ({ title = "Seven ways to make a space green", intro = "Each one is designed for your site, built by our own team, and planned with water from day one.", only }) => {
  const list = only ? SERVICES.filter((s) => only.includes(s.id)) : SERVICES;
  return (
    <section data-testid="services-band" className="relative isolate overflow-hidden bg-forest py-24 text-white lg:py-32">
      <img src={IMG.fernBlack} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest via-forest/70 to-forest" />
      <div className="wrap">
        <Head dark label="What we do" title={title} intro={intro} action={<Btn to="/services" variant="ghostLight" testId="services-band-all">All services</Btn>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id];
            return (
            <Reveal key={s.id} delay={(i % 4) * 0.08}>
              <Link href={`/services/${s.id}`} data-testid={`service-card-${s.id}`} className="glass group flex h-full min-h-[270px] flex-col justify-between rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-lime/60 hover:bg-white/15">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime text-forest transition-transform duration-500 group-hover:scale-110"><Icon className="h-5 w-5" strokeWidth={1.75} /></span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {s.tags.map((t) => <span key={t} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/75">{t}</span>)}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light">{s.name}</h3>
                  <p className="mt-2 text-sm text-white/65">{s.short}</p>
                </div>
              </Link>
            </Reveal>
            );
          })}
          {!only && (
            <Reveal delay={0.24}>
              <Link href="/book" data-testid="service-card-not-sure" className="group flex h-full min-h-[270px] flex-col justify-between rounded-3xl border border-lime bg-lime p-6 text-forest transition-colors duration-500 hover:bg-forest hover:text-lime">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-lime"><MessageCircleQuestion className="h-5 w-5" strokeWidth={1.75} /></span>
                <div>
                  <h3 className="font-display text-2xl font-light">Not sure which fits?</h3>
                  <p className="mt-2 text-sm opacity-80">Book a consultation and we will tell you what suits your space.</p>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- How we work slider ---------- */
export const HowSlider = ({ steps = HOW }) => {
  const [i, setI] = useState(0);
  const go = (d) => setI((p) => (p + d + steps.length) % steps.length);
  const s = steps[i];
  return (
    <div data-testid="how-slider" className="grid overflow-hidden rounded-[32px] bg-forest text-white lg:grid-cols-2">
      <div className="flex min-h-[460px] flex-col justify-between p-8 lg:p-12">
        <div className="flex items-baseline gap-2 font-display">
          <span className="text-6xl font-light text-lime">{i + 1}</span>
          <span className="text-lg text-white/40">/ {steps.length}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.45 }}>
            <h3 className="font-display text-4xl font-light sm:text-5xl" data-testid="how-step-title">{s.t}</h3>
            <p className="mt-4 max-w-md text-white/70">{s.d}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center gap-3">
          <button onClick={() => go(-1)} data-testid="how-prev-btn" aria-label="Previous step" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-lime hover:text-lime"><ArrowLeft className="h-4 w-4" /></button>
          <button onClick={() => go(1)} data-testid="how-next-btn" aria-label="Next step" className="flex h-12 w-12 items-center justify-center rounded-full border border-lime bg-lime text-forest transition-colors hover:bg-transparent hover:text-lime"><ArrowRight className="h-4 w-4" /></button>
          <div className="ml-3 flex gap-1.5">
            {steps.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Step ${k + 1}`} data-testid={`how-dot-${k}`} className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-8 bg-lime" : "w-3 bg-white/25")} />
            ))}
          </div>
        </div>
      </div>
      <div className="relative min-h-[320px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img key={i} src={s.img} alt={s.t} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0 h-full w-full object-cover" />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-forest/60 to-transparent" />
      </div>
    </div>
  );
};

/* ---------- Pillars ---------- */
export const Pillars = ({ dark = false }) => (
  <div className="grid gap-px overflow-hidden rounded-3xl bg-forest/10 sm:grid-cols-2 lg:grid-cols-4">
    {PILLARS.map(([t, d], i) => {
      const Icon = PILLAR_ICONS[i];
      return (
      <Reveal key={t} delay={i * 0.08} className={cn("group p-8 transition-colors duration-500", dark ? "bg-forest hover:bg-forest-800" : "bg-white hover:bg-mist")}>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-lime transition-transform duration-500 group-hover:scale-110"><Icon className="h-5 w-5" strokeWidth={1.75} /></span>
        <h3 className={cn("mt-10 font-display text-xl font-medium", dark ? "text-white" : "text-forest")}>{t}</h3>
        <p className={cn("mt-3 text-sm leading-relaxed", dark ? "text-white/65" : "text-forest/65")}>{d}</p>
      </Reveal>
      );
    })}
  </div>
);

/* ---------- Promise band ---------- */
export const PromiseBand = ({ body }) => (
  <section data-testid="promise-band" className="bg-forest py-24 text-white lg:py-32">
    <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
      <Reveal>
        <Label dark>Our promise</Label>
        <p className="mt-6 font-display text-5xl font-light leading-none tracking-tight sm:text-6xl lg:text-7xl">We do not do <span className="text-lime">cheap.</span></p>
      </Reveal>
      <Reveal delay={0.1}><p className="text-lg leading-relaxed text-white/70">{body}</p></Reveal>
    </div>
  </section>
);

/* ---------- Projects grid ---------- */
export const ProjectCard = ({ p, i, big }) => (
  <Reveal delay={(i % 3) * 0.08} className={cn(big && "md:col-span-2 md:row-span-2")}>
    <article data-testid={`project-card-${i}`} className="group relative h-full overflow-hidden rounded-[28px] bg-forest">
      <img src={p.img} alt={`${p.label} landscape`} className={cn("w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105", big ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]")} loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/10 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-lime px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-forest">{p.label}</span>
      <div className="absolute inset-x-5 bottom-5 text-white">
        <h3 className="font-display text-xl font-light"><Rich text={p.name} dark /></h3>
        <p className="mt-1.5 text-sm text-white/70">{p.line}</p>
      </div>
    </article>
  </Reveal>
);

export const ProjectsTeaser = ({ type, title = "Recent work" }) => {
  const list = PROJECTS.filter((p) => !type || p.type === type).slice(0, 3);
  return (
    <section data-testid="projects-teaser" className="bg-white py-24 lg:py-32">
      <div className="wrap">
        <Head label="Our work" title={title} intro="Resorts, commercial spaces and homes we have shaped." action={<Btn to="/projects" variant="ghostDark" testId="projects-see-all">See all projects</Btn>} />
        <div className="grid gap-5 md:grid-cols-3">
          {!type && (
            <Reveal className="md:col-span-2 md:row-span-2">
              <BeforeAfter {...sampleBA("terrace-garden")} alt="Terrace garden" testId="home-ba" aspect="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[520px]" />
            </Reveal>
          )}
          {(type ? list : list.slice(1)).map((p, i) => <ProjectCard key={i} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
};

/* ---------- Testimonials ---------- */
export const Testimonials = ({ who }) => {
  const list = who ? [who] : TESTI;
  const [i, setI] = useState(0);
  return (
    <section data-testid="testimonials" className="bg-mist py-24 lg:py-32">
      <div className="wrap max-w-4xl text-center">
        <Label>In their words</Label>
        <Quote className="mx-auto mt-8 h-10 w-10 text-forest/20" />
        <AnimatePresence mode="wait">
          <motion.blockquote key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4 }} className="mt-6 font-display text-2xl font-light leading-snug text-forest md:text-4xl">
            “<Rich text={`[[A short review from a ${list[i]}, in their own words, used with written permission.]]`} />”
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-forest/70">
          <span className="h-10 w-10 rounded-full bg-forest/15" />
          <Rich text="[[Name, Role, Place]]" />
        </div>
        {list.length > 1 && (
          <div className="mt-8 flex justify-center gap-3">
            <button onClick={() => setI((i - 1 + list.length) % list.length)} data-testid="testi-prev-btn" aria-label="Previous review" className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest hover:border-forest"><ArrowLeft className="h-4 w-4" /></button>
            <button onClick={() => setI((i + 1) % list.length)} data-testid="testi-next-btn" aria-label="Next review" className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-lime hover:bg-forest-800"><ArrowRight className="h-4 w-4" /></button>
          </div>
        )}
      </div>
    </section>
  );
};

/* ---------- Insights list ---------- */
export const InsightItem = ({ g, i }) => (
  <Reveal delay={(i % 4) * 0.06}>
    <Link href={`/insights/${g.id}`} data-testid={`insight-${g.id}`} className="group grid grid-cols-[120px_1fr] items-center gap-5 rounded-3xl bg-mist p-3 pr-6 transition-colors duration-300 hover:bg-forest sm:grid-cols-[160px_1fr]">
      <div className="overflow-hidden rounded-2xl"><img src={g.img} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" /></div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-forest/50 group-hover:text-lime">Guide</p>
        <h3 className="mt-2 font-display text-lg font-medium leading-snug text-forest group-hover:text-white">{g.title}</h3>
      </div>
    </Link>
  </Reveal>
);

export const InsightsTeaser = () => (
  <section data-testid="insights-teaser" className="bg-white py-24 lg:py-32">
    <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.5fr]">
      <Reveal>
        <Label>Insights</Label>
        <h2 className="h-section mt-5 text-forest">Straight answers, before you spend a rupee</h2>
        <p className="mt-5 max-w-md text-forest/65">Plain guides on lawns, turf, terraces, irrigation and resort landscaping.</p>
        <Btn to="/insights" variant="dark" className="mt-8" testId="insights-all-btn">All guides</Btn>
      </Reveal>
      <div className="grid gap-3">{GUIDES.slice(0, 4).map((g, i) => <InsightItem key={g.id} g={g} i={i} />)}</div>
    </div>
  </section>
);

/* ---------- FAQ ---------- */
export const FaqList = ({ list, prefix = "faq" }) => (
  <Accordion type="single" collapsible className="w-full">
    {list.map(([q, a], i) => (
      <AccordionItem key={q} value={`${prefix}-${i}`} className="border-forest/10">
        <AccordionTrigger data-testid={`${prefix}-q-${i}`} className="py-6 text-left font-display text-lg font-normal text-forest hover:no-underline md:text-xl">{q}</AccordionTrigger>
        <AccordionContent className="pb-6 text-base leading-relaxed text-forest/70"><Rich text={a} /></AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export const FaqSection = ({ title = "Straight answers", list, prefix }) => (
  <section data-testid="faq-section" className="bg-white py-24 lg:py-32">
    <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
      <Reveal>
        <Label>FAQ</Label>
        <h2 className="h-section mt-5 text-forest">{title}</h2>
        <Link href="/faq" className="mt-6 inline-block border-b border-forest/30 pb-0.5 text-forest hover:border-forest" data-testid="faq-see-all">See all questions</Link>
      </Reveal>
      <Reveal delay={0.1}><FaqList list={list} prefix={prefix} /></Reveal>
    </div>
  </section>
);

/* ---------- CTA band ---------- */
export const CtaBand = ({ title = "Ready to make your space greener?", body = "Book a consultation. Tell us about your space, pick a time, and we will plan a visit.", svc }) => (
  <section data-testid="cta-band" className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
    <div className="relative isolate overflow-hidden rounded-[36px] bg-forest py-24 text-white lg:py-32">
      <BgVideo name="cta-moss" className="absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/50 to-forest/70" />
      <div className="wrap text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-white/75 md:text-lg">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Btn to={svc ? `/book?service=${svc}` : "/book"} testId="cta-book-btn">Book a consultation</Btn>
            <Btn href={SITE.whatsapp} variant="ghostLight" testId="cta-whatsapp-btn">WhatsApp us</Btn>
          </div>
          <p className="mt-6 text-sm text-white/60">Prefer to talk now? Call <a href={SITE.phoneHref} className="text-lime hover:underline" data-testid="cta-call-link">{SITE.phone}</a></p>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------- Tick list ---------- */
export const Ticks = ({ items, dark }) => (
  <ul className="space-y-3">
    {items.map((x) => (
      <li key={x} className={cn("flex items-start gap-3", dark ? "text-white/80" : "text-forest/80")}>
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-forest"><Check className="h-3 w-3" strokeWidth={3} /></span>
        <span><Rich text={x} dark={dark} /></span>
      </li>
    ))}
  </ul>
);

