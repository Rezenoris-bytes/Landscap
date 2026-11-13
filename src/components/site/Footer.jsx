"use client";

import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SITE, NAV } from "../../data/site";
import { SERVICES } from "../../data/services";
import { BhlMark } from "./ui";

const Col = ({ title, links }) => (
  <div>
    <p className="label label-dark mb-5">{title}</p>
    <ul className="space-y-2.5">
      {links.map(([to, l]) => (
        <li key={to}>
          <Link href={to} className="text-[15px] text-white/75 transition-colors hover:text-lime">{l}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative overflow-hidden bg-forest pb-24 pt-20 text-white lg:pb-0">
      <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <BhlMark />
          <p className="mt-5 max-w-xs font-display text-2xl font-light leading-snug">{SITE.tagline}</p>
          <p className="mt-4 max-w-xs text-sm text-white/60">Landscape design, build and irrigation for resorts, commercial spaces and homes in Tamil Nadu.</p>
        </div>
        <Col title="Who we serve" links={NAV.who.map((n) => [n.to, n.label])} />
        <Col title="What we do" links={SERVICES.map((s) => [`/services/${s.id}`, s.name])} />
        <Col title="Company" links={[["/how-we-work", "How we work"], ["/projects", "Projects"], ["/insights", "Insights"], ["/about", "About us"], ["/faq", "FAQ"], ["/contact", "Contact"]]} />
        <div>
          <p className="label label-dark mb-5">Talk to us</p>
          <div className="space-y-3 text-[15px]">
            <a href={SITE.phoneHref} data-testid="footer-phone" className="flex items-center gap-3 text-white/85 hover:text-lime"><Phone className="h-4 w-4 text-lime" />{SITE.phone}</a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp" className="flex items-center gap-3 text-white/85 hover:text-lime"><MessageCircle className="h-4 w-4 text-lime" />WhatsApp</a>
            <a href={`mailto:${SITE.email}`} data-testid="footer-email" className="flex items-center gap-3 break-all text-white/85 hover:text-lime"><Mail className="h-4 w-4 shrink-0 text-lime" />{SITE.email}</a>
          </div>
        </div>
      </div>
      <div className="wrap mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
        <span>© {new Date().getFullYear()} Blue Heaven Landscape (BHL). All rights reserved.</span>
        <Link href="/privacy-policy" className="hover:text-lime">Privacy policy</Link>
      </div>
      <p aria-hidden="true" className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[8.6vw] font-semibold leading-[0.95] tracking-tighter text-lime lg:mt-10">
        Blue Heaven Landscape
      </p>
    </footer>
  );
}
