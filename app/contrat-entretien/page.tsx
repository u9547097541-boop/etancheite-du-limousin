"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, Clock, FileText, Phone, ArrowRight,
  CalendarCheck, Wrench, AlertTriangle, Eye, Zap, Award,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

const inclus = [
  { icon: Eye,          title: "Inspection visuelle complète",   desc: "Contrôle de l'état général de l'étanchéité, des relevés et des solins." },
  { icon: Wrench,       title: "Petites réparations préventives", desc: "Reprise des micro-fissures, resserrage des fixations, nettoyage des évacuations." },
  { icon: AlertTriangle,title: "Détection précoce",              desc: "Identification des zones à risque avant qu'elles ne deviennent des sinistres." },
  { icon: FileText,     title: "Rapport d'intervention détaillé",desc: "Document écrit avec photos à chaque visite, historique complet de votre toiture." },
  { icon: CalendarCheck,title: "Planning de visites programmé",  desc: "Interventions régulières selon le contrat choisi (1 à 2 fois par an)." },
  { icon: Zap,          title: "Priorité d'intervention",        desc: "En cas de problème urgent, vous passez en tête de planning." },
];

const formules = [
  {
    name: "Essentiel",
    freq: "1 visite / an",
    price: "Sur devis",
    color: "border-[#e4ddd1]",
    headerBg: "bg-[#f7f5f1]",
    headerText: "text-[#2d3e50]",
    items: [
      "Inspection visuelle complète",
      "Nettoyage des évacuations",
      "Rapport écrit",
      "Petites réparations incluses*",
    ],
    cta: "contact",
    highlight: false,
  },
  {
    name: "Sérénité",
    freq: "2 visites / an",
    price: "Sur devis",
    color: "border-[#b5a47a]/40",
    headerBg: "bg-[#2d3e50]",
    headerText: "text-white",
    items: [
      "Tout le pack Essentiel",
      "2 passages par an (printemps/automne)",
      "Priorité d'intervention urgente",
      "Suivi photographique complet",
      "Alerte préventive par email",
    ],
    cta: "contact",
    highlight: true,
  },
  {
    name: "Premium",
    freq: "Sur mesure",
    price: "Sur devis",
    color: "border-[#b5a47a]/30",
    headerBg: "bg-[#b5a47a]",
    headerText: "text-white",
    items: [
      "Tout le pack Sérénité",
      "Fréquence personnalisée",
      "Réparations étendues incluses",
      "Bilan annuel avec préconisations",
      "Interlocuteur dédié",
    ],
    cta: "contact",
    highlight: false,
  },
];

const avantages = [
  { icon: Shield,       val: "Prévention",   sub: "Évitez les sinistres coûteux" },
  { icon: Award,        val: "Garantie",     sub: "Prolongez la durée de vie" },
  { icon: Clock,        val: "Réactivité",   sub: "Priorité sur les urgences" },
  { icon: FileText,     val: "Traçabilité",  sub: "Rapport à chaque visite" },
];

