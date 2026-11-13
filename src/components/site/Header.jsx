"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NAV, SITE, IMG } from "../../data/site";
import { SERVICES } from "../../data/services";
import { BhlMark, Btn } from "./ui";
import { FallbackIcon, SERVICE_ICONS, WHO_ICONS } from "../../data/icons";
import { cn } from "../../lib/utils";

const Mega = ({ open, children, wide }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.22 }}
        className={cn("absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4", wide ? "w-[760px]" : "w-[560px]")}
      >
        <div className="overflow-hidden rounded-3xl border border-forest/10 bg-white p-3 shadow-[0_30px_80px_-20px_rgba(6,40,3,0.35)]">{children}</div>
      </motion.div>
    )}
  </AnimatePresence>
);

const MenuItem = ({ to, label, sub, testId, icon: Icon = FallbackIcon }) => (
  <Link href={to} data-testid={testId} className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-mist">
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-lime transition-transform group-hover:scale-110">
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </span>
    <span>
      <span className="block font-display text-[15px] font-medium text-forest">{label}</span>
      <span className="block text-[13px] text-forest/60">{sub}</span>
    </span>
  </Link>
);

const DesktopNav = ({ menu, setMenu }) => {
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMenu(null)}>
      <div className="relative" onMouseEnter={() => setMenu("who")}>
        <button data-testid="nav-who-we-serve" className="flex items-center gap-1 rounded-full px-4 py-2 text-[14px] text-white/90 hover:text-lime" onClick={() => setMenu(menu === "who" ? null : "who")}>
          Who we serve <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menu === "who" && "rotate-180")} />
        </button>
        <Mega open={menu === "who"}>
          <div className="grid grid-cols-[1fr_200px] gap-2">
            <div>{NAV.who.map((n) => <MenuItem key={n.to} {...n} icon={WHO_ICONS[n.to]} testId={`mega-${n.label.toLowerCase()}`} />)}</div>
            <div className="relative overflow-hidden rounded-2xl">
              <img src={IMG.resortPath} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 font-display text-sm text-white">Every space has a different job.</p>
            </div>
          </div>
        </Mega>
      </div>
      <div className="relative" onMouseEnter={() => setMenu("what")}>
        <button data-testid="nav-what-we-do" className="flex items-center gap-1 rounded-full px-4 py-2 text-[14px] text-white/90 hover:text-lime" onClick={() => setMenu(menu === "what" ? null : "what")}>
          What we do <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menu === "what" && "rotate-180")} />
        </button>
        <Mega open={menu === "what"} wide>
          <div className="grid grid-cols-2 gap-1">
            {SERVICES.map((s) => <MenuItem key={s.id} to={`/services/${s.id}`} label={s.name} sub={s.short} icon={SERVICE_ICONS[s.id]} testId={`mega-${s.id}`} />)}
            <Link href="/services" data-testid="mega-all-services" className="flex items-center justify-between rounded-2xl bg-forest p-4 text-white transition-colors hover:text-lime">
              <span className="font-display">All services &amp; how we work</span><span className="font-mono text-xs text-lime">→</span>
            </Link>
          </div>
        </Mega>
      </div>
      {[["/projects", "Projects"], ["/insights", "Insights"], ["/about", "About"]].map(([to, l]) => {
        const isActive = pathname === to || pathname?.startsWith(`${to}/`);
        return (
          <Link key={to} href={to} data-testid={`nav-${l.toLowerCase()}`} className={cn("rounded-full px-4 py-2 text-[14px] transition-colors hover:text-lime", isActive ? "text-lime" : "text-white/90")}>
            {l}
          </Link>
        );
      })}
    </nav>
  );
};

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <button data-testid="mobile-menu-btn" aria-label="Open menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white lg:hidden">
        <Menu className="h-5 w-5" />
      </button>
    </SheetTrigger>
    <SheetContent side="right" className="w-full overflow-y-auto border-none bg-forest p-8 text-white sm:max-w-md">
      <SheetTitle className="sr-only">Menu</SheetTitle>
      <BhlMark className="text-white" />
      <div className="mt-10 space-y-8">
        <div>
          <p className="label label-dark mb-3">Who we serve</p>
          {NAV.who.map((n) => <Link key={n.to} href={n.to} className="block py-2 font-display text-2xl font-light">{n.label}</Link>)}
        </div>
        <div>
          <p className="label label-dark mb-3">What we do</p>
          <div className="grid grid-cols-2 gap-x-4">
            {SERVICES.map((s) => <Link key={s.id} href={`/services/${s.id}`} className="block py-1.5 text-white/80">{s.name}</Link>)}
          </div>
        </div>
        <div className="space-y-2">
          {[["/services", "All services"], ["/how-we-work", "How we work"], ["/projects", "Projects"], ["/insights", "Insights"], ["/about", "About"], ["/faq", "FAQ"], ["/contact", "Contact"]].map(([to, l]) => (
            <Link key={to} href={to} className="block py-1 text-lg text-white/90">{l}</Link>
          ))}
        </div>
        <Btn to="/book" testId="mobile-book-btn">Book a consultation</Btn>
      </div>
    </SheetContent>
  </Sheet>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setMenu(null);
  }, [pathname]);

  return (
    <header data-testid="site-header" className={cn("fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-500", scrolled ? "bg-forest/95 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl" : "bg-transparent py-5")}>
      <div className="wrap flex items-center justify-between gap-6">
        <Link href="/" data-testid="header-logo" aria-label="Blue Heaven Landscape home" className="text-white">
          <BhlMark />
        </Link>
        <DesktopNav menu={menu} setMenu={setMenu} />
        <div className="flex items-center gap-2">
          <a href={SITE.phoneHref} data-testid="header-call-btn" aria-label="Call Blue Heaven" className="hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-lime hover:text-lime sm:flex">
            <Phone className="h-4 w-4" />
          </a>
          <Btn to="/book" testId="header-book-btn" className="hidden sm:inline-flex">Book a consultation</Btn>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
