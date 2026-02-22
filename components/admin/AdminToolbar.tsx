"use client";

import { useAdmin } from "./AdminContext";
import { Save, LogOut, Check, Loader2, Eye, AlertCircle } from "lucide-react";

export function AdminToolbar({ onLogout }: { onLogout: () => void }) {
  const { saving, saved, save, hasChanges } = useAdmin();

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-yellow-400 via-yellow-400 to-amber-400 shadow-2xl shadow-yellow-500/30">
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-yellow-500/30 rounded-lg px-3 py-1">
            <div className="w-2 h-2 rounded-full bg-yellow-800 animate-pulse" />
            <span className="text-xs font-black text-yellow-900 uppercase tracking-wider">Mode Édition</span>
          </div>
          {hasChanges && (
            <span className="flex items-center gap-1 text-xs font-semibold text-yellow-800/70">
              <AlertCircle size={12} />
              Modifications non sauvegardées
            </span>
          )}
          {saved && (
            <span className="flex items-center gap-1 text-xs font-bold text-green-800 bg-green-200 rounded-full px-3 py-0.5">
              <Check size={12} /> Sauvegardé !
            </span>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-yellow-900/60 hover:text-yellow-900 hover:bg-yellow-500/20 transition-colors"
          >
            <Eye size={13} /> Voir le site
          </a>
          <button
            onClick={save}
            disabled={saving || !hasChanges}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-yellow-900 text-yellow-100 text-xs font-black hover:bg-yellow-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-yellow-900/50 hover:text-red-700 hover:bg-red-100/50 transition-colors"
            title="Déconnexion"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
