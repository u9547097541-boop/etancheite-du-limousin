"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Save, LogOut, Upload, Trash2, Plus, Home, FileText, Phone, Loader2,
  Check, Image as ImageIcon, BarChart3, Users, MapPin, Megaphone,
  Settings, ChevronRight, Star, Briefcase, Eye, X, AlertCircle,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */
interface ContentData {
  [key: string]: unknown;
}

type Tab = "hero" | "stats" | "services" | "engagements" | "about" | "process" | "realisations" | "partners" | "zone" | "cta" | "contact";

const TABS: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: "hero", label: "Hero", icon: Home },
  { key: "stats", label: "Statistiques", icon: BarChart3 },
  { key: "services", label: "Services", icon: Briefcase },
  { key: "engagements", label: "Engagements", icon: Star },
  { key: "about", label: "À propos", icon: FileText },
  { key: "process", label: "Processus", icon: Settings },
  { key: "realisations", label: "Réalisations", icon: ImageIcon },
  { key: "partners", label: "Partenaires", icon: Users },
  { key: "zone", label: "Zone", icon: MapPin },
  { key: "cta", label: "CTA", icon: Megaphone },
  { key: "contact", label: "Contact", icon: Phone },
];

/* ═══════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ═══════════════════════════════════════════════════════ */

function Field({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-300 focus:outline-none focus:border-[#b5a47a] focus:ring-2 focus:ring-[#b5a47a]/20 transition-all resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-300 focus:outline-none focus:border-[#b5a47a] focus:ring-2 focus:ring-[#b5a47a]/20 transition-all"
        />
      )}
    </div>
  );
}

