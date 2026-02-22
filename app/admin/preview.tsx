"use client";

import { useAdmin } from "@/components/admin/AdminContext";
import { EditableText, EditableImage } from "@/components/admin/EditableComponents";
import Link from "next/link";
import {
  Droplets, Layers, Leaf, Shield, ArrowRight, Phone,
  Award, Clock, MapPin, CheckCircle, Star, ShieldCheck,
  ClipboardList, Wrench, ThumbsUp, Users, Building2,
  Hammer, Eye, ChevronRight, Zap, Target, HeartHandshake,
} from "lucide-react";

const serviceIcons = [Droplets, Layers, Leaf, Shield];
const serviceColors = [
  "from-cyan-500/20 to-blue-500/10",
  "from-amber-500/20 to-orange-500/10",
  "from-emerald-500/20 to-green-500/10",
  "from-violet-500/20 to-purple-500/10",
];
const stepIcons = [ClipboardList, Wrench, ShieldCheck];
const engagementIcons = [Target, Zap, HeartHandshake];
const statIcons = [Clock, MapPin, Building2, Star];
const trustIcons = [Award, Users, Eye];

export default function AdminSitePreview() {
  const { getField } = useAdmin();

  const services = (getField("services") as Array<Record<string, string>>) || [];
  const stats = (getField("stats") as Array<Record<string, string>>) || [];
  const engagements = (getField("engagements") as Array<Record<string, string>>) || [];
  const steps = (getField("steps") as Array<Record<string, string>>) || [];
  const realisations = (getField("realisations") as Array<Record<string, string>>) || [];
  const partners = (getField("partners") as Array<Record<string, string>>) || [];
  const highlights = (getField("about_highlights") as string[]) || [];
  const trustItems = (getField("hero_trust") as string[]) || [];
  const departments = (getField("zone_departments") as Array<Record<string, string>>) || [];

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <div className="bg-[#1a2a38] shadow-[0_2px_24px_rgba(0,0,0,0.35)] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
              </svg>
            </div>
            <div>
              <span className="text-[13px] font-extrabold text-white tracking-tight leading-none">Étanchéité</span>
              <span className="block text-[9.5px] text-[#b5a47a] font-bold uppercase tracking-[0.22em] mt-0.5">du Limousin</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <span>Accueil</span><span>Services ▾</span><span>Interventions</span><span>Contact</span>
          </div>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#1a2a38]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b26]/95 via-[#1a2a38]/80 to-[#2d3e50]/60" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#b5a47a]/8 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#3d5166]/20 blur-[100px]" />
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 border border-[#b5a47a]/10 rounded-full hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-32 pb-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#b5a47a]/10 border border-[#b5a47a]/25 mb-8">
                <div className="w-2 h-2 rounded-full bg-[#b5a47a] animate-pulse" />
                <EditableText fieldKey="hero_badge" as="span" className="text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em]" />
              </div>

              <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-black text-white leading-[1.05] mb-7 tracking-tight">
                <EditableText fieldKey="hero_title_1" as="span" />
                <br />
                <span className="relative inline-block">
                  <EditableText fieldKey="hero_title_highlight" as="span" className="text-[#b5a47a]" />
                  <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b5a47a] to-[#b5a47a]/0 rounded-full" />
                </span>
                {" "}
                <EditableText fieldKey="hero_title_2" as="span" />
              </h1>

              <EditableText fieldKey="hero_subtitle" as="p" className="text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-light" />

              <div className="flex flex-wrap gap-4">
                <span className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/25 text-base">
                  <EditableText fieldKey="hero_cta" as="span" />
                  <ArrowRight size={17} />
                </span>
                <span className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/15 text-white font-semibold rounded-full text-base">
                  <Phone size={17} />
                  <EditableText fieldKey="hero_phone" as="span" />
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-8 mt-14 pt-8 border-t border-white/8">
                {trustItems.map((text, i) => {
                  const Icon = trustIcons[i] || Award;
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon size={15} className="text-[#b5a47a]" />
                      </div>
                      <EditableText fieldKey={`hero_trust.${i}`} as="span" className="text-sm text-white/50 font-medium" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex lg:col-span-5 flex-col gap-4">
              <div className="relative group">
                <div className="relative bg-white/[0.07] backdrop-blur-md rounded-3xl p-2.5 border border-white/10">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <EditableImage fieldKey="services.0.img" src={String(getField("services.0.img"))} alt="Chantier" fill />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#f5f0e8] flex items-center justify-center shrink-0">
                            <Hammer size={16} className="text-[#b5a47a]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#2d3e50]">500+ chantiers réalisés</p>
                            <p className="text-[11px] text-slate-400">depuis 1998 en Limousin</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══ STATS ═══ */}
      <section className="relative -mt-16 z-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl shadow-[#2d3e50]/10 border border-[#e4ddd1]/80 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => {
                const Icon = statIcons[i] || Star;
                return (
                  <div key={i} className={`text-center py-8 px-6 group hover:bg-[#faf9f7] transition-colors ${i < stats.length - 1 ? "md:border-r border-[#e4ddd1]/60" : ""}`}>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#ede7d9] flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} className="text-[#b5a47a]" strokeWidth={1.8} />
                    </div>
                    <p className="text-3xl md:text-4xl font-black text-[#2d3e50] leading-none mb-1.5">
                      <EditableText fieldKey={`stats.${i}.value`} as="span" />
                      <EditableText fieldKey={`stats.${i}.suffix`} as="span" />
                    </p>
                    <EditableText fieldKey={`stats.${i}.label`} as="p" className="text-xs text-slate-400 font-medium tracking-wide" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <EditableText fieldKey="services_badge" as="span" className="inline-flex px-4 py-1.5 rounded-full bg-[#f5f0e8] text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em] border border-[#e4ddd1] mb-5" />
            <h2 className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-4 mb-5 leading-tight">
              <EditableText fieldKey="services_title_1" as="span" />{" "}
              <EditableText fieldKey="services_title_highlight" as="span" className="text-[#b5a47a]" />
            </h2>
            <div className="w-16 h-1 bg-[#2d3e50] rounded-full mx-auto mb-6" />
            <EditableText fieldKey="services_subtitle" as="p" className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-base" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {services.map((s, i) => {
              const Icon = serviceIcons[i] || Droplets;
              return (
                <div key={i} className="relative bg-white rounded-2xl border border-[#e4ddd1] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 h-full">
                  <div className="relative h-52 overflow-hidden">
                    <EditableImage fieldKey={`services.${i}.img`} src={s.img} alt={s.title} fill />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/50 via-[#1a2a38]/10 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${serviceColors[i]} opacity-30`} />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <Icon size={22} className="text-[#b5a47a]" strokeWidth={1.8} />
                      </div>
                    </div>
                  </div>
                  <div className="p-7">
                    <EditableText fieldKey={`services.${i}.title`} as="h3" className="text-xl font-bold text-[#2d3e50] mb-2.5" />
                    <EditableText fieldKey={`services.${i}.desc`} as="p" className="text-sm text-slate-400 leading-relaxed mb-5" />
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#b5a47a]">
                      En savoir plus <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ ENGAGEMENTS ═══ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#3d5166]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagements.map((e, i) => {
              const Icon = engagementIcons[i] || Target;
              return (
                <div key={i} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-5">
                    <Icon size={28} className="text-[#b5a47a]" strokeWidth={1.5} />
                  </div>
                  <EditableText fieldKey={`engagements.${i}.title`} as="h3" className="text-lg font-bold text-white mb-2" />
                  <EditableText fieldKey={`engagements.${i}.desc`} as="p" className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-28 bg-[#faf9f7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white">
                <div className="relative aspect-[4/3]">
                  <img src="/svg/etancheite-bitume.svg" alt="Pose membrane" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -top-5 -left-5 bg-[#2d3e50] text-white rounded-2xl px-6 py-5 shadow-2xl hidden md:flex flex-col items-center border border-[#b5a47a]/20">
                <span className="text-4xl font-black leading-none">25+</span>
                <span className="text-[11px] font-bold uppercase tracking-widest mt-1.5 text-[#b5a47a]">ans</span>
              </div>
            </div>

            <div>
              <EditableText fieldKey="about_badge" as="span" className="inline-flex px-4 py-1.5 rounded-full bg-[#f5f0e8] text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em] border border-[#e4ddd1] mb-5" />
              <h2 className="text-2xl md:text-[2.25rem] font-black text-[#2d3e50] mt-4 mb-6 leading-tight">
                <EditableText fieldKey="about_title_1" as="span" />{" "}
                <EditableText fieldKey="about_title_highlight" as="span" className="text-[#b5a47a]" />
              </h2>
              <EditableText fieldKey="about_p1" as="p" className="text-slate-500 leading-relaxed mb-4 text-[15px]" />
              <EditableText fieldKey="about_p2" as="p" className="text-slate-500 leading-relaxed mb-8 text-[15px]" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#e4ddd1]/70 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-[#b5a47a]/10 flex items-center justify-center shrink-0">
                      <CheckCircle size={13} className="text-[#b5a47a]" />
                    </div>
                    <EditableText fieldKey={`about_highlights.${i}`} as="span" className="text-sm text-[#2d3e50] font-semibold" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <EditableText fieldKey="process_badge" as="span" className="inline-flex px-4 py-1.5 rounded-full bg-[#f5f0e8] text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em] border border-[#e4ddd1] mb-5" />
            <EditableText fieldKey="process_title" as="h2" className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-4 mb-5 leading-tight" />
            <div className="w-16 h-1 bg-[#2d3e50] rounded-full mx-auto mb-6" />
            <EditableText fieldKey="process_subtitle" as="p" className="text-slate-400 max-w-xl mx-auto leading-relaxed text-base" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-[2px] bg-gradient-to-r from-[#e4ddd1] via-[#d4c9a8] to-[#e4ddd1]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map((s, i) => {
                const Icon = stepIcons[i] || ClipboardList;
                return (
                  <div key={i} className="text-center relative">
                    <div className="relative z-10 w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#2d3e50] to-[#3d5166] flex items-center justify-center mx-auto mb-7 shadow-lg">
                      <EditableText fieldKey={`steps.${i}.num`} as="span" className="text-lg font-black text-white" />
                    </div>
                    <div className="bg-[#faf9f7] rounded-2xl p-8 border border-[#e4ddd1]/60 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#ede7d9] flex items-center justify-center mx-auto mb-5">
                        <Icon size={24} className="text-[#b5a47a]" />
                      </div>
                      <EditableText fieldKey={`steps.${i}.title`} as="h3" className="text-lg font-bold text-[#2d3e50] mb-3" />
                      <EditableText fieldKey={`steps.${i}.desc`} as="p" className="text-sm text-slate-400 leading-relaxed" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REALISATIONS ═══ */}
      <section className="py-28 bg-[#f5f0e8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <EditableText fieldKey="realisations_badge" as="span" className="inline-flex px-4 py-1.5 rounded-full bg-white text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em] border border-[#e4ddd1] mb-5" />
            <h2 className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-4 mb-5 leading-tight">
              <EditableText fieldKey="realisations_title_1" as="span" />{" "}
              <EditableText fieldKey="realisations_title_highlight" as="span" className="text-[#b5a47a]" />
            </h2>
            <div className="w-16 h-1 bg-[#2d3e50] rounded-full mx-auto mb-6" />
            <EditableText fieldKey="realisations_subtitle" as="p" className="text-slate-400 max-w-lg mx-auto text-base" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {realisations.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#e4ddd1]/60 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <EditableImage fieldKey={`realisations.${i}.img`} src={r.img} alt={r.title} fill />
                  <div className="absolute top-3 left-3">
                    <EditableText fieldKey={`realisations.${i}.type`} as="span" className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#2d3e50] px-3 py-1 rounded-full" />
                  </div>
                </div>
                <div className="p-5">
                  <EditableText fieldKey={`realisations.${i}.title`} as="h3" className="text-sm font-bold text-[#2d3e50] mb-1" />
                  <EditableText fieldKey={`realisations.${i}.sub`} as="p" className="text-xs text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS ═══ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f5f0e8] text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em] border border-[#e4ddd1] mb-5">Nos partenaires</span>
          <h2 className="text-2xl md:text-3xl font-black text-[#2d3e50] mt-4 mb-4">
            <EditableText fieldKey="partners_title_1" as="span" />{" "}
            <EditableText fieldKey="partners_title_highlight" as="span" className="text-[#b5a47a]" />
          </h2>
          <div className="w-16 h-1 bg-[#2d3e50] rounded-full mx-auto mb-5" />
          <EditableText fieldKey="partners_subtitle" as="p" className="text-slate-400 max-w-lg mx-auto mb-14 text-sm leading-relaxed" />

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-4xl mx-auto items-center">
            {partners.map((p, i) => (
              <div key={i} className="flex items-center justify-center py-5 px-3 rounded-2xl bg-[#faf9f7] hover:bg-white hover:shadow-lg transition-all group border border-transparent hover:border-[#e4ddd1]">
                <div className="relative w-16 h-9">
                  <EditableImage fieldKey={`partners.${i}.logo`} src={p.logo} alt={p.name} fill className="object-contain opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ZONE ═══ */}
      <section className="py-28 bg-[#faf9f7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <EditableText fieldKey="zone_badge" as="span" className="inline-flex px-4 py-1.5 rounded-full bg-[#f5f0e8] text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em] border border-[#e4ddd1] mb-5" />
              <h2 className="text-2xl md:text-[2.25rem] font-black text-[#2d3e50] mt-4 mb-6 leading-tight">
                <EditableText fieldKey="zone_title_1" as="span" />{" "}
                <EditableText fieldKey="zone_title_highlight" as="span" className="text-[#b5a47a]" />
              </h2>
              <EditableText fieldKey="zone_text" as="p" className="text-slate-500 leading-relaxed mb-10 text-[15px]" />

              <div className="grid grid-cols-2 gap-4 mb-10">
                {departments.map((d, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-[#e4ddd1]/70 shadow-sm">
                    <EditableText fieldKey={`zone_departments.${i}.code`} as="span" className="text-2xl font-black text-[#b5a47a]" />
                    <EditableText fieldKey={`zone_departments.${i}.name`} as="span" className="text-sm text-[#2d3e50] font-bold" />
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-3 text-[#2d3e50] font-bold text-[15px]">
                <div className="w-10 h-10 rounded-full bg-[#b5a47a]/10 flex items-center justify-center">
                  <Phone size={17} className="text-[#b5a47a]" />
                </div>
                <EditableText fieldKey="contact_phone" as="span" /> — Appelez-nous
              </span>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white">
                <div className="relative aspect-square">
                  <img src="/svg/intervention.svg" alt="Zone" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#b5a47a]/10 flex items-center justify-center shrink-0">
                          <MapPin size={20} className="text-[#b5a47a]" />
                        </div>
                        <div>
                          <EditableText fieldKey="contact_address" as="p" className="text-sm font-bold text-[#2d3e50]" />
                          <EditableText fieldKey="contact_city" as="p" className="text-xs text-slate-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-10 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b26] via-[#1a2a38] to-[#2d3e50]" />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#b5a47a]/10 blur-[100px]" />
            <div className="relative z-10 px-8 py-20 md:px-20 md:py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-7">
                <ThumbsUp size={32} className="text-[#b5a47a]" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-[2.75rem] font-black text-white mb-5 leading-tight">
                <EditableText fieldKey="cta_title_1" as="span" />{" "}
                <EditableText fieldKey="cta_title_highlight" as="span" className="text-[#b5a47a]" />
                {" ?"}
              </h2>
              <EditableText fieldKey="cta_subtitle" as="p" className="text-white/50 max-w-xl mx-auto mb-12 text-base leading-relaxed" />
              <div className="flex flex-wrap items-center justify-center gap-4">
                <span className="group inline-flex items-center gap-2.5 px-9 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl text-base">
                  <EditableText fieldKey="cta_button" as="span" />
                  <ArrowRight size={17} />
                </span>
                <span className="inline-flex items-center gap-2.5 px-9 py-4 bg-white/6 border border-white/12 text-white font-semibold rounded-full text-base">
                  <Phone size={17} /> <EditableText fieldKey="contact_phone" as="span" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#1a2a38] border-t border-[#b5a47a]/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b5a47a] to-[#8a7a5a] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                    <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z" fill="white" opacity="0.95"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[13px] font-extrabold text-white tracking-tight leading-none">Étanchéité</span>
                  <span className="block text-[9px] text-[#b5a47a] font-bold uppercase tracking-[0.22em] mt-0.5">du Limousin</span>
                </div>
              </div>
              <EditableText fieldKey="footer_tagline" as="p" className="text-sm text-white/45 leading-relaxed mb-4" />
              <p className="text-xs text-white/25">SIREN : <EditableText fieldKey="contact_siren" as="span" className="text-xs text-white/25" /></p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#b5a47a] uppercase tracking-widest mb-5">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/45">
                  <Phone size={14} className="text-[#b5a47a]/70 shrink-0" />
                  <EditableText fieldKey="contact_phone" as="span" className="text-sm text-white/45" />
                </div>
                <div className="flex items-start gap-3 text-sm text-white/45">
                  <MapPin size={14} className="text-[#b5a47a]/70 shrink-0 mt-0.5" />
                  <span>
                    <EditableText fieldKey="contact_address" as="span" className="text-sm text-white/45" /><br />
                    <EditableText fieldKey="contact_city" as="span" className="text-sm text-white/45" />
                  </span>
                </div>
                <EditableText fieldKey="contact_email" as="p" className="text-sm text-white/45" />
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[#b5a47a]/15 text-center">
            <p className="text-xs text-white/25">© {new Date().getFullYear()} Étanchéité du Limousin — Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </>
  );
}
