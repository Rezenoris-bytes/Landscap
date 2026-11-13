"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ImagePlus, Loader2, LogOut, Phone, RefreshCw, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SERVICES, svcById } from "@/data/services";
import { fileUrl } from "@/lib/api";
import { useSeo } from "@/lib/seo";
import { BhlMark } from "@/components/site/ui";
import { cn } from "@/lib/utils";

const STATUSES = ["new", "contacted", "site-visit", "closed"];
const SPACE = { resort: "Resort", commercial: "Commercial", home: "Home" };
const errText = (d) =>
  typeof d === "string" ? d : Array.isArray(d) ? d.map((e) => e.msg).join(" ") : "Something went wrong.";

export default function AdminPage() {
  useSeo({ title: "Bookings | Blue Heaven admin", desc: "Admin", path: "/admin", noindex: true });
  const router = useRouter();
  const [rows, setRows] = useState(null);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try {
      const { data } = await axios.get("/api/bookings", { withCredentials: true });
      setRows(data);
    } catch (x) {
      if (x.response?.status === 401) router.push("/admin/login");
      else toast.error("Could not load bookings");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    try {
      const { data } = await axios.patch(`/api/bookings/${id}`, { status }, { withCredentials: true });
      setRows((r) => r.map((x) => (x.id === id ? data : x)));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`/api/bookings/${id}`, { withCredentials: true });
      setRows((r) => r.filter((x) => x.id !== id));
      toast.success("Booking deleted");
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    router.push("/admin/login");
  };

  const list = (rows || []).filter((r) => filter === "all" || r.status === filter);

  return (
    <div className="min-h-screen bg-mist">
      <header className="bg-forest py-5 text-white">
        <div className="wrap flex items-center justify-between">
          <BhlMark />
          <button
            onClick={logout}
            data-testid="admin-logout-btn"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-lime"
          >
            <LogOut className="h-4 w-4" />Sign out
          </button>
        </div>
      </header>
      <main className="wrap py-10">
        <Tabs defaultValue="bookings">
          <TabsList className="mb-8 rounded-full bg-white p-1">
            <TabsTrigger value="bookings" data-testid="admin-tab-bookings" className="rounded-full px-5 data-[state=active]:bg-forest data-[state=active]:text-lime">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="projects" data-testid="admin-tab-projects" className="rounded-full px-5 data-[state=active]:bg-forest data-[state=active]:text-lime">
              Projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-4xl font-light text-forest">Consultation bookings</h1>
                <p className="mt-1 text-forest/60" data-testid="admin-count">
                  {rows ? `${rows.length} total · ${rows.filter((r) => r.status === "new").length} new` : "Loading..."}
                </p>
              </div>
              <div className="flex gap-2">
                {["all", ...STATUSES].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    data-testid={`admin-filter-${s}`}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs capitalize",
                      filter === s ? "border-forest bg-forest text-lime" : "border-forest/20 bg-white text-forest"
                    )}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={load}
                  aria-label="Refresh"
                  data-testid="admin-refresh-btn"
                  className="rounded-full border border-forest/20 bg-white p-2 text-forest"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl bg-white">
              {rows === null ? (
                <div className="flex justify-center p-16">
                  <Loader2 className="h-6 w-6 animate-spin text-forest" />
                </div>
              ) : list.length === 0 ? (
                <p className="p-16 text-center text-forest/60" data-testid="admin-empty">No bookings yet.</p>
              ) : (
                <Table data-testid="admin-bookings-table">
                  <TableHeader>
                    <TableRow>
                      {["Client", "Space", "Services", "Call slot", "Note", "Status", ""].map((h) => (
                        <TableHead key={h} className="font-mono text-[10px] uppercase tracking-[0.16em]">{h}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {list.map((r) => (
                      <TableRow key={r.id} data-testid={`admin-row-${r.id}`}>
                        <TableCell>
                          <p className="font-medium text-forest">{r.name}</p>
                          <a href={`tel:${r.phone}`} className="flex items-center gap-1 text-xs text-forest/60">
                            <Phone className="h-3 w-3" />{r.phone}
                          </a>
                          <p className="text-xs text-forest/60">{r.email}</p>
                        </TableCell>
                        <TableCell>
                          {SPACE[r.space] || r.space}
                          <p className="text-xs text-forest/60">{r.city} · {r.timeline}</p>
                        </TableCell>
                        <TableCell className="max-w-[200px] text-sm">
                          {(r.services || []).map((s) => svcById[s]?.name || s).join(", ")}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm">
                          {r.date}
                          <p className="text-xs text-forest/60">{r.time}</p>
                        </TableCell>
                        <TableCell className="max-w-[220px] text-xs text-forest/70">{r.note || "—"}</TableCell>
                        <TableCell>
                          <Select value={r.status} onValueChange={(v) => setStatus(r.id, v)}>
                            <SelectTrigger className="h-9 w-[130px] rounded-full capitalize" data-testid={`admin-status-${r.id}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUSES.map((s) => (
                                <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => remove(r.id)}
                            aria-label="Delete"
                            data-testid={`admin-delete-${r.id}`}
                            className="text-forest/40 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsAdmin onAuthFail={() => router.push("/admin/login")} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

const ProjectsAdmin = ({ onAuthFail }) => {
  const empty = { title: "", place: "", type: "", service: "", summary: "" };
  const [f, setF] = useState(empty);
  const [files, setFiles] = useState({ after: null, before: null });
  const [list, setList] = useState(null);
  const [busy, setBusy] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const load = async () => {
    try {
      const { data } = await axios.get("/api/projects");
      setList(data);
    } catch {}
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (f.title.trim().length < 2 || !f.type) {
      return toast.error("Add a title and the type of space.");
    }
    const fd = new FormData();
    Object.entries(f).forEach(([k, v]) => fd.append(k, v));
    if (files.after) fd.append("after", files.after);
    if (files.before) fd.append("before", files.before);
    setBusy(true);
    try {
      await axios.post("/api/projects", fd, { withCredentials: true });
      toast.success("Project published on the Projects page");
      setF(empty);
      setFiles({ after: null, before: null });
      setFormKey((k) => k + 1);
      load();
    } catch (x) {
      if (x.response?.status === 401) onAuthFail();
      else toast.error(errText(x.response?.data?.detail));
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Remove this project from the website?")) return;
    try {
      await axios.delete(`/api/projects/${id}`, { withCredentials: true });
      setList((l) => l.filter((p) => p.id !== id));
      toast.success("Project removed");
    } catch {
      toast.error("Failed to remove project");
    }
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
      <form key={formKey} onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-6" data-testid="project-upload-form">
        <h2 className="text-2xl font-light text-forest">Add a project</h2>
        <Input placeholder="Project name, e.g. Green Valley Resort" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} data-testid="project-title-input" className="h-11 rounded-xl" />
        <Input placeholder="Place, e.g. Ooty" value={f.place} onChange={(e) => setF({ ...f, place: e.target.value })} data-testid="project-place-input" className="h-11 rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          <Select value={f.type} onValueChange={(v) => setF({ ...f, type: v })}>
            <SelectTrigger className="h-11 rounded-xl" data-testid="project-type-select"><SelectValue placeholder="Type of space" /></SelectTrigger>
            <SelectContent>{Object.entries(SPACE).map(([k, l]) => <SelectItem key={k} value={k} data-testid={`project-type-${k}`}>{l}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={f.service} onValueChange={(v) => setF({ ...f, service: v })}>
            <SelectTrigger className="h-11 rounded-xl" data-testid="project-service-select"><SelectValue placeholder="Main service" /></SelectTrigger>
            <SelectContent>{SERVICES.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <Textarea placeholder="What we built (short)" value={f.summary} onChange={(e) => setF({ ...f, summary: e.target.value })} data-testid="project-summary-input" className="rounded-xl" />
        {[["after", "After photo (required)"], ["before", "Before photo (optional, turns on the slider)"]].map(([k, l]) => (
          <label key={k} className="block rounded-2xl border border-dashed border-forest/30 p-4 text-sm text-forest/70 hover:border-forest">
            <span className="mb-2 flex items-center gap-2 font-medium text-forest"><ImagePlus className="h-4 w-4" />{l}</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFiles({ ...files, [k]: e.target.files[0] || null })} data-testid={`project-${k}-file`} className="text-xs" />
          </label>
        ))}
        <button disabled={busy} data-testid="project-submit-btn" className="flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-white hover:text-lime disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}Publish project
        </button>
      </form>
      <div>
        {list === null ? <Loader2 className="h-6 w-6 animate-spin text-forest" /> : list.length === 0 ? (
          <p className="rounded-3xl bg-white p-12 text-center text-forest/60" data-testid="admin-projects-empty">No projects yet. The Projects page shows the starter cards until you add one.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2" data-testid="admin-projects-list">
            {list.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-3xl bg-white" data-testid={`admin-project-${p.id}`}>
                <div className="grid grid-cols-2">
                  {p.before_path ? <img src={fileUrl(p.before_path)} alt="Before" className="aspect-square w-full object-cover" /> : <div className="flex aspect-square items-center justify-center bg-mist text-xs text-forest/50">No before</div>}
                  <img src={fileUrl(p.after_path)} alt="After" className="aspect-square w-full object-cover" />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div><p className="font-medium text-forest">{p.title}</p><p className="text-xs text-forest/60">{SPACE[p.type] || p.type}{p.place && ` · ${p.place}`}</p></div>
                  <button onClick={() => remove(p.id)} aria-label="Remove project" data-testid={`admin-project-delete-${p.id}`} className="text-forest/40 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

