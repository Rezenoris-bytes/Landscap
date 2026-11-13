"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSeo } from "@/lib/seo";
import { BhlMark } from "@/components/site/ui";

const errText = (d) =>
  typeof d === "string" ? d : Array.isArray(d) ? d.map((e) => e.msg).join(" ") : "Something went wrong.";

export default function AdminLoginPage() {
  useSeo({ title: "Admin login | Blue Heaven Landscape", desc: "Admin", path: "/admin/login", noindex: true });
  const router = useRouter();
  const [f, setF] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await axios.post("/api/auth/login", f, { withCredentials: true });
      router.push("/admin");
    } catch (x) {
      setErr(errText(x.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest p-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[28px] bg-white p-8" data-testid="admin-login-form">
        <div className="-mx-2 -mt-2 rounded-2xl bg-forest p-5"><BhlMark /></div>
        <h1 className="mt-6 font-display text-3xl font-light text-forest">Bookings admin</h1>
        <div className="mt-6 space-y-3">
          <Input
            type="email"
            placeholder="Email"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
            data-testid="admin-email-input"
            className="h-12 rounded-xl"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            data-testid="admin-password-input"
            className="h-12 rounded-xl"
            required
          />
        </div>
        {err && <p className="mt-3 text-sm text-red-600" data-testid="admin-login-error">{err}</p>}
        <button
          disabled={busy}
          data-testid="admin-login-btn"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white hover:text-lime disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}Sign in
        </button>
      </form>
    </div>
  );
}

