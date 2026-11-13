"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { SITE } from "../../data/site";

const MobileBar = () => (
  <div data-testid="mobile-action-bar" className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-full border border-white/10 bg-forest/95 p-1.5 shadow-2xl backdrop-blur-xl lg:hidden">
    <a href={SITE.phoneHref} data-testid="mobile-call-btn" className="flex items-center justify-center gap-2 rounded-full py-3 text-xs text-white"><Phone className="h-4 w-4 text-lime" />Call</a>
    <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" data-testid="mobile-whatsapp-btn" className="flex items-center justify-center gap-2 rounded-full py-3 text-xs text-white"><MessageCircle className="h-4 w-4 text-lime" />WhatsApp</a>
    <Link href="/book" data-testid="mobile-bar-book-btn" className="flex items-center justify-center gap-2 rounded-full bg-lime py-3 text-xs font-medium text-forest"><CalendarCheck className="h-4 w-4" />Book</Link>
  </div>
);

export default function Layout({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-forest">Skip to content</a>
      <Header />
      <main id="main">
        {children}
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
