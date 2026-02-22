"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight, ChevronDown, Droplets, Layers, Leaf, Shield, FileText, Wrench } from "lucide-react";

const services = [
  { icon: Droplets, name: "Étanchéité liquide",  href: "/etancheite-liquide",  sub: "Résines haute performance" },
  { icon: Layers,   name: "Étanchéité bitume",   href: "/etancheite-bitume",   sub: "Membranes Siplast" },
  { icon: Leaf,     name: "Toiture végétalisée", href: "/toiture-vegetalisee", sub: "Écologique & isolant" },
  { icon: Shield,   name: "Bardage & isolation", href: "/bardage-isolation",   sub: "Monopanel, Bacacier" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen]             = useState(false);
  const [servicesOpen, setServicesOpen]         = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled]                 = useState(false);
  const pathname = usePathname();
  const dropRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [pathname]);

  const isServiceActive = services.some(s => pathname === s.href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#1a2a38] ${
        scrolled
          ? "shadow-[0_4px_32px_rgba(0,0,0,0.40)] border-b-2 border-[#b5a47a]/40"
          : "shadow-[0_2px_20px_rgba(0,0,0,0.25)] border-b border-[#b5a47a]/25"
      }`}
    >
      <div className="container-main">
          <div className="flex items-center justify-between h-[76px]">          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center shadow-md shadow-[#b5a47a]/20 group-hover:shadow-[#b5a47a]/40 group-hover:scale-105 transition-all duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
                <path d="M12 3L2 11H5V20H10V14H14V20H19V11H22L12 3Z" stroke="white" strokeWidth="0.5" fill="none"/>
              </svg>
            </div>
            <div>
              <span className="text-[13px] font-extrabold text-white tracking-tight leading-none">Étanchéité</span>
              <span className="block text-[9.5px] text-[#b5a47a] font-bold uppercase tracking-[0.22em] mt-0.5">du Limousin</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">

            <Link href="/"
              className={`px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-250 ${
                pathname === "/" ? "text-white bg-white/12" : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >Accueil</Link>

            {/* Services dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onClick={() => setServicesOpen(v => !v)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-250 ${
                  isServiceActive ? "text-white bg-white/12" : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                Nos services
                <ChevronDown size={13} className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[340px] transition-all duration-250 origin-top ${
                  servicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1e2f3e] rotate-45 border-l border-t border-[#b5a47a]/20" />
                <div className="bg-[#1e2f3e] rounded-2xl border border-[#b5a47a]/20 shadow-2xl shadow-black/40 p-2 mt-1">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 group/item ${
                        pathname === s.href ? "bg-[#b5a47a]/15 text-white" : "text-white/65 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        pathname === s.href ? "bg-[#b5a47a]/20" : "bg-white/5 group-hover/item:bg-[#b5a47a]/12"
                      }`}>
                        <s.icon size={17} className="text-[#b5a47a]" strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold leading-tight">{s.name}</p>
                        <p className="text-[11px] text-white/35 mt-0.5">{s.sub}</p>
                      </div>
                      <ArrowRight size={13} className="text-white/15 group-hover/item:text-[#b5a47a]/50 group-hover/item:translate-x-0.5 transition-all duration-200" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/intervention"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-250 ${
                pathname === "/intervention" ? "text-white bg-white/12" : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >
              <Wrench size={13} className="text-[#b5a47a]" />
              Intervention
            </Link>

            <Link href="/contrat-entretien"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all duration-250 ${
                pathname === "/contrat-entretien" ? "text-white bg-white/12" : "text-white/75 hover:text-white hover:bg-white/10"
              }`}
            >
              <FileText size={13} className="text-[#b5a47a]" />
              Contrat d&apos;entretien
            </Link>

          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href="tel:0555397299"
              className="hidden md:flex items-center gap-2 text-[12.5px] font-medium text-white/50 hover:text-white transition-colors px-3 py-2 rounded-full hover:bg-white/8"
            >
              <Phone size={13} className="text-[#b5a47a]" />
              05 55 39 72 99
            </a>

            <Link href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[12.5px] font-bold rounded-full bg-[#b5a47a] text-white shadow-md shadow-[#b5a47a]/25 hover:bg-[#a0916a] hover:shadow-[#b5a47a]/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Devis gratuit
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={21} className="text-white" /> : <Menu size={21} className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-[#1a2a38] border-t border-[#b5a47a]/15 px-5 py-5 space-y-1 shadow-2xl">

          <Link href="/" onClick={() => setMobileOpen(false)}
            className={`flex items-center px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              pathname === "/" ? "bg-white/10 text-white" : "text-white/55 hover:text-white hover:bg-white/6"
            }`}
          >Accueil</Link>

          {/* Services accordion */}
          <div>
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                isServiceActive ? "bg-white/10 text-white" : "text-white/55 hover:text-white hover:bg-white/6"
              }`}
            >
              Nos services
              <ChevronDown size={15} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-72 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
              <div className="pl-3 space-y-0.5">
                {services.map(s => (
                  <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                      pathname === s.href ? "bg-[#b5a47a]/15 text-white" : "text-white/45 hover:text-white hover:bg-white/6"
                    }`}
                  >
                    <s.icon size={15} className="text-[#b5a47a] shrink-0" />
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/intervention" onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              pathname === "/intervention" ? "bg-white/10 text-white" : "text-white/55 hover:text-white hover:bg-white/6"
            }`}
          >
            <Wrench size={15} className="text-[#b5a47a]" />
            Intervention
          </Link>

          <Link href="/contrat-entretien" onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
              pathname === "/contrat-entretien" ? "bg-white/10 text-white" : "text-white/55 hover:text-white hover:bg-white/6"
            }`}
          >
            <FileText size={15} className="text-[#b5a47a]" />
            Contrat d&apos;entretien
          </Link>

          <div className="pt-3 grid grid-cols-2 gap-3">
            <a href="tel:0555397299"
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/6 border border-white/10 text-sm font-medium text-white/65"
            >
              <Phone size={14} className="text-[#b5a47a]" /> Appeler
            </a>
            <Link href="/contact" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#b5a47a] text-sm font-bold text-white shadow-md"
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
