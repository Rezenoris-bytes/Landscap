"use client";

import { motion } from "framer-motion";
import { SPACES_MARQUEE, HOME_FAQ, SITE } from "@/data/site";
import { useSeo, faqLd } from "@/lib/seo";
import { Btn, Label, Reveal } from "@/components/site/ui";
import {
  CtaBand, FaqSection, Head, HowSlider, InsightsTeaser, Pillars, ProjectsTeaser, ServicesBand, Testimonials, WhoTiles,
} from "@/components/site/sections";
import BgVideo from "@/components/site/BgVideo";

const Hero = () => (
  <section data-testid="home-hero" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest text-white">
    <motion.div
      initial={{ scale: 1.15 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-0 -z-10 h-[60%] lg:h-full"
    >
      <BgVideo name="home-hero" eager className="h-full w-full" label="Close-up of green fern leaves moving in soft forest light" />
    </motion.div>
    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/30 to-forest/40" />
    <div className="absolute inset-x-0 top-[35%] -z-10 h-[26%] bg-gradient-to-b from-transparent to-forest lg:hidden" />
    <div className="wrap grid items-end gap-10 pb-28 pt-[52svh] lg:pt-40 lg:grid-cols-[1.5fr_1fr] lg:pb-20">
      <div>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="label label-dark">{SITE.tagline}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45 }} className="mt-5 max-w-3xl font-display text-4xl font-light leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          Landscapes you see <span className="text-lime">before</span> we build them.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
          Landscape design, build and irrigation for resorts, commercial spaces and homes in Tamil Nadu. One team from the first sketch to the last sprinkler. Fair price, never cheap work.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-9 flex flex-wrap gap-3">
          <Btn to="/book" testId="hero-book-btn">Book a consultation</Btn>
          <Btn to="/projects" variant="ghostLight" testId="hero-work-btn">See our work</Btn>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="glass hidden justify-self-end rounded-3xl p-6 lg:block lg:w-80" data-testid="hero-stat-card">
        <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Since day one</span><span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[10px] text-forest">BHL</span></div>
        <p className="mt-4 font-display text-5xl font-light">4+ <span className="text-2xl text-white/70">years</span></p>
        <p className="mt-2 text-sm text-white/70">of designing, building and caring for green spaces.</p>
        <div className="mt-5 flex flex-wrap gap-1.5">{["Design", "Build", "Irrigation"].map((t) => <span key={t} className="rounded-full border border-white/25 px-2.5 py-1 text-[11px]">{t}</span>)}</div>
      </motion.div>
    </div>
  </section>
);

const Marquee = () => (
  <div className="overflow-hidden border-b border-forest/10 bg-white py-6" aria-label="Spaces we work on" data-testid="spaces-marquee">
    <div className="flex w-max animate-marquee gap-12">
      {[...SPACES_MARQUEE, ...SPACES_MARQUEE].map((s, i) => (
        <span key={i} className="flex items-center gap-12 font-display text-2xl font-light text-forest/80">
          {s}<span className="h-2 w-2 rounded-full bg-lime ring-4 ring-forest/5" />
        </span>
      ))}
    </div>
  </div>
);

const Intro = () => (
  <section data-testid="home-intro" className="bg-white py-24 lg:py-32">
    <div className="wrap grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-center">
      <Reveal>
        <Label>About Blue Heaven</Label>
        <h2 className="mt-5 font-display text-3xl font-light leading-tight text-forest sm:text-4xl lg:text-5xl">
          We design, build and care for green spaces, from the first sketch to the last sprinkler.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-forest/65">
          Blue Heaven Landscape (BHL) works with resorts, businesses and homes across Tamil Nadu. We listen first, show you the design, and build only what you approve.
        </p>
        <Btn to="/about" variant="dark" className="mt-8" testId="intro-about-btn">More about us</Btn>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="relative overflow-hidden rounded-[28px] bg-mist p-7" data-testid="intro-project-card">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg text-forest">How a project runs</span>
            <span className="rounded-full bg-forest px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-lime">Simple</span>
          </div>
          <ol className="mt-6 space-y-2">
            {["Book a consultation", "Site visit", "Design you approve", "Build and handover"].map((t, i) => (
              <li key={t} className="group flex items-center gap-4 rounded-2xl bg-white px-4 py-3.5 transition-transform duration-300 hover:translate-x-1">
                <span className="font-mono text-xs text-forest/40">0{i + 1}</span>
                <span className="text-forest">{t}</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-forest/15 transition-colors group-hover:bg-lime" />
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  useSeo({
    title: "Landscaping for resorts, offices and homes | Blue Heaven Landscape",
    desc: "Blue Heaven designs, builds and cares for landscapes for resorts, commercial spaces and homes in Tamil Nadu. See the design first. Book a consultation.",
    path: "/",
    ld: [faqLd(HOME_FAQ)],
  });
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <section className="bg-white pb-24 lg:pb-32">
        <div className="wrap">
          <Head label="Who we serve" title="Which space are we talking about?" intro="Every space has a different job. Pick yours and see what we do for it." />
          <WhoTiles />
        </div>
      </section>
      <ServicesBand />
      <section className="bg-white py-24 lg:py-32">
        <div className="wrap">
          <Head label="How we work" title="You see it before we build it" intro="Most landscaping goes wrong because nobody showed the client the plan. We do it the other way round." action={<Btn to="/how-we-work" variant="ghostDark" testId="home-how-all">See every step</Btn>} />
          <HowSlider />
        </div>
      </section>
      <section className="bg-mist py-24 lg:py-32" data-testid="home-pillars">
        <div className="wrap">
          <Head label="What we stand for" title={<>We do not do cheap.</>} intro="We keep our price fair, but we never lower the quality to win a job. If a budget cannot pay for good work, we say so, and give honest advice instead." />
          <Pillars />
        </div>
      </section>
      <ProjectsTeaser />
      <Testimonials />
      <InsightsTeaser />
      <FaqSection list={HOME_FAQ} prefix="home-faq" />
      <CtaBand />
    </>
  );
}

