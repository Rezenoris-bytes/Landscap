"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { GUIDES, guideById } from "@/data/guides";
import { svcById } from "@/data/services";
import { crumbsLd, faqLd, useSeo } from "@/lib/seo";
import { Btn, Label, Reveal } from "@/components/site/ui";
import {
  AnswerBlock, CtaBand, PageHero,
} from "@/components/site/sections";

export default function BlogPostPage() {
  const params = useParams();
  const id = params?.id;
  const g = guideById[id];
  const path = `/blog/${id}`;

  useSeo({
    title: g ? `${g.title} | Blue Heaven Landscape` : "Guide not found | Blue Heaven Landscape",
    desc: g ? g.desc : "",
    path,
    ld: g ? [faqLd([[g.title, g.answer]]), crumbsLd([["Home", "/"], ["Blog", "/blog"], [g.title, path]])] : [],
  });

  if (!g) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-display text-3xl font-light text-forest">Guide not found</h1>
        <p className="mt-3 text-forest/70">The guide you are looking for does not exist.</p>
        <Btn to="/blog" className="mt-6">Back to all articles</Btn>
      </div>
    );
  }

  const s = svcById[g.service];

  return (
    <>
      <PageHero
        crumbs={[["Blog", "/blog"], ["Guide"]]}
        title={g.title}
        lede="By Bharath, Marketing Head, Blue Heaven Landscape · 8 min read"
        img={g.img}
      />

      <AnswerBlock title="Quick answer" text={g.answer} />

      <section className="bg-white py-20 lg:py-28" data-testid="blog-points">
        <div className="wrap max-w-4xl">
          <Label>Key considerations</Label>
          <div className="mt-8 divide-y divide-forest/10 border-y border-forest/10">
            {g.points.map(([t, d], i) => (
              <Reveal key={t} className="grid gap-3 py-7 md:grid-cols-[60px_1fr_1.4fr]">
                <span className="font-mono text-xs text-forest/40">0{i + 1}</span>
                <h2 className="font-display text-xl font-medium text-forest">{t}</h2>
                <p className="text-forest/70">{d}</p>
              </Reveal>
            ))}
          </div>

          {s && (
            <p className="mt-10 text-forest/75">
              Related service:{" "}
              <Link
                href={`/services/${s.id}`}
                className="font-medium text-forest underline decoration-lime decoration-2 underline-offset-4 hover:text-lime-700"
                data-testid="blog-related-service"
              >
                {s.name}
              </Link>
            </p>
          )}
        </div>
      </section>

      <CtaBand
        title="Planning your landscape?"
        body="Book a consultation call. We will understand your space and suggest the right option."
      />
    </>
  );
}

