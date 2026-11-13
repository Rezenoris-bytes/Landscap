"use client";

import { IMG, SITE } from "@/data/site";
import { useSeo } from "@/lib/seo";
import { Rich } from "@/components/site/ui";
import { PageHero } from "@/components/site/sections";

export default function PrivacyPage() {
  useSeo({
    title: "Privacy policy | Blue Heaven Landscape",
    desc: "How Blue Heaven collects, uses and protects the details you share on this website.",
    path: "/privacy-policy",
  });
  const items = [
    ["What we collect", "The details you give us when you book: your name, phone number, email, city, type of space and any note."],
    ["Why we collect it", "To contact you about your consultation and your project. Nothing else."],
    ["Who we share it with", "No one, except the services we use to run the website."],
    ["Your choices", `You can ask us to see, change or delete your details at any time. Email ${SITE.email}.`]
  ];
  return (
    <>
      <PageHero
        crumbs={[["Privacy policy"]]}
        title="Privacy policy"
        lede={<>A plain summary of how we handle your details. <Rich text="[[Full policy to be reviewed by a lawyer]]" dark /></>}
        img={IMG.mossDark}
      />
      <section className="bg-white py-20">
        <div className="wrap max-w-3xl space-y-10">
          {items.map(([t, d]) => (
            <div key={t}>
              <h2 className="font-display text-2xl font-light text-forest">{t}</h2>
              <p className="mt-3 text-forest/70">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

