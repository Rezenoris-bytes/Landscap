"use client";

import { useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as FieldLabel } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICES, svcById } from "@/data/services";
import { IMG, SITE } from "@/data/site";
import { useSeo } from "@/lib/seo";
import { Btn, Label, Rich } from "@/components/site/ui";
import { PageHero } from "@/components/site/sections";
import { cn } from "@/lib/utils";

const SPACES = {
  resort: ["Resort", "Arrival, pool, lawns"],
  commercial: ["Commercial", "Office, hotel, school"],
  home: ["Home", "Villa, terrace, balcony"],
};
const TIMELINES = ["As soon as possible", "Within 1 month", "In 1 to 3 months", "Just exploring"];
const TIMES = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
const STEPS = ["Your space", "Your details", "Pick a time"];

const errText = (d) =>
  typeof d === "string" ? d : Array.isArray(d) ? d.map((e) => e.msg).join(" ") : "Something went wrong. Please try again.";

const Field = ({ label, error, children, htmlFor }) => (
  <div className="space-y-2">
    <FieldLabel htmlFor={htmlFor} className="font-mono text-[11px] uppercase tracking-[0.16em] text-forest/60">{label}</FieldLabel>
    {children}
    {error && <p className="text-sm text-red-600" data-testid={`error-${htmlFor}`}>{error}</p>}
  </div>
);

const inputCls = "h-12 rounded-xl border-forest/15 bg-white text-forest focus-visible:ring-lime";

const StepSpace = ({ b, set, errors }) => (
  <div className="space-y-8">
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-forest/60">Type of space</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {Object.entries(SPACES).map(([k, [t, d]]) => (
          <button type="button" key={k} onClick={() => set({ space: k })} data-testid={`book-space-${k}`} className={cn("rounded-2xl border p-4 text-left transition-all", b.space === k ? "border-forest bg-forest text-white" : "border-forest/15 hover:border-forest/40")}>
            <span className="flex items-center justify-between font-display text-lg">{t}{b.space === k && <Check className="h-4 w-4 text-lime" />}</span>
            <span className={cn("text-sm", b.space === k ? "text-white/70" : "text-forest/60")}>{d}</span>
          </button>
        ))}
      </div>
      {errors.space && <p className="mt-2 text-sm text-red-600" data-testid="error-space">{errors.space}</p>}
    </div>
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-forest/60">What are you thinking of? (pick any)</p>
      <div className="flex flex-wrap gap-2">
        {SERVICES.map((s) => {
          const on = b.services.includes(s.id);
          return (
            <button type="button" key={s.id} data-testid={`book-service-${s.id}`} onClick={() => set({ services: on ? b.services.filter((x) => x !== s.id) : [...b.services, s.id] })} className={cn("rounded-full border px-4 py-2 text-sm transition-colors", on ? "border-lime bg-lime text-forest" : "border-forest/15 text-forest hover:border-forest/40")}>
              {s.name}
            </button>
          );
        })}
      </div>
      {errors.services && <p className="mt-2 text-sm text-red-600" data-testid="error-services">{errors.services}</p>}
    </div>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="City or town" htmlFor="city" error={errors.city}>
        <Input id="city" data-testid="book-city-input" className={inputCls} value={b.city} onChange={(e) => set({ city: e.target.value })} placeholder="e.g. Coimbatore" />
      </Field>
      <Field label="When would you like to start?" htmlFor="timeline" error={errors.timeline}>
        <Select value={b.timeline} onValueChange={(v) => set({ timeline: v })}>
          <SelectTrigger id="timeline" data-testid="book-timeline-select" className={inputCls}><SelectValue placeholder="Choose one" /></SelectTrigger>
          <SelectContent>{TIMELINES.map((t) => <SelectItem key={t} value={t} data-testid={`book-timeline-${t.replace(/\s+/g, "-").toLowerCase()}`}>{t}</SelectItem>)}</SelectContent>
        </Select>
      </Field>
    </div>
  </div>
);

const StepDetails = ({ b, set, errors }) => (
  <div className="space-y-5">
    <Field label="Your name" htmlFor="name" error={errors.name}><Input id="name" data-testid="book-name-input" className={inputCls} value={b.name} onChange={(e) => set({ name: e.target.value })} /></Field>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Mobile number" htmlFor="phone" error={errors.phone}><Input id="phone" type="tel" data-testid="book-phone-input" className={inputCls} value={b.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+91" /></Field>
      <Field label="Email" htmlFor="email" error={errors.email}><Input id="email" type="email" data-testid="book-email-input" className={inputCls} value={b.email} onChange={(e) => set({ email: e.target.value })} /></Field>
    </div>
    <Field label="Anything we should know? (optional)" htmlFor="note"><Textarea id="note" data-testid="book-note-input" className="min-h-[110px] rounded-xl border-forest/15 text-forest focus-visible:ring-lime" value={b.note} onChange={(e) => set({ note: e.target.value })} placeholder="Size of the space, what you have in mind, photos you can share on WhatsApp..." /></Field>
    <div className="flex items-start gap-3">
      <Checkbox id="consent" data-testid="book-consent-checkbox" checked={b.consent} onCheckedChange={(v) => set({ consent: !!v })} className="mt-0.5 border-forest data-[state=checked]:bg-forest data-[state=checked]:text-lime" />
      <label htmlFor="consent" className="text-sm text-forest/70">Blue Heaven can contact me by phone, WhatsApp and email about this consultation. See our <Link href="/privacy-policy" className="underline">privacy policy</Link>.</label>
    </div>
    {errors.consent && <p className="text-sm text-red-600" data-testid="error-consent">{errors.consent}</p>}
  </div>
);