function ImageUploader({ label, src, onUpload, onRemove }: {
  label: string; src: string; onUpload: (url: string) => void; onRemove: () => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onUpload(data.url);
    } catch (err) { console.error(err); }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="flex items-center gap-4">
        {src ? (
          <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 shrink-0 group">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button onClick={onRemove}
              className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/60 flex items-center justify-center transition-all">
              <Trash2 size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
            <ImageIcon size={20} className="text-slate-300" />
          </div>
        )}
        <div>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2d3e50] text-white text-xs font-bold hover:bg-[#3d5166] disabled:opacity-50 transition-colors shadow-sm"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? "Upload..." : "Choisir une image"}
          </button>
          {src && <p className="mt-1 text-[10px] text-slate-400 truncate max-w-[200px]">{src}</p>}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-700">{title}</h3>
      </div>
      <div className="p-6 space-y-5">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN ADMIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [data, setData] = useState<ContentData | null>(null);
  const [tab, setTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const originalRef = useRef("");

  /* ── Auth check ── */
  useEffect(() => {
    fetch("/api/auth").then((r) => { if (r.ok) setAuthenticated(true); }).finally(() => setChecking(false));
  }, []);

  /* ── Load data ── */
  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/content?file=home").then((r) => r.json()).then((d) => {
      setData(d);
      originalRef.current = JSON.stringify(d);
    }).catch(console.error);
  }, [authenticated]);

  /* ── Track changes ── */
  useEffect(() => {
    if (!data) return;
    setHasChanges(JSON.stringify(data) !== originalRef.current);
  }, [data]);

  /* ── Helpers ── */
  const set = useCallback((key: string, val: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = key.split(".");
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = val;
      return copy;
    });
  }, []);

  const get = useCallback((key: string): unknown => {
    if (!data) return "";
    const keys = key.split(".");
    let val: unknown = data;
    for (const k of keys) {
      if (val == null) return "";
      val = (val as Record<string, unknown>)[k];
    }
    return val ?? "";
  }, [data]);

  const str = useCallback((key: string) => String(get(key) || ""), [get]);
  const arr = useCallback((key: string) => (get(key) as unknown[]) || [], [get]);

  /* ── Login ── */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      if (res.ok) setAuthenticated(true);
      else setLoginError("Identifiants incorrects");
    } catch { setLoginError("Erreur de connexion"); }
    setLoginLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthenticated(false);
    setData(null);
  }

  /* ── Save ── */
  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      await fetch("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ file: "home", data }) });
      originalRef.current = JSON.stringify(data);
      setHasChanges(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { console.error(err); }
    setSaving(false);
  }

  /* ── Loading ── */
  if (checking) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-[#b5a47a]" />
    </div>
  );

  /* ══════════════════════════
     LOGIN SCREEN
     ══════════════════════════ */
  if (!authenticated) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center shadow-lg shadow-[#b5a47a]/20">
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
              <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">Administration</h1>
          <p className="text-xs text-slate-500 mt-1">Étanchéité du Limousin</p>
        </div>
        <form onSubmit={handleLogin} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Identifiant</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#b5a47a] focus:ring-2 focus:ring-[#b5a47a]/20 transition-all"
              placeholder="Nom d'utilisateur" autoFocus />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600/50 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#b5a47a] focus:ring-2 focus:ring-[#b5a47a]/20 transition-all"
              placeholder="••••" />
          </div>
          {loginError && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <X size={12} /> {loginError}
            </div>
          )}
          <button type="submit" disabled={loginLoading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#b5a47a] to-[#a0916a] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {loginLoading && <Loader2 size={15} className="animate-spin" />}
            Connexion
          </button>
        </form>
      </div>
    </div>
  );

  /* ── Loading data ── */
  if (!data) return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-[#b5a47a]" />
    </div>
  );

  /* ══════════════════════════
     DASHBOARD
     ══════════════════════════ */
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-[#0f172a] border-r border-slate-800 flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="px-5 pt-5 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5" fill="none">
                <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">Admin Panel</p>
              <p className="text-[9px] text-slate-500 font-medium">Étanchéité du Limousin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all ${
                tab === t.key
                  ? "bg-[#b5a47a]/15 text-[#b5a47a]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              }`}
            >
              <t.icon size={15} strokeWidth={tab === t.key ? 2.2 : 1.8} />
              {t.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800/80 space-y-2">
          <a href="/" target="_blank"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all">
            <Eye size={14} /> Voir le site
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-8 h-14 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-bold text-slate-800">{TABS.find((t) => t.key === tab)?.label}</h1>
            {hasChanges && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                <AlertCircle size={11} /> Non sauvegardé
              </span>
            )}
            {saved && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <Check size={11} /> Sauvegardé !
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#2d3e50] text-white text-xs font-bold hover:bg-[#3d5166] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Sauvegarder
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* ── HERO ── */}
            {tab === "hero" && (
              <>
                <SectionCard title="🏠 Section Hero principale">
                  <Field label="Badge" value={str("hero_badge")} onChange={(v) => set("hero_badge", v)} placeholder="Ex: Expert depuis 1998" />
                  <div className="grid grid-cols-3 gap-4">
                    <Field label="Titre ligne 1" value={str("hero_title_1")} onChange={(v) => set("hero_title_1", v)} />
                    <Field label="Mot doré" value={str("hero_title_highlight")} onChange={(v) => set("hero_title_highlight", v)} />
                    <Field label="Titre ligne 2" value={str("hero_title_2")} onChange={(v) => set("hero_title_2", v)} />
                  </div>
                  <Field label="Sous-titre" value={str("hero_subtitle")} onChange={(v) => set("hero_subtitle", v)} multiline />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Texte bouton CTA" value={str("hero_cta")} onChange={(v) => set("hero_cta", v)} />
                    <Field label="Numéro de téléphone" value={str("hero_phone")} onChange={(v) => set("hero_phone", v)} />
                  </div>
                </SectionCard>
                <SectionCard title="✅ Badges de confiance">
                  {(arr("hero_trust") as string[]).map((t, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-slate-400 w-4">{i + 1}</span>
                      <input
                        type="text" value={t}
                        onChange={(e) => { const a = [...(arr("hero_trust") as string[])]; a[i] = e.target.value; set("hero_trust", a); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#b5a47a] transition-all"
                      />
                    </div>
                  ))}
                </SectionCard>
              </>
            )}

            {/* ── STATS ── */}
            {tab === "stats" && (
              <SectionCard title="📊 Statistiques">
                <div className="space-y-4">
                  {(arr("stats") as Record<string, string>[]).map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-lg font-black text-[#b5a47a] mt-1 w-6 text-center">{i + 1}</span>
                      <div className="flex-1 grid grid-cols-3 gap-3">
                        <Field label="Valeur" value={s.value || ""} onChange={(v) => { const a = [...(arr("stats") as Record<string, string>[])]; a[i] = { ...a[i], value: v }; set("stats", a); }} />
                        <Field label="Suffixe" value={s.suffix || ""} onChange={(v) => { const a = [...(arr("stats") as Record<string, string>[])]; a[i] = { ...a[i], suffix: v }; set("stats", a); }} placeholder="+, %, ..." />
                        <Field label="Label" value={s.label || ""} onChange={(v) => { const a = [...(arr("stats") as Record<string, string>[])]; a[i] = { ...a[i], label: v }; set("stats", a); }} />
                      </div>
                      <button onClick={() => { const a = (arr("stats") as Record<string, string>[]).filter((_, j) => j !== i); set("stats", a); }}
                        className="p-1.5 text-slate-300 hover:text-red-500 transition-colors mt-5"><Trash2 size={15} /></button>
                    </div>
                  ))}
                </div>
                <button onClick={() => set("stats", [...(arr("stats") as Record<string, string>[]), { value: "", suffix: "", label: "" }])}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-[#b5a47a] hover:text-[#b5a47a] transition-all">
                  <Plus size={14} /> Ajouter
                </button>
              </SectionCard>
            )}

            {/* ── SERVICES ── */}
            {tab === "services" && (
              <>
                <SectionCard title="🏷️ En-tête section Services">
                  <Field label="Badge" value={str("services_badge")} onChange={(v) => set("services_badge", v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Titre" value={str("services_title_1")} onChange={(v) => set("services_title_1", v)} />
                    <Field label="Mot doré" value={str("services_title_highlight")} onChange={(v) => set("services_title_highlight", v)} />
                  </div>
                  <Field label="Sous-titre" value={str("services_subtitle")} onChange={(v) => set("services_subtitle", v)} multiline />
                </SectionCard>
                {(arr("services") as Record<string, string>[]).map((s, i) => (
                  <SectionCard key={i} title={`Service ${i + 1}: ${s.title || "..."}`}>
                    <Field label="Titre" value={s.title || ""} onChange={(v) => { const a = [...(arr("services") as Record<string, string>[])]; a[i] = { ...a[i], title: v }; set("services", a); }} />
                    <Field label="Description" value={s.desc || ""} onChange={(v) => { const a = [...(arr("services") as Record<string, string>[])]; a[i] = { ...a[i], desc: v }; set("services", a); }} multiline />
                    <Field label="Lien (href)" value={s.href || ""} onChange={(v) => { const a = [...(arr("services") as Record<string, string>[])]; a[i] = { ...a[i], href: v }; set("services", a); }} />
                    <ImageUploader label="Image" src={s.img || ""} onUpload={(url) => { const a = [...(arr("services") as Record<string, string>[])]; a[i] = { ...a[i], img: url }; set("services", a); }} onRemove={() => { const a = [...(arr("services") as Record<string, string>[])]; a[i] = { ...a[i], img: "" }; set("services", a); }} />
                  </SectionCard>
                ))}
              </>
            )}

            {/* ── ENGAGEMENTS ── */}
            {tab === "engagements" && (
              <SectionCard title="💎 Nos engagements">
                {(arr("engagements") as Record<string, string>[]).map((e, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                    <Field label={`Engagement ${i + 1} — Titre`} value={e.title || ""} onChange={(v) => { const a = [...(arr("engagements") as Record<string, string>[])]; a[i] = { ...a[i], title: v }; set("engagements", a); }} />
                    <Field label="Description" value={e.desc || ""} onChange={(v) => { const a = [...(arr("engagements") as Record<string, string>[])]; a[i] = { ...a[i], desc: v }; set("engagements", a); }} multiline />
                  </div>
                ))}
              </SectionCard>
            )}

            {/* ── ABOUT ── */}
            {tab === "about" && (
              <>
                <SectionCard title="ℹ️ Section À propos">
                  <Field label="Badge" value={str("about_badge")} onChange={(v) => set("about_badge", v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Titre" value={str("about_title_1")} onChange={(v) => set("about_title_1", v)} />
                    <Field label="Mot doré" value={str("about_title_highlight")} onChange={(v) => set("about_title_highlight", v)} />
                  </div>
                  <Field label="Paragraphe 1" value={str("about_p1")} onChange={(v) => set("about_p1", v)} multiline />
                  <Field label="Paragraphe 2" value={str("about_p2")} onChange={(v) => set("about_p2", v)} multiline />
                </SectionCard>
                <SectionCard title="✅ Points forts">
                  {(arr("about_highlights") as string[]).map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-slate-400 w-4">{i + 1}</span>
                      <input type="text" value={h}
                        onChange={(e) => { const a = [...(arr("about_highlights") as string[])]; a[i] = e.target.value; set("about_highlights", a); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#b5a47a] transition-all"
                      />
                      <button onClick={() => { const a = (arr("about_highlights") as string[]).filter((_, j) => j !== i); set("about_highlights", a); }}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <button onClick={() => set("about_highlights", [...(arr("about_highlights") as string[]), ""])}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-[#b5a47a] hover:text-[#b5a47a] transition-all">
                    <Plus size={14} /> Ajouter
                  </button>
                </SectionCard>
              </>
            )}

            {/* ── PROCESS ── */}
            {tab === "process" && (
              <>
                <SectionCard title="⚙️ En-tête">
                  <Field label="Badge" value={str("process_badge")} onChange={(v) => set("process_badge", v)} />
                  <Field label="Titre" value={str("process_title")} onChange={(v) => set("process_title", v)} />
                  <Field label="Sous-titre" value={str("process_subtitle")} onChange={(v) => set("process_subtitle", v)} multiline />
                </SectionCard>
                {(arr("steps") as Record<string, string>[]).map((s, i) => (
                  <SectionCard key={i} title={`Étape ${s.num || i + 1}: ${s.title || "..."}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Numéro" value={s.num || ""} onChange={(v) => { const a = [...(arr("steps") as Record<string, string>[])]; a[i] = { ...a[i], num: v }; set("steps", a); }} />
                      <Field label="Titre" value={s.title || ""} onChange={(v) => { const a = [...(arr("steps") as Record<string, string>[])]; a[i] = { ...a[i], title: v }; set("steps", a); }} />
                    </div>
                    <Field label="Description" value={s.desc || ""} onChange={(v) => { const a = [...(arr("steps") as Record<string, string>[])]; a[i] = { ...a[i], desc: v }; set("steps", a); }} multiline />
                  </SectionCard>
                ))}
              </>
            )}

            {/* ── REALISATIONS ── */}
            {tab === "realisations" && (
              <>
                <SectionCard title="🏷️ En-tête">
                  <Field label="Badge" value={str("realisations_badge")} onChange={(v) => set("realisations_badge", v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Titre" value={str("realisations_title_1")} onChange={(v) => set("realisations_title_1", v)} />
                    <Field label="Mot doré" value={str("realisations_title_highlight")} onChange={(v) => set("realisations_title_highlight", v)} />
                  </div>
                  <Field label="Sous-titre" value={str("realisations_subtitle")} onChange={(v) => set("realisations_subtitle", v)} multiline />
                </SectionCard>
                {(arr("realisations") as Record<string, string>[]).map((r, i) => (
                  <SectionCard key={i} title={`Réalisation ${i + 1}: ${r.title || "..."}`}>
                    <Field label="Titre" value={r.title || ""} onChange={(v) => { const a = [...(arr("realisations") as Record<string, string>[])]; a[i] = { ...a[i], title: v }; set("realisations", a); }} />
                    <Field label="Sous-titre" value={r.sub || ""} onChange={(v) => { const a = [...(arr("realisations") as Record<string, string>[])]; a[i] = { ...a[i], sub: v }; set("realisations", a); }} />
                    <Field label="Type / badge" value={r.type || ""} onChange={(v) => { const a = [...(arr("realisations") as Record<string, string>[])]; a[i] = { ...a[i], type: v }; set("realisations", a); }} />
                    <ImageUploader label="Image" src={r.img || ""}
                      onUpload={(url) => { const a = [...(arr("realisations") as Record<string, string>[])]; a[i] = { ...a[i], img: url }; set("realisations", a); }}
                      onRemove={() => { const a = [...(arr("realisations") as Record<string, string>[])]; a[i] = { ...a[i], img: "" }; set("realisations", a); }} />
                  </SectionCard>
                ))}
                <button onClick={() => set("realisations", [...(arr("realisations") as Record<string, string>[]), { title: "", sub: "", type: "", img: "" }])}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-[#b5a47a] hover:text-[#b5a47a] transition-all">
                  <Plus size={14} /> Ajouter une réalisation
                </button>
              </>
            )}

            {/* ── PARTNERS ── */}
            {tab === "partners" && (
              <>
                <SectionCard title="🏷️ En-tête Partenaires">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Titre" value={str("partners_title_1")} onChange={(v) => set("partners_title_1", v)} />
                    <Field label="Mot doré" value={str("partners_title_highlight")} onChange={(v) => set("partners_title_highlight", v)} />
                  </div>
                  <Field label="Sous-titre" value={str("partners_subtitle")} onChange={(v) => set("partners_subtitle", v)} multiline />
                </SectionCard>
                <SectionCard title="🤝 Logos partenaires">
                  <div className="space-y-4">
                    {(arr("partners") as Record<string, string>[]).map((p, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        {p.logo ? (
                          <img src={p.logo} alt={p.name} className="w-14 h-8 object-contain rounded bg-white border border-slate-200 p-1" />
                        ) : (
                          <div className="w-14 h-8 rounded bg-slate-200 flex items-center justify-center"><ImageIcon size={12} className="text-slate-400" /></div>
                        )}
                        <Field label="Nom" value={p.name || ""} onChange={(v) => { const a = [...(arr("partners") as Record<string, string>[])]; a[i] = { ...a[i], name: v }; set("partners", a); }} />
                        <ImageUploader label="Logo" src={p.logo || ""}
                          onUpload={(url) => { const a = [...(arr("partners") as Record<string, string>[])]; a[i] = { ...a[i], logo: url }; set("partners", a); }}
                          onRemove={() => { const a = [...(arr("partners") as Record<string, string>[])]; a[i] = { ...a[i], logo: "" }; set("partners", a); }} />
                        <button onClick={() => { const a = (arr("partners") as Record<string, string>[]).filter((_, j) => j !== i); set("partners", a); }}
                          className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => set("partners", [...(arr("partners") as Record<string, string>[]), { name: "", logo: "" }])}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-[#b5a47a] hover:text-[#b5a47a] transition-all">
                    <Plus size={14} /> Ajouter un partenaire
                  </button>
                </SectionCard>
              </>
            )}

            {/* ── ZONE ── */}
            {tab === "zone" && (
              <>
                <SectionCard title="📍 Zone d'intervention">
                  <Field label="Badge" value={str("zone_badge")} onChange={(v) => set("zone_badge", v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Titre" value={str("zone_title_1")} onChange={(v) => set("zone_title_1", v)} />
                    <Field label="Mot doré" value={str("zone_title_highlight")} onChange={(v) => set("zone_title_highlight", v)} />
                  </div>
                  <Field label="Texte descriptif" value={str("zone_text")} onChange={(v) => set("zone_text", v)} multiline />
                </SectionCard>
                <SectionCard title="🏛️ Départements">
                  {(arr("zone_departments") as Record<string, string>[]).map((d, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <input type="text" value={d.code || ""}
                        onChange={(e) => { const a = [...(arr("zone_departments") as Record<string, string>[])]; a[i] = { ...a[i], code: e.target.value }; set("zone_departments", a); }}
                        className="w-16 px-3 py-2 rounded-lg bg-white border border-slate-200 text-center text-lg font-black text-[#b5a47a] focus:outline-none focus:border-[#b5a47a] transition-all"
                        placeholder="87" />
                      <input type="text" value={d.name || ""}
                        onChange={(e) => { const a = [...(arr("zone_departments") as Record<string, string>[])]; a[i] = { ...a[i], name: e.target.value }; set("zone_departments", a); }}
                        className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#b5a47a] transition-all"
                        placeholder="Nom du département" />
                      <button onClick={() => { const a = (arr("zone_departments") as Record<string, string>[]).filter((_, j) => j !== i); set("zone_departments", a); }}
                        className="p-1 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <button onClick={() => set("zone_departments", [...(arr("zone_departments") as Record<string, string>[]), { code: "", name: "" }])}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold hover:border-[#b5a47a] hover:text-[#b5a47a] transition-all">
                    <Plus size={14} /> Ajouter
                  </button>
                </SectionCard>
              </>
            )}

            {/* ── CTA ── */}
            {tab === "cta" && (
              <SectionCard title="📢 Appel à l'action final">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Titre" value={str("cta_title_1")} onChange={(v) => set("cta_title_1", v)} />
                  <Field label="Mot doré" value={str("cta_title_highlight")} onChange={(v) => set("cta_title_highlight", v)} />
                </div>
                <Field label="Sous-titre" value={str("cta_subtitle")} onChange={(v) => set("cta_subtitle", v)} multiline />
                <Field label="Texte bouton" value={str("cta_button")} onChange={(v) => set("cta_button", v)} />
              </SectionCard>
            )}

            {/* ── CONTACT ── */}
            {tab === "contact" && (
              <SectionCard title="📞 Informations de contact">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Adresse" value={str("contact_address")} onChange={(v) => set("contact_address", v)} />
                  <Field label="Ville & code postal" value={str("contact_city")} onChange={(v) => set("contact_city", v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Téléphone" value={str("contact_phone")} onChange={(v) => set("contact_phone", v)} />
                  <Field label="Email" value={str("contact_email")} onChange={(v) => set("contact_email", v)} />
                </div>
                <Field label="N° SIREN" value={str("contact_siren")} onChange={(v) => set("contact_siren", v)} />
                <Field label="Slogan footer" value={str("footer_tagline")} onChange={(v) => set("footer_tagline", v)} multiline />
              </SectionCard>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
