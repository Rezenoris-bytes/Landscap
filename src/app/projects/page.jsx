"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IMG, PROJECTS } from "@/data/site";
import { SERVICES, svcById } from "@/data/services";
import { crumbsLd, useSeo } from "@/lib/seo";
import { fileUrl, useProjects } from "@/lib/api";
import { Reveal } from "@/components/site/ui";
import { CtaBand, Head, PageHero, ProjectCard } from "@/components/site/sections";
import BeforeAfter, { sampleBA } from "@/components/site/BeforeAfter";
import { cn } from "@/lib/utils";

const TYPE_LABEL = { resort: "Resort", commercial: "Commercial", home: "Home" };
const FILTERS = [["all", "All"], ["resort", "Resorts"], ["commercial", "Commercial"], ["home", "Homes"]];

const RealProject = ({ p, i }) => (
  <Reveal delay={(i % 2) * 0.08}>
    <article data-testid={`real-project-${p.id}`}>
      {p.before_path ? (
        <BeforeAfter before={fileUrl(p.before_path)} after={fileUrl(p.after_path)} alt={p.title} testId={`real-ba-${p.id}`} aspect="aspect-[4/3]" />
      ) : (
        <div className="overflow-hidden rounded-[28px]"><img src={fileUrl(p.after_path)} alt={p.title} className="aspect-[4/3] w-full object-cover" loading="lazy" /></div>
      )}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-forest px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-lime">{TYPE_LABEL[p.type]}</span>
        {p.service && svcById[p.service] && <span className="rounded-full border border-forest/20 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-forest/70">{svcById[p.service].name}</span>}
      </div>
      <h3 className="mt-3 text-2xl font-light text-forest">{p.title}{p.place && <span className="text-forest/50">, {p.place}</span>}</h3>
      {p.summary && <p className="mt-2 text-forest/65">{p.summary}</p>}
    </article>
  </Reveal>
);

const SampleBA = () => {
  const [sid, setSid] = useState(SERVICES[0].id);
  return (
    <section className="bg-mist py-24 lg:py-32" data-testid="sample-before-after">
      <div className="wrap">
        <Head label="Before and after" title="See what changes, service by service" intro="Pick a service and drag the handle." />
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Choose a service">
          {SERVICES.map((s) => (
            <button key={s.id} role="tab" aria-selected={sid === s.id} onClick={() => setSid(s.id)} data-testid={`ba-tab-${s.id}`} className={cn("rounded-full border px-4 py-2 text-sm transition-colors", sid === s.id ? "border-forest bg-forest text-lime" : "border-forest/20 bg-white text-forest hover:border-forest")}>
              {s.name}
            </button>
          ))}
        </div>
        <motion.div key={sid} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <BeforeAfter {...sampleBA(sid)} alt={svcById[sid].name} testId="projects-sample-ba" />
          <p className="mt-4 text-forest/65">{svcById[sid].short} <Link href={`/services/${sid}`} className="border-b border-forest/30 text-forest hover:border-forest" data-testid="ba-service-link">About {svcById[sid].name.toLowerCase()}</Link></p>
        </motion.div>
      </div>
    </section>
  );
};

export default function ProjectsPage() {
  useSeo({
    title: "Landscaping projects | Blue Heaven Landscape",
    desc: "See resort, commercial and home landscapes by Blue Heaven Landscape, with before and after photos and what we built.",
    path: "/projects",
    ld: [crumbsLd([["Home", "/"], ["Projects", "/projects"]])],
  });
  const [f, setF] = useState("all");
  const real = useProjects();
  const realList = (real || []).filter((p) => f === "all" || p.type === f);
  const samples = PROJECTS.filter((p) => f === "all" || p.type === f);
  const hasReal = real && real.length > 0;
  return (
    <>
      <PageHero crumbs={[["Projects"]]} title="Our work" lede="Resorts, commercial spaces and homes, shown with before and after photos and the client's permission." img={IMG.resortGarden} video="projects" />
      <section className="bg-white py-20 lg:py-28" data-testid="projects-page">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {FILTERS.map(([k, l]) => (
                <button key={k} onClick={() => setF(k)} data-testid={`project-filter-${k}`} aria-pressed={f === k} className={cn("rounded-full border px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors", f === k ? "border-forest bg-forest text-lime" : "border-forest/20 text-forest hover:border-forest")}>{l}</button>
              ))}
            </div>
          </div>
          {hasReal && (
            <>
              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2" data-testid="real-projects-grid">
                {realList.map((p, i) => <RealProject key={p.id} p={p} i={i} />)}
              </div>
              {realList.length === 0 && <p className="text-forest/60" data-testid="real-projects-empty">No projects in this category yet.</p>}
            </>
          )}
          {(!real || !hasReal) && (
            <motion.div layout className="grid gap-5 md:grid-cols-3">
              {samples.map((p, i) => <ProjectCard key={`${f}-${i}`} p={p} i={i} />)}
            </motion.div>
          )}
        </div>
      </section>
      <SampleBA />
      <CtaBand title="Want a space like these?" body="Book a consultation and tell us about yours." />
    </>
  );
}

