import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, Wrench, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a2a38] border-t border-[#b5a47a]/20">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center shadow-md shadow-[#b5a47a]/20 group-hover:shadow-[#b5a47a]/40 group-hover:scale-105 transition-all duration-300 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
                  <path d="M12 3L2 11H5V20H10V14H14V20H19V11H22L12 3Z" stroke="white" strokeWidth="0.5" fill="none"/>
                </svg>
              </div>
              <div>
                <span className="text-[13px] font-extrabold text-white tracking-tight leading-none">Les Cœurs</span>
                <span className="block text-[9px] text-[#b5a47a] font-bold uppercase tracking-[0.22em] mt-0.5">de Madagascar</span>
              </div>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed mb-4">
              Spécialiste en étanchéité, toiture végétalisée et bardage depuis 1998.
            </p>
            <p className="text-xs text-white/25">SIREN : 418 415 774</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-[#b5a47a] uppercase tracking-widest mb-5">Services</h4>
            <div className="space-y-2.5">
              {[
                { name: "Étanchéité liquide", href: "/etancheite-liquide" },
                { name: "Étanchéité bitume", href: "/etancheite-bitume" },
                { name: "Toiture végétalisée", href: "/toiture-vegetalisee" },
                { name: "Bardage et isolation", href: "/bardage-isolation" },
              ].map((s) => (
                <Link key={s.href} href={s.href} className="flex items-center gap-2 text-sm text-white/45 hover:text-[#d4c9a8] transition-colors group">
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b5a47a]" />
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-[#b5a47a] uppercase tracking-widest mb-5">Entreprise</h4>
            <div className="space-y-2.5">
              <Link href="/intervention" className="flex items-center gap-2 text-sm text-white/45 hover:text-[#d4c9a8] transition-colors">
                <Wrench size={12} className="text-[#b5a47a]/60 shrink-0" />
                Nos interventions
              </Link>
              <Link href="/contrat-entretien" className="flex items-center gap-2 text-sm text-white/45 hover:text-[#d4c9a8] transition-colors">
                <FileText size={12} className="text-[#b5a47a]/60 shrink-0" />
                Contrat d&apos;entretien
              </Link>
              <Link href="/contact" className="flex items-center gap-2 text-sm text-white/45 hover:text-[#d4c9a8] transition-colors">
                <ArrowRight size={12} className="text-[#b5a47a]/60 shrink-0" />
                Contact & devis
              </Link>
              <div className="pt-1 flex items-start gap-2">
                <MapPin size={13} className="text-[#b5a47a]/60 mt-0.5 shrink-0" />
                <p className="text-xs text-white/35 leading-relaxed">
                  6 allée des Gravelles<br />87000 Limoges
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#b5a47a] uppercase tracking-widest mb-5">Nous joindre</h4>
            <div className="space-y-3">
              <a href="tel:0555397299" className="flex items-center gap-3 text-sm text-white/45 hover:text-[#d4c9a8] transition-colors">
                <Phone size={14} className="text-[#b5a47a]/70 shrink-0" />
                05 55 39 72 99
              </a>
              <a href="mailto:contact@etancheitedulimousin.com" className="flex items-start gap-3 text-sm text-white/45 hover:text-[#d4c9a8] transition-colors">
                <Mail size={14} className="text-[#b5a47a]/70 shrink-0 mt-0.5" />
                <span className="break-all">contact@etancheitedulimousin.com</span>
              </a>
              <div className="pt-2">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b5a47a] text-white text-xs font-bold rounded-full hover:bg-[#a0916a] transition-colors"
                >
                  Devis gratuit <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#b5a47a]/15 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} Les Cœurs de Madagascar — Tous droits réservés</p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <Link href="/mentions-legales" className="hover:text-[#d4c9a8] transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-[#d4c9a8] transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
