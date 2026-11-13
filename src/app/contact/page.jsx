"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { IMG, SITE } from "@/data/site";
import { useSeo } from "@/lib/seo";
import { Btn, Reveal, Rich } from "@/components/site/ui";
import { PageHero } from "@/components/site/sections";

export default function ContactPage() {
  useSeo({
    title: "Contact Blue Heaven Landscape",
    desc: "Call, WhatsApp or email Blue Heaven. For a new project, book a consultation and we will plan a visit to your site.",
    path: "/contact",
  });
  const cards = [
    [Phone, "Phone", SITE.phone, SITE.phoneHref, "contact-phone"],
    [MessageCircle, "WhatsApp", "Message us on WhatsApp", SITE.whatsapp, "contact-whatsapp"],
    [Mail, "Email", SITE.email, `mailto:${SITE.email}`, "contact-email"],
  ];
  return (
    <>
      <PageHero crumbs={[["Contact"]]} title="Talk to us" lede="For a new project, the fastest way is to book a consultation. For anything else, use the details below." img={IMG.balcony}>
        <Btn to="/book" testId="contact-book">Book a consultation</Btn>
      </PageHero>
      <section className="bg-white py-20 lg:py-28">
        <div className="wrap grid gap-5 md:grid-cols-3">
          {cards.map(([Icon, t, v, href, id], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-testid={id} className="group flex h-full flex-col justify-between gap-10 rounded-[28px] border border-forest/10 p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-forest">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-lime transition-colors group-hover:bg-lime group-hover:text-forest"><Icon className="h-5 w-5" /></span>
                <div><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-forest/50 group-hover:text-white/60">{t}</p><p className="mt-2 break-all font-display text-xl text-forest group-hover:text-white">{v}</p></div>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="wrap mt-5 grid gap-5 md:grid-cols-3">
          {[["Hours", "[[Working days and hours]]"], ["Address", "[[Office address, if shown]]"], ["Suppliers and job seekers", "Email us with your details, and we will reply if there is a fit."]].map(([t, d]) => (
            <div key={t} className="rounded-[28px] bg-mist p-8"><h2 className="font-display text-lg font-medium text-forest">{t}</h2><p className="mt-2 text-forest/65"><Rich text={d} /></p></div>
          ))}
        </div>
      </section>
    </>
  );
}

