import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import {
  Droplets, Layers, Leaf, Shield, ArrowRight, Phone,
  Award, Clock, MapPin, CheckCircle, Star, ShieldCheck,
  ClipboardList, Wrench, ThumbsUp, Users, Building2,
  Hammer, Eye, ChevronRight, Zap, Target, HeartHandshake,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

/* ── Force dynamic so admin saves are reflected instantly ── */
export const dynamic = "force-dynamic";

/* ── Icon / color maps (can't store JSX in JSON) ── */
const statIcons: Record<string, typeof Clock> = { "Années d'expérience": Clock, "Départements couverts": MapPin, "Chantiers réalisés": Building2, "Clients satisfaits": Star };
const serviceIcons: Record<string, typeof Droplets> = { "Étanchéité liquide": Droplets, "Étanchéité bitume": Layers, "Toiture végétalisée": Leaf, "Bardage & isolation": Shield };
const serviceColors: Record<string, string> = { "Étanchéité liquide": "from-cyan-500/20 to-blue-500/10", "Étanchéité bitume": "from-amber-500/20 to-orange-500/10", "Toiture végétalisée": "from-emerald-500/20 to-green-500/10", "Bardage & isolation": "from-violet-500/20 to-purple-500/10" };
const engagementIcons: Record<string, typeof Target> = { "Précision": Target, "Réactivité": Zap, "Confiance": HeartHandshake };
const stepIcons: Record<string, typeof ClipboardList> = { "01": ClipboardList, "02": Wrench, "03": ShieldCheck };
const trustIcons: Record<string, typeof Award> = { "Garantie décennale": Award, "Équipe qualifiée": Users, "Devis sous 48h": Eye };

interface ContentData {
  hero_badge: string; hero_title_1: string; hero_title_highlight: string; hero_title_2: string;
  hero_subtitle: string; hero_cta: string; hero_phone: string; hero_trust: string[];
  stats: { value: string; suffix: string; label: string }[];
  services_badge: string; services_title_1: string; services_title_highlight: string; services_subtitle: string;
  services: { title: string; desc: string; href: string; img: string }[];
  engagements: { title: string; desc: string }[];
  about_badge: string; about_title_1: string; about_title_highlight: string; about_p1: string; about_p2: string;
  about_highlights: string[];
  process_badge: string; process_title: string; process_subtitle: string;
  steps: { num: string; title: string; desc: string }[];
  realisations_badge: string; realisations_title_1: string; realisations_title_highlight: string; realisations_subtitle: string;
  realisations: { title: string; sub: string; img: string; type: string }[];
  partners_title_1: string; partners_title_highlight: string; partners_subtitle: string;
  partners: { name: string; logo: string }[];
  zone_badge: string; zone_title_1: string; zone_title_highlight: string; zone_text: string;
  zone_departments: { code: string; name: string }[];
  cta_title_1: string; cta_title_highlight: string; cta_subtitle: string; cta_button: string;
  contact_address: string; contact_city: string; contact_phone: string; contact_email: string;
}

async function loadContent(): Promise<ContentData> {
  const filePath = path.join(process.cwd(), "content", "home.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export default async function HomePage() {
  const d = await loadContent();

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#1a2a38]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b26]/95 via-[#1a2a38]/80 to-[#2d3e50]/60" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#b5a47a]/8 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#3d5166]/20 blur-[100px]" />
        </div>

        <div className="absolute top-20 right-10 w-72 h-72 border border-[#b5a47a]/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-32 right-20 w-48 h-48 border border-white/5 rounded-full hidden lg:block" />

        <div className="container-main relative z-10 pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="hero-anim-1 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#b5a47a]/10 border border-[#b5a47a]/25 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#b5a47a] animate-pulse" />
                <span className="text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em]">{d.hero_badge}</span>
              </div>

              <h1 className="hero-anim-2 text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-black text-white leading-[1.05] mb-7 tracking-tight">
                {d.hero_title_1}<br />
                <span className="relative inline-block">
                  <span className="text-[#b5a47a]">{d.hero_title_highlight}</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b5a47a] to-[#b5a47a]/0 rounded-full" />
                </span>
                {" "}{d.hero_title_2}
              </h1>

              <p className="hero-anim-3 text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-light">
                {d.hero_subtitle}
              </p>

              <div className="hero-anim-4 flex flex-wrap gap-4">
                <Link href="/contact" className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/25 hover:bg-[#c4b48c] hover:shadow-[#b5a47a]/40 transition-all duration-300 hover:-translate-y-0.5 text-base">
                  {d.hero_cta}
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <a href={`tel:${d.hero_phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/15 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/25 transition-all duration-300 text-base">
                  <Phone size={17} /> {d.hero_phone}
                </a>
              </div>

              <div className="hero-anim-5 flex flex-wrap items-center gap-8 mt-14 pt-8 border-t border-white/8">
                {d.hero_trust.map((text) => {
                  const Icon = trustIcons[text] || Award;
                  return (
                    <div key={text} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon size={15} className="text-[#b5a47a]" />
                      </div>
                      <span className="text-sm text-white/50 font-medium">{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hero-anim-right hidden lg:flex lg:col-span-5 flex-col gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#b5a47a]/20 to-[#2d3e50]/20 rounded-3xl blur-2xl scale-95 group-hover:scale-100 transition-transform duration-700" />
                <div className="relative bg-white/[0.07] backdrop-blur-md rounded-3xl p-2.5 border border-white/10">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image src="/svg/etancheite-liquide.svg" alt="Chantier étanchéité" fill className="object-cover" sizes="(max-width: 1024px) 0px, 40vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#f5f0e8] flex items-center justify-center shrink-0">
                            <Hammer size={16} className="text-[#b5a47a]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#2d3e50]">{d.stats[2]?.value}{d.stats[2]?.suffix} {d.stats[2]?.label.toLowerCase()}</p>
                            <p className="text-[11px] text-slate-400">depuis 1998 en Limousin</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.07] backdrop-blur-md rounded-2xl p-2.5 border border-white/10">
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden">
                    <Image src="/svg/chantier.svg" alt="Chantier" fill className="object-cover" sizes="20vw" />
                  </div>
                </div>
                <div className="bg-white/[0.07] backdrop-blur-md rounded-2xl p-2.5 border border-white/10">
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden">
                    <Image src="/svg/toiture-veg.svg" alt="Toiture végétalisée" fill className="object-cover" sizes="20vw" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>


      {/* ═══════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 pb-8">
        <div className="container-main">
          <Reveal>
            <div className="bg-white rounded-2xl shadow-2xl shadow-[#2d3e50]/10 border border-[#e4ddd1]/80 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {d.stats.map((s, i) => {
                  const Icon = statIcons[s.label] || Star;
                  return (
                    <div key={s.label}
                      className={`relative text-center py-8 px-6 group hover:bg-[#faf9f7] transition-colors duration-300 ${i < d.stats.length - 1 ? "md:border-r border-[#e4ddd1]/60" : ""}`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#ede7d9] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} className="text-[#b5a47a]" strokeWidth={1.8} />
                      </div>
                      <p className="text-3xl md:text-4xl font-black text-[#2d3e50] leading-none mb-1.5">
                        <AnimatedCounter target={parseInt(s.value) || 0} suffix={s.suffix} duration={parseInt(s.value) > 100 ? 2.5 : 1.8} />
                      </p>
                      <p className="text-xs text-slate-400 font-medium tracking-wide">{s.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-white overflow-hidden">
        <div className="container-main">
          <Reveal>
            <div className="text-center mb-20">
              <span className="badge-sand inline-flex mb-5">{d.services_badge}</span>
              <h2 className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-2 mb-5 leading-tight">
                {d.services_title_1}{" "}
                <span className="text-[#b5a47a]">{d.services_title_highlight}</span>
              </h2>
              <div className="divider-blue mx-auto mb-6" />
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-base">{d.services_subtitle}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {d.services.map((s, i) => {
              const Icon = serviceIcons[s.title] || Droplets;
              const color = serviceColors[s.title] || "from-cyan-500/20 to-blue-500/10";
              return (
                <Reveal key={s.href} delay={i * 80}>
                  <Link href={s.href} className="block group h-full">
                    <div className="relative bg-white rounded-2xl border border-[#e4ddd1] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#2d3e50]/10 hover:border-[#b5a47a]/40 transition-all duration-500 hover:-translate-y-1.5 h-full">
                      <div className="relative h-52 overflow-hidden">
                        <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/50 via-[#1a2a38]/10 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-[#2d3e50] transition-colors duration-300">
                            <Icon size={22} className="text-[#b5a47a] group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
                          </div>
                        </div>
                      </div>
                      <div className="p-7">
                        <h3 className="text-xl font-bold text-[#2d3e50] mb-2.5 group-hover:text-[#b5a47a] transition-colors duration-300">{s.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed mb-5">{s.desc}</p>
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#b5a47a] group-hover:gap-3 transition-all duration-300">
                          En savoir plus <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Link href="/intervention" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#2d3e50] text-white font-bold rounded-full shadow-lg shadow-[#2d3e50]/20 hover:bg-[#3d5166] transition-all duration-300 hover:-translate-y-0.5 text-[15px]">
                <Wrench size={16} /> Intervention &amp; dépannage
              </Link>
              <Link href="/contrat-entretien" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#2d3e50] font-bold rounded-full border-2 border-[#2d3e50]/15 hover:border-[#2d3e50]/30 hover:bg-[#faf9f7] transition-all duration-300 hover:-translate-y-0.5 text-[15px]">
                <ShieldCheck size={16} /> Contrat d&apos;entretien
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ENGAGEMENTS
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#3d5166]" />
        <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-[0.06]" />
        <div className="container-main relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {d.engagements.map((e, i) => {
              const Icon = engagementIcons[e.title] || Target;
              return (
                <Reveal key={e.title} delay={i * 100}>
                  <div className="text-center group">
                    <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#b5a47a]/15 group-hover:border-[#b5a47a]/30 transition-all duration-300">
                      <Icon size={28} className="text-[#b5a47a]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{e.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">{e.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-light overflow-hidden">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white">
                  <div className="relative aspect-[4/3]">
                    <Image src="/svg/etancheite-bitume.svg" alt="Pose membrane" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-2xl overflow-hidden shadow-2xl border-[5px] border-white hidden md:block">
                  <Image src="/svg/toiture-veg.svg" alt="Toiture végétalisée" fill className="object-cover" sizes="176px" />
                </div>
                <div className="absolute -top-5 -left-5 bg-[#2d3e50] text-white rounded-2xl px-6 py-5 shadow-2xl shadow-[#2d3e50]/30 hidden md:flex flex-col items-center border border-[#b5a47a]/20">
                  <span className="text-4xl font-black leading-none">{d.stats[0]?.value}{d.stats[0]?.suffix}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest mt-1.5 text-[#b5a47a]">ans</span>
                </div>
                <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 border-2 border-[#b5a47a]/15 rounded-3xl hidden md:block" />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div>
                <span className="badge-sand mb-5">{d.about_badge}</span>
                <h2 className="text-2xl md:text-[2.25rem] font-black text-[#2d3e50] mt-4 mb-6 leading-tight">
                  {d.about_title_1}{" "}
                  <span className="text-[#b5a47a]">{d.about_title_highlight}</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-4 text-[15px]">{d.about_p1}</p>
                <p className="text-slate-500 leading-relaxed mb-8 text-[15px]">{d.about_p2}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {d.about_highlights.map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#e4ddd1]/70 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-[#b5a47a]/10 flex items-center justify-center shrink-0">
                        <CheckCircle size={13} className="text-[#b5a47a]" />
                      </div>
                      <span className="text-sm text-[#2d3e50] font-semibold">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#2d3e50] text-white font-bold rounded-full shadow-lg shadow-[#2d3e50]/20 hover:bg-[#3d5166] transition-all duration-300 hover:-translate-y-0.5 text-[15px]">
                  Nous contacter
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-white overflow-hidden">
        <div className="container-main">
          <Reveal>
            <div className="text-center mb-20">
              <span className="badge-sand inline-flex mb-5">{d.process_badge}</span>
              <h2 className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-2 mb-5 leading-tight">{d.process_title}</h2>
              <div className="divider-blue mx-auto mb-6" />
              <p className="text-slate-400 max-w-xl mx-auto leading-relaxed text-base">{d.process_subtitle}</p>
            </div>
          </Reveal>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-[2px] bg-gradient-to-r from-[#e4ddd1] via-[#d4c9a8] to-[#e4ddd1]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {d.steps.map((s, i) => {
                const Icon = stepIcons[s.num] || ClipboardList;
                return (
                  <Reveal key={i} delay={i * 120}>
                    <div className="text-center relative">
                      <div className="relative z-10 w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#2d3e50] to-[#3d5166] flex items-center justify-center mx-auto mb-7 shadow-lg shadow-[#2d3e50]/20">
                        <span className="text-lg font-black text-white">{s.num}</span>
                      </div>
                      <div className="bg-[#faf9f7] rounded-2xl p-8 border border-[#e4ddd1]/60 hover:shadow-xl hover:shadow-[#2d3e50]/06 transition-all duration-500 hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#ede7d9] flex items-center justify-center mx-auto mb-5">
                          <Icon size={24} className="text-[#b5a47a]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#2d3e50] mb-3">{s.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={200}>
            <div className="text-center mt-14">
              <Link href="/contact" className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/20 hover:bg-[#c4b48c] hover:shadow-[#b5a47a]/35 transition-all duration-300 hover:-translate-y-0.5 text-base">
                Commencer mon projet
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          RÉALISATIONS
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-sand overflow-hidden">
        <div className="container-main">
          <Reveal>
            <div className="text-center mb-16">
              <span className="badge-sand inline-flex mb-5">{d.realisations_badge}</span>
              <h2 className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-2 mb-5 leading-tight">
                {d.realisations_title_1}{" "}
                <span className="text-[#b5a47a]">{d.realisations_title_highlight}</span>
              </h2>
              <div className="divider-blue mx-auto mb-6" />
              <p className="text-slate-400 max-w-lg mx-auto text-base">{d.realisations_subtitle}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {d.realisations.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-[#e4ddd1]/60 hover:shadow-2xl hover:shadow-[#2d3e50]/10 hover:border-[#b5a47a]/30 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={r.img} alt={r.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#2d3e50] px-3 py-1 rounded-full">{r.type}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-sm font-bold text-[#2d3e50] mb-1">{r.title}</h3>
                      <p className="text-xs text-slate-400">{r.sub}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          PARTENAIRES
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 section-white overflow-hidden">
        <div className="container-main text-center">
          <Reveal>
            <div>
              <span className="badge-sand mb-5">Nos partenaires</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#2d3e50] mt-4 mb-4">
                {d.partners_title_1} <span className="text-[#b5a47a]">{d.partners_title_highlight}</span>
              </h2>
              <div className="divider-blue mx-auto mb-5" />
              <p className="text-slate-400 max-w-lg mx-auto mb-14 text-sm leading-relaxed">{d.partners_subtitle}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-4xl mx-auto items-center">
              {d.partners.map((p) => (
                <div key={p.name}
                  className="flex items-center justify-center py-5 px-3 rounded-2xl bg-[#faf9f7] hover:bg-white hover:shadow-lg hover:shadow-[#2d3e50]/06 transition-all duration-400 group border border-transparent hover:border-[#e4ddd1] hover:-translate-y-1"
                >
                  <div className="relative w-16 h-9">
                    <Image src={p.logo} alt={p.name} fill className="object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0" sizes="64px" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ZONE D'INTERVENTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-light overflow-hidden">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div>
                <span className="badge-sand mb-5">{d.zone_badge}</span>
                <h2 className="text-2xl md:text-[2.25rem] font-black text-[#2d3e50] mt-4 mb-6 leading-tight">
                  {d.zone_title_1}<br />
                  <span className="text-[#b5a47a]">{d.zone_title_highlight}</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-10 text-[15px]">{d.zone_text}</p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {d.zone_departments.map((dept) => (
                    <div key={dept.code} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-[#e4ddd1]/70 shadow-sm hover:shadow-md hover:border-[#b5a47a]/30 transition-all duration-300">
                      <span className="text-2xl font-black text-[#b5a47a]">{dept.code}</span>
                      <span className="text-sm text-[#2d3e50] font-bold block">{dept.name}</span>
                    </div>
                  ))}
                </div>

                <a href={`tel:${d.contact_phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 text-[#2d3e50] font-bold hover:text-[#b5a47a] transition-colors text-[15px] group">
                  <div className="w-10 h-10 rounded-full bg-[#b5a47a]/10 flex items-center justify-center group-hover:bg-[#b5a47a]/20 transition-colors duration-300">
                    <Phone size={17} className="text-[#b5a47a]" />
                  </div>
                  {d.contact_phone} — Appelez-nous
                </a>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white">
                  <div className="relative aspect-square">
                    <Image src="/svg/intervention.svg" alt="Zone d'intervention" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#b5a47a]/10 flex items-center justify-center shrink-0">
                            <MapPin size={20} className="text-[#b5a47a]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#2d3e50]">{d.contact_address}</p>
                            <p className="text-xs text-slate-400">{d.contact_city}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 border-2 border-[#b5a47a]/15 rounded-3xl hidden md:block" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════ */}
      <section className="py-10 section-white overflow-hidden">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b26] via-[#1a2a38] to-[#2d3e50]" />
            <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#b5a47a]/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#3d5166]/20 blur-[80px]" />

            <div className="relative z-10 px-8 py-20 md:px-20 md:py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-7">
                <ThumbsUp size={32} className="text-[#b5a47a]" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-[2.75rem] font-black text-white mb-5 leading-tight">
                {d.cta_title_1}{" "}
                <span className="text-[#b5a47a]">{d.cta_title_highlight}</span> ?
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-12 text-base leading-relaxed">{d.cta_subtitle}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact" className="group inline-flex items-center gap-2.5 px-9 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/25 hover:bg-[#c4b48c] hover:shadow-[#b5a47a]/40 transition-all duration-300 hover:-translate-y-0.5 text-base">
                  {d.cta_button}
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <a href={`tel:${d.contact_phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2.5 px-9 py-4 bg-white/6 backdrop-blur-md border border-white/12 text-white font-semibold rounded-full hover:bg-white/12 hover:border-white/22 transition-all duration-300 text-base">
                  <Phone size={17} /> {d.contact_phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