export default function ContratEntretienPage() {
  return (
    <>
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/svg/about-building.svg"
            alt="Contrat d'entretien"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2a38]/92 via-[#2d3e50]/80 to-[#1a2a38]/50" />
        </div>

        <div className="container-main relative z-10 pt-28 pb-16">
          <motion.div initial="hidden" animate="show" variants={fade} custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 backdrop-blur-md border border-white/12 mb-5"
          >
            <FileText size={13} className="text-[#b5a47a]" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Maintenance préventive</span>
          </motion.div>

          <motion.h1 initial="hidden" animate="show" variants={fade} custom={1}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] mb-5 tracking-tight max-w-2xl"
          >
            Contrat d&apos;entretien<br />
            <span className="text-[#b5a47a]">toiture & étanchéité</span>
          </motion.h1>

          <motion.p initial="hidden" animate="show" variants={fade} custom={2}
            className="text-base text-white/65 max-w-xl mb-8 leading-relaxed"
          >
            Protégez votre investissement avec un suivi professionnel et régulier.
            Nous inspectons, entretenons et vous alertons avant que le moindre problème
            ne devienne un sinistre.
          </motion.p>

          <motion.div initial="hidden" animate="show" variants={fade} custom={3}
            className="flex flex-wrap gap-3"
          >
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#b5a47a] text-white font-bold rounded-full shadow-lg shadow-[#b5a47a]/30 hover:bg-[#a0916a] transition-all duration-300 hover:-translate-y-0.5 text-sm"
            >
              Demander un contrat <ArrowRight size={15} />
            </Link>
            <a href="tel:0555397299"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/8 backdrop-blur-md border border-white/15 text-white font-semibold rounded-full hover:bg-white/15 transition-all duration-300 text-sm"
            >
              <Phone size={15} /> 05 55 39 72 99
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>


      {/* ═══════════════════════════════════════
          AVANTAGES CHIFFRES
      ═══════════════════════════════════════ */}
      <section className="relative -mt-8 z-10 pb-4">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl shadow-[#2d3e50]/08 border border-[#e4ddd1] p-2"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {avantages.map((a, i) => (
                <motion.div key={a.val} variants={scaleIn} custom={i}
                  className={`text-center py-7 px-4 ${i < avantages.length - 1 ? "md:border-r border-[#e4ddd1]" : ""}`}
                >
                  <a.icon size={20} className="text-[#b5a47a] mx-auto mb-2" strokeWidth={1.8} />
                  <p className="text-lg font-black text-[#2d3e50]">{a.val}</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{a.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          POURQUOI UN CONTRAT
      ═══════════════════════════════════════ */}
      <section className="py-24 section-white overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fade} custom={0}>
              <span className="badge-sand mb-4">Pourquoi s&apos;engager ?</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#2d3e50] mt-4 mb-6 leading-tight">
                Une toiture entretenue,<br />
                <span className="text-[#b5a47a]">c&apos;est 2× plus longtemps sans sinistre</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Une étanchéité non entretenue se dégrade silencieusement. Les micro-fissures, l&apos;obstruction
                des évacuations ou le décollement d&apos;une membrane peuvent provoquer des infiltrations
                massives, souvent décelées trop tard.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Avec un contrat d&apos;entretien <strong className="text-[#2d3e50]">Les Cœurs de Madagascar</strong>,
                vous bénéficiez d&apos;un suivi professionnel régulier, d&apos;une détection précoce des anomalies
                et d&apos;une traçabilité complète des interventions.
              </p>

              <div className="space-y-3">
                {[
                  "Préservez la garantie décennale de votre toiture",
                  "Évitez les mauvaises surprises en hiver",
                  "Valorisez votre patrimoine immobilier",
                  "Réduisez le coût global des réparations sur 10 ans",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f5f0e8] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle size={12} className="text-[#b5a47a]" />
                    </div>
                    <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fade} custom={1}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#2d3e50]/12">
                  <div className="relative aspect-[4/3]">
                    <Image src="/svg/etancheite-bitume.svg" alt="Entretien toiture" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/50 to-transparent" />
                  </div>
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-xl border border-[#e4ddd1]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center">
                      <Shield size={18} className="text-[#b5a47a]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#2d3e50]">Protection totale</p>
                      <p className="text-xs text-slate-400">Inspection &amp; rapport inclus</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          CE QUI EST INCLUS
      ═══════════════════════════════════════ */}
      <section className="py-24 section-light overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-14">
            <motion.span variants={fade} custom={0} className="badge-sand">Ce qui est inclus</motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-4xl font-black text-[#2d3e50] mt-4 mb-3">
              Un service complet à chaque visite
            </motion.h2>
            <motion.div variants={fade} custom={1} className="divider-sand mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Chaque intervention est documentée, photographiée et consignée dans un rapport remis au client.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inclus.map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-30px" }} variants={scaleIn} custom={i}>
                <div className="bg-white rounded-2xl p-6 border border-[#e4ddd1] hover:border-[#b5a47a]/40 hover:shadow-lg hover:shadow-[#2d3e50]/06 transition-all duration-500 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#f5f0e8] flex items-center justify-center mb-5">
                    <item.icon size={22} className="text-[#b5a47a]" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-[#2d3e50] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          FORMULES
      ═══════════════════════════════════════ */}
      <section className="py-24 section-white overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-14">
            <motion.span variants={fade} custom={0} className="badge-sand">Nos formules</motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-4xl font-black text-[#2d3e50] mt-4 mb-3">
              Choisissez votre niveau de protection
            </motion.h2>
            <motion.div variants={fade} custom={1} className="divider-sand mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Tous les tarifs sont établis sur devis, selon la surface et la complexité de votre toiture.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {formules.map((f, i) => (
              <motion.div key={f.name} initial="hidden" whileInView="show" viewport={{ once: true }} variants={scaleIn} custom={i}>
                <div className={`relative rounded-2xl border-2 ${f.color} overflow-hidden h-full flex flex-col shadow-sm ${f.highlight ? "shadow-xl shadow-[#2d3e50]/10" : ""}`}>
                  {f.highlight && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#b5a47a] text-white text-[10px] font-bold uppercase tracking-wider">
                      Recommandé
                    </div>
                  )}
                  <div className={`${f.headerBg} px-7 py-7`}>
                    <p className={`text-xl font-black ${f.headerText}`}>{f.name}</p>
                    <p className={`text-sm mt-1 ${f.highlight ? "text-white/60" : "text-slate-400"}`}>{f.freq}</p>
                    <p className={`text-2xl font-black mt-3 ${f.headerText}`}>{f.price}</p>
                  </div>
                  <div className="bg-white px-7 py-6 flex-1 flex flex-col">
                    <ul className="space-y-3 flex-1 mb-7">
                      {f.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle size={15} className="text-[#b5a47a] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-600 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact"
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                        f.highlight
                          ? "bg-[#2d3e50] text-white shadow-md shadow-[#2d3e50]/20 hover:bg-[#3d5166]"
                          : "bg-[#f5f0e8] text-[#2d3e50] hover:bg-[#ebe6dc]"
                      }`}
                    >
                      Demander un devis <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            * Petites réparations : reprise des joints, soudure de membrane jusqu&apos;à 0,5m². Au-delà, devis complémentaire.
          </p>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          APERÇU DU CONTRAT D'ENTRETIEN
      ═══════════════════════════════════════ */}
      <section className="py-24 bg-[#1a2a38] overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-16">
            <motion.span variants={fade} custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b5a47a]/15 border border-[#b5a47a]/30 text-[#d4c9a8] text-xs font-bold uppercase tracking-widest mb-4"
            >
              <FileText size={13} /> Document officiel
            </motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-4xl font-black text-white mt-2 mb-4">
              Aperçu de notre contrat d&apos;entretien
            </motion.h2>
            <div className="w-16 h-1 bg-[#b5a47a] rounded mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Un document professionnel, clair et détaillé qui encadre chaque intervention.
              Voici à quoi ressemble notre contrat d&apos;entretien remis à chaque client.
            </motion.p>
          </motion.div>

          {/* Document pages — fanned layout */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="relative max-w-5xl mx-auto"
          >
            {/* 3 pages side by side with slight overlap effect */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { src: "/images/documents/contrat-page-1.png", label: "Page 1 — Informations & conditions", page: "1" },
                { src: "/images/documents/contrat-page-2.png", label: "Page 2 — Détail des prestations", page: "2" },
                { src: "/images/documents/contrat-page-3.png", label: "Page 3 — Engagements & signatures", page: "3" },
              ].map((doc, i) => (
                <motion.div key={i} variants={scaleIn} custom={i} className="group">
                  <div className="relative">
                    {/* Page number badge */}
                    <div className="absolute -top-3 -right-3 z-20 w-9 h-9 rounded-full bg-[#b5a47a] text-white text-sm font-black flex items-center justify-center shadow-lg shadow-[#b5a47a]/30">
                      {doc.page}
                    </div>
                    {/* Paper shadow effect */}
                    <div className="absolute inset-0 bg-white/5 rounded-2xl translate-x-2 translate-y-2" />
                    <div className="absolute inset-0 bg-white/3 rounded-2xl translate-x-1 translate-y-1" />
                    {/* Document image */}
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-[#b5a47a]/20 group-hover:shadow-[#b5a47a]/20 group-hover:border-[#b5a47a]/40 transition-all duration-500 group-hover:-translate-y-2">
                      <div className="relative aspect-[788/1120]">
                        <Image
                          src={doc.src}
                          alt={doc.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Label */}
                  <p className="text-center text-sm text-white/50 mt-4 font-medium group-hover:text-[#d4c9a8] transition-colors">
                    {doc.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom highlight bar */}
            <motion.div variants={fade} custom={3}
              className="mt-12 bg-[#2d3e50] rounded-2xl border border-[#b5a47a]/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#b5a47a]/15 flex items-center justify-center shrink-0">
                <Shield size={24} className="text-[#b5a47a]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-1">Un contrat clair, sans surprise</h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  Chaque contrat détaille les prestations incluses, la fréquence des visites, les conditions d&apos;intervention
                  et les engagements des deux parties. Vous savez exactement ce que vous payez.
                </p>
              </div>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#b5a47a] text-white font-bold rounded-full text-sm hover:bg-[#a0916a] transition-all shrink-0 shadow-md shadow-[#b5a47a]/25"
              >
                Demander le mien <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════ */}
      <section className="py-24 section-white overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#3d5166]" />
            <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            {/* Decorative sand line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b5a47a]/50 to-transparent" />

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#b5a47a]/15 border border-[#b5a47a]/25 flex items-center justify-center mx-auto mb-6">
                <FileText size={28} className="text-[#b5a47a]" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Protégez votre toiture dès aujourd&apos;hui
              </h2>
              <p className="text-white/55 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
                Contactez-nous pour obtenir un devis personnalisé. Nous étudions votre toiture,
                évaluons sa surface et ses spécificités, et vous proposons la formule la plus adaptée.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/25 hover:bg-[#a0916a] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Demander mon contrat <ArrowRight size={16} />
                </Link>
                <a href="tel:0555397299"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/8 border border-white/15 text-white font-semibold rounded-full hover:bg-white/15 transition-all duration-300"
                >
                  <Phone size={16} /> 05 55 39 72 99
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
