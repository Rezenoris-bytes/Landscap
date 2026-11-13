"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Check } from "lucide-react";
import { IMG, SITE } from "@/data/site";
import { svcById } from "@/data/services";
import { useSeo } from "@/lib/seo";
import { Btn, Label, Rich } from "@/components/site/ui";
import { PageHero } from "@/components/site/sections";

const SPACES = {
  resort: ["Resort", "Arrival, pool, lawns"],
  commercial: ["Commercial", "Office, hotel, school"],
  home: ["Home", "Villa, terrace, balcony"],
};

export default function ThankYouPage() {
  useSeo({
    title: "Consultation booked | Blue Heaven Landscape",
    desc: "Your consultation is booked. Here is what happens next.",
    path: "/thank-you",
    noindex: true,
  });

  const [booking, setBooking] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("last_booking");
      if (stored) {
        try {
          setBooking(JSON.parse(stored));
        } catch {}
      }
    }
  }, []);

  const k = booking || {
    name: "Customer",
    space: "resort",
    city: "Tamil Nadu",
    services: [],
    timeline: "Soon",
    date: new Date().toISOString().split("T")[0],
    time: "11:30 AM",
    phone: "",
    email: "",
  };

  let when = "our confirmed date";
  try {
    if (k.date) {
      when = format(new Date(`${k.date}T00:00:00`), "EEEE, d MMMM yyyy");
    }
  } catch {}

  return (
    <>
      <PageHero
        title={`You're booked, ${(k.name || "there").trim().split(" ")[0]}`}
        lede={`We will call you on ${when} at ${k.time || "the chosen time"}.`}
        img={IMG.cottageGarden}
      >
        <Btn href={SITE.whatsapp} testId="thanks-whatsapp-btn">Send photos on WhatsApp</Btn>
        <Btn to="/" variant="ghostLight" testId="thanks-home-btn">Back to home</Btn>
      </PageHero>
      <section className="bg-white py-20 lg:py-28" data-testid="thank-you-summary">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div className="rounded-[28px] bg-mist p-8">
            <Label>Your booking</Label>
            <dl className="mt-6 grid grid-cols-[110px_1fr] gap-y-3 text-forest">
              {[
                ["Space", `${(SPACES[k.space] || ["Space"])[0]} in ${k.city || "your city"}`],
                ["Services", (k.services || []).map((id) => svcById[id]?.name || id).join(", ") || "General landscape"],
                ["Start", k.timeline || "Soon"],
                ["Date", when],
                ["Time", k.time || "Scheduled"],
                ["Mobile", k.phone || "On file"],
                ["Email", k.email || "On file"],
              ].map(([a, v]) => (
                <div key={a} className="contents">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-forest/50">{a}</dt>
                  <dd className="break-all">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <Label>Keep these ready for the call</Label>
            <ul className="mt-6 space-y-3 text-forest/80">
              {[
                "A few photos of the space, from different sides",
                "The rough size, if you know it",
                "Any building or site drawings",
                "A budget range you have in mind",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 text-forest" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-forest/60">
              We confirm by phone or WhatsApp <Rich text="[[within one working day]]" />.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