const StepTime = ({ b, set, errors }) => {
  const today = useMemo(() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }, []);
  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr]">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-forest/60">Date for your call</p>
        <div className="rounded-2xl border border-forest/15 p-2" data-testid="book-calendar">
          <Calendar mode="single" selected={b.date} onSelect={(d) => set({ date: d })} disabled={(d) => d <= today} />
        </div>
        {errors.date && <p className="mt-2 text-sm text-red-600" data-testid="error-date">{errors.date}</p>}
      </div>
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-forest/60">Time</p>
        <div className="grid grid-cols-2 gap-2">
          {TIMES.map((t) => (
            <button type="button" key={t} onClick={() => set({ time: t })} data-testid={`book-time-${t.replace(/[\s:]/g, "")}`} className={cn("rounded-xl border py-3 text-sm transition-colors", b.time === t ? "border-forest bg-forest text-lime" : "border-forest/15 text-forest hover:border-forest/40")}>{t}</button>
          ))}
        </div>
        {errors.time && <p className="mt-2 text-sm text-red-600" data-testid="error-time">{errors.time}</p>}
        {b.date && b.time && <p className="mt-5 rounded-xl bg-mist p-4 text-sm text-forest" data-testid="book-slot-summary">We will call you on <b>{format(b.date, "EEEE, d MMMM")}</b> at <b>{b.time}</b>.</p>}
      </div>
    </div>
  );
};

const validate = (step, b) => {
  const e = {};
  if (step === 0) {
    if (!b.space) e.space = "Pick the type of space.";
    if (!b.services.length) e.services = "Pick at least one service, or the one closest to your idea.";
    if (b.city.trim().length < 2) e.city = "Tell us the city or town.";
    if (!b.timeline) e.timeline = "Choose when you would like to start.";
  }
  if (step === 1) {
    if (b.name.trim().length < 2) e.name = "Please enter your name.";
    if (b.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a valid mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(b.email)) e.email = "Please enter a valid email.";
    if (!b.consent) e.consent = "Please agree so we can contact you.";
  }
  if (step === 2) {
    if (!b.date) e.date = "Pick a date.";
    if (!b.time) e.time = "Pick a time.";
  }
  return e;
};

function BookForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pre = searchParams?.get("service");
  const spaceParam = searchParams?.get("space");

  const [b, setB] = useState({
    space: SPACES[spaceParam] ? spaceParam : "",
    services: svcById[pre] ? [pre] : [],
    city: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
    note: "",
    consent: false,
    date: undefined,
    time: "",
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (p) => { setB((x) => ({ ...x, ...p })); setErrors({}); };

  const next = async () => {
    const e = validate(step, b);
    if (Object.keys(e).length) return setErrors(e);
    if (step < 2) return setStep(step + 1);
    setBusy(true);
    try {
      const payload = { ...b, date: format(b.date, "yyyy-MM-dd") };
      const { data } = await axios.post("/api/bookings", payload);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("last_booking", JSON.stringify(data));
      }
      router.push("/thank-you");
    } catch (err) {
      toast.error(errText(err.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  const Body = [StepSpace, StepDetails, StepTime][step];
  return (
    <>
      <PageHero crumbs={[["Book a consultation"]]} title="Book a consultation" lede="Three short steps. Tell us about your space, share your details, pick a time, and we plan your site visit." img={IMG.hero} />
      <section className="bg-white py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <aside>
            <Label>What happens next</Label>
            <ol className="mt-6 space-y-5">
              {[["We call you", "At the time you pick, to understand your space."], ["We visit your site", "We walk it with you and listen."], ["You see the design", "Then a clear quote. No pressure."]].map(([t, d], i) => (
                <li key={t} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest font-mono text-xs text-lime">0{i + 1}</span><div><h3 className="font-display text-lg text-forest">{t}</h3><p className="text-sm text-forest/60">{d}</p></div></li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-forest/60">Prefer to talk now? <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a> or call <a href={SITE.phoneHref} className="underline">{SITE.phone}</a>.</p>
          </aside>
          <div className="rounded-[32px] border border-forest/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(6,40,3,0.35)] sm:p-10" data-testid="booking-panel">
            <div className="mb-8 flex items-center gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex flex-1 flex-col gap-2">
                  <div className={cn("h-1 rounded-full transition-colors duration-500", i <= step ? "bg-forest" : "bg-forest/10")} />
                  <span className={cn("font-mono text-[10px] uppercase tracking-[0.16em]", i === step ? "text-forest" : "text-forest/40")}>{i + 1}. {s}</span>
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                <Body b={b} set={set} errors={errors} />
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center justify-between gap-3">
              {step > 0 ? (
                <button type="button" onClick={() => setStep(step - 1)} data-testid="book-back-btn" className="inline-flex items-center gap-2 rounded-full border border-forest/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-forest hover:border-forest"><ArrowLeft className="h-3.5 w-3.5" />Back</button>
              ) : <span />}
              <button type="button" onClick={next} disabled={busy} data-testid={step < 2 ? "book-next-btn" : "book-submit-btn"} className="inline-flex items-center gap-2 rounded-full border border-forest bg-forest px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:border-lime hover:text-lime disabled:opacity-60">
                {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {step < 2 ? "Continue" : "Book my consultation"}
                {!busy && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BookPage() {
  useSeo({
    title: "Book a landscaping consultation | Blue Heaven Landscape",
    desc: "Book a consultation in three short steps. Tell us about your space, pick a time, and we plan your site visit.",
    path: "/book",
  });

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <BookForm />
    </Suspense>
  );
}

