"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AdminProvider } from "@/components/admin/AdminContext";
import { AdminToolbar } from "@/components/admin/AdminToolbar";
import AdminSitePreview from "./preview";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [contentData, setContentData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => { if (r.ok) setAuthenticated(true); })
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetch("/api/content?file=home")
      .then((r) => r.json())
      .then(setContentData)
      .catch(console.error);
  }, [authenticated]);

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
      if (res.ok) setAuthenticated(true);
      else setLoginError("Identifiants incorrects");
    } catch { setLoginError("Erreur de connexion"); }
    setLoginLoading(false);
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthenticated(false);
    setContentData(null);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#1a2a38] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#b5a47a]" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#1a2a38] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none">
                <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Administration</h1>
            <p className="text-sm text-white/40 mt-1">Étanchéité du Limousin</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="mb-5">
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Identifiant</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a] transition-colors"
                placeholder="Nom d'utilisateur" autoFocus />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Mot de passe</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#b5a47a] focus:ring-1 focus:ring-[#b5a47a] transition-colors"
                placeholder="••••" />
            </div>
            {loginError && (
              <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">{loginError}</div>
            )}
            <button type="submit" disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b5a47a] to-[#8a7a5a] text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loginLoading && <Loader2 size={18} className="animate-spin" />}
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#b5a47a]" />
      </div>
    );
  }

  return (
    <AdminProvider initialData={contentData}>
      <AdminToolbar onLogout={handleLogout} />
      <div className="pt-12">
        <AdminSitePreview />
      </div>
    </AdminProvider>
  );
}
