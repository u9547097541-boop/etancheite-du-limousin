"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, LogOut, Upload, Trash2, Plus, Home, FileText, Phone, Loader2, Check, X, Eye } from "lucide-react";

/* ─── Types ─── */
interface Stat {
  value: string;
  suffix: string;
  label: string;
}
interface HomeContent {
  hero_title: string;
  hero_subtitle: string;
  cta_text: string;
  stats: Stat[];
}
interface AboutContent {
  title: string;
  paragraph_1: string;
  paragraph_2: string;
  highlights: string[];
}
interface ContactContent {
  address: string;
  city: string;
  phone: string;
  email: string;
  siren: string;
}

type Tab = "home" | "about" | "contact";

/* ─── Toast ─── */
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-[200] flex items-center gap-2 px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium animate-slide-in ${type === "success" ? "bg-emerald-600" : "bg-red-600"}`}>
      {type === "success" ? <Check size={16} /> : <X size={16} />}
      {message}
    </div>
  );
}

/* ─── Image Upload Component ─── */
function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-[#e4ddd1] flex-shrink-0">
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <label className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-[#b5a47a]/40 hover:border-[#b5a47a] cursor-pointer transition-colors text-sm text-[#2d3e50] ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {uploading ? "Upload..." : "Choisir une image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
        {value && (
          <button onClick={() => onChange("")} className="p-2 text-red-400 hover:text-red-600 transition-colors">
            <Trash2 size={16} />
          </button>
        )}
      </div>
      {value && <p className="mt-1 text-xs text-gray-400 truncate max-w-xs">{value}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*                ADMIN PAGE                  */
/* ═══════════════════════════════════════════ */
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  // Login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Content
  const [tab, setTab] = useState<Tab>("home");
  const [homeData, setHomeData] = useState<HomeContent | null>(null);
  const [aboutData, setAboutData] = useState<AboutContent | null>(null);
  const [contactData, setContactData] = useState<ContactContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  /* ── Check auth on mount ── */
  useEffect(() => {
    fetch("/api/auth")
      .then((r) => { if (r.ok) setAuthenticated(true); })
      .finally(() => setChecking(false));
  }, []);

  /* ── Load content ── */
  const loadContent = useCallback(async (file: string) => {
    const res = await fetch(`/api/content?file=${file}`);
    if (res.ok) return res.json();
    return null;
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    loadContent("home").then(setHomeData);
    loadContent("about").then(setAboutData);
    loadContent("contact").then(setContactData);
  }, [authenticated, loadContent]);

  /* ── Login ── */
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setAuthenticated(true);
      } else {
        setLoginError("Identifiants incorrects");
      }
    } catch {
      setLoginError("Erreur de connexion");
    }
    setLoginLoading(false);
  }

  /* ── Logout ── */
  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthenticated(false);
    setHomeData(null);
    setAboutData(null);
    setContactData(null);
  }

  /* ── Save ── */
  async function handleSave() {
    setSaving(true);
    try {
      const files = [
        { file: "home", data: homeData },
        { file: "about", data: aboutData },
        { file: "contact", data: contactData },
      ];
      for (const { file, data } of files) {
        if (data) {
          await fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ file, data }),
          });
        }
      }
      setToast({ message: "Modifications sauvegardées !", type: "success" });
    } catch {
      setToast({ message: "Erreur lors de la sauvegarde", type: "error" });
    }
    setSaving(false);
  }

  /* ── Loading screen ── */
  if (checking) {
    return (
      <div className="min-h-screen bg-[#1a2a38] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#b5a47a]" />
      </div>
    );
  }

  /* ── Login screen ── */
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#1a2a38] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none">
                <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Administration</h1>
            <p className="text-sm text-white/40 mt-1">Étanchéité du Limousin</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="mb-5">
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Identifiant</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a] transition-colors"
                placeholder="Nom d'utilisateur"
                autoFocus
              />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a] transition-colors"
                placeholder="••••"
              />
            </div>

            {loginError && (
              <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b5a47a] to-[#8a7a5a] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loginLoading ? <Loader2 size={18} className="animate-spin" /> : null}
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
    { key: "home", label: "Accueil", icon: Home },
    { key: "about", label: "À propos", icon: FileText },
    { key: "contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ── Top bar ── */}
      <div className="bg-[#1a2a38] border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-white">Admin Panel</span>
              <span className="block text-[10px] text-[#b5a47a]">Étanchéité du Limousin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors">
              <Eye size={14} /> Voir le site
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#b5a47a] to-[#8a7a5a] text-white text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              Sauvegarder
            </button>
            <button onClick={handleLogout} className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-white/5 transition-colors" title="Déconnexion">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Tabs ── */}
        <div className="flex gap-2 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t.key
                  ? "bg-[#2d3e50] text-white shadow-lg"
                  : "bg-white text-[#2d3e50]/60 hover:bg-white/80 border border-[#e4ddd1]"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Home ── */}
        {tab === "home" && homeData && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#e4ddd1] shadow-sm p-8">
              <h2 className="text-lg font-bold text-[#2d3e50] mb-6 flex items-center gap-2">
                <Home size={20} className="text-[#b5a47a]" /> Section Hero
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Titre principal</label>
                  <input
                    type="text"
                    value={homeData.hero_title}
                    onChange={(e) => setHomeData({ ...homeData, hero_title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Sous-titre</label>
                  <textarea
                    rows={3}
                    value={homeData.hero_subtitle}
                    onChange={(e) => setHomeData({ ...homeData, hero_subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Texte bouton CTA</label>
                  <input
                    type="text"
                    value={homeData.cta_text}
                    onChange={(e) => setHomeData({ ...homeData, cta_text: e.target.value })}
                    className="w-full max-w-xs px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl border border-[#e4ddd1] shadow-sm p-8">
              <h2 className="text-lg font-bold text-[#2d3e50] mb-6">📊 Statistiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {homeData.stats.map((stat, i) => (
                  <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-[#f5f0e8]/50 border border-[#e4ddd1]/50">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...homeData.stats];
                          newStats[i] = { ...newStats[i], value: e.target.value };
                          setHomeData({ ...homeData, stats: newStats });
                        }}
                        placeholder="Valeur"
                        className="w-full px-3 py-2 rounded-lg border border-[#e4ddd1] text-sm focus:outline-none focus:border-[#b5a47a] text-[#2d3e50]"
                      />
                      <input
                        type="text"
                        value={stat.suffix}
                        onChange={(e) => {
                          const newStats = [...homeData.stats];
                          newStats[i] = { ...newStats[i], suffix: e.target.value };
                          setHomeData({ ...homeData, stats: newStats });
                        }}
                        placeholder="Suffixe (+, %, ...)"
                        className="w-full px-3 py-2 rounded-lg border border-[#e4ddd1] text-sm focus:outline-none focus:border-[#b5a47a] text-[#2d3e50]"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...homeData.stats];
                          newStats[i] = { ...newStats[i], label: e.target.value };
                          setHomeData({ ...homeData, stats: newStats });
                        }}
                        placeholder="Label"
                        className="w-full px-3 py-2 rounded-lg border border-[#e4ddd1] text-sm focus:outline-none focus:border-[#b5a47a] text-[#2d3e50]"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newStats = homeData.stats.filter((_, j) => j !== i);
                        setHomeData({ ...homeData, stats: newStats });
                      }}
                      className="p-1.5 text-red-300 hover:text-red-500 transition-colors mt-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setHomeData({ ...homeData, stats: [...homeData.stats, { value: "", suffix: "", label: "" }] })}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-[#b5a47a]/30 text-[#b5a47a] text-sm font-medium hover:border-[#b5a47a] hover:bg-[#b5a47a]/5 transition-colors"
              >
                <Plus size={15} /> Ajouter une statistique
              </button>
            </div>
          </div>
        )}

        {/* ── Tab: About ── */}
        {tab === "about" && aboutData && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#e4ddd1] shadow-sm p-8">
              <h2 className="text-lg font-bold text-[#2d3e50] mb-6 flex items-center gap-2">
                <FileText size={20} className="text-[#b5a47a]" /> Section À propos
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Titre</label>
                  <input
                    type="text"
                    value={aboutData.title}
                    onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Paragraphe 1</label>
                  <textarea
                    rows={4}
                    value={aboutData.paragraph_1}
                    onChange={(e) => setAboutData({ ...aboutData, paragraph_1: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Paragraphe 2</label>
                  <textarea
                    rows={4}
                    value={aboutData.paragraph_2}
                    onChange={(e) => setAboutData({ ...aboutData, paragraph_2: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl border border-[#e4ddd1] shadow-sm p-8">
              <h2 className="text-lg font-bold text-[#2d3e50] mb-6">✅ Points forts</h2>
              <div className="space-y-3">
                {aboutData.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => {
                        const newH = [...aboutData.highlights];
                        newH[i] = e.target.value;
                        setAboutData({ ...aboutData, highlights: newH });
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#e4ddd1] text-sm focus:outline-none focus:border-[#b5a47a] text-[#2d3e50]"
                    />
                    <button
                      onClick={() => setAboutData({ ...aboutData, highlights: aboutData.highlights.filter((_, j) => j !== i) })}
                      className="p-1.5 text-red-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAboutData({ ...aboutData, highlights: [...aboutData.highlights, ""] })}
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-[#b5a47a]/30 text-[#b5a47a] text-sm font-medium hover:border-[#b5a47a] hover:bg-[#b5a47a]/5 transition-colors"
              >
                <Plus size={15} /> Ajouter un point fort
              </button>
            </div>
          </div>
        )}

        {/* ── Tab: Contact ── */}
        {tab === "contact" && contactData && (
          <div className="bg-white rounded-2xl border border-[#e4ddd1] shadow-sm p-8">
            <h2 className="text-lg font-bold text-[#2d3e50] mb-6 flex items-center gap-2">
              <Phone size={20} className="text-[#b5a47a]" /> Informations de contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Adresse</label>
                <input
                  type="text"
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Ville & Code postal</label>
                <input
                  type="text"
                  value={contactData.city}
                  onChange={(e) => setContactData({ ...contactData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Téléphone</label>
                <input
                  type="text"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">Email</label>
                <input
                  type="text"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#2d3e50] mb-1.5 uppercase tracking-wide">SIREN</label>
                <input
                  type="text"
                  value={contactData.siren}
                  onChange={(e) => setContactData({ ...contactData, siren: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#e4ddd1] focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a]/30 transition-colors text-[#2d3e50]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {((tab === "home" && !homeData) || (tab === "about" && !aboutData) || (tab === "contact" && !contactData)) && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#b5a47a]" />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slide-in {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
