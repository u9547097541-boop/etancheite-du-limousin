"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Droplets, Layers, Leaf, Shield, ArrowRight, Phone,
  Award, Clock, MapPin, CheckCircle, Star, ShieldCheck,
  ClipboardList, Wrench, ThumbsUp, Sparkles, Users, Building2,
  Hammer, Eye, ChevronRight, Zap, Target, HeartHandshake,
} from "lucide-react";

/* ── Animations ── */
const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 0.61, 0.36, 1] },
  }),
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 0.61, 0.36, 1] },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

/* ── Data ── */
const services = [
  { icon: Droplets, title: "Étanchéité liquide", desc: "Résines haute performance Resiplast & BASF pour toitures-terrasses, balcons et sols techniques.", href: "/etancheite-liquide", img: "/svg/etancheite-liquide.svg", color: "from-cyan-500/20 to-blue-500/10" },
  { icon: Layers, title: "Étanchéité bitume", desc: "Membranes bitumineuses monocouches et bicouches Siplast. Technique éprouvée et durable.", href: "/etancheite-bitume", img: "/svg/etancheite-bitume.svg", color: "from-amber-500/20 to-orange-500/10" },
  { icon: Leaf, title: "Toiture végétalisée", desc: "Toits végétaux écologiques et isolants. Esthétique, performance et respect de l\u0027environnement.", href: "/toiture-vegetalisee", img: "/svg/toiture-veg.svg", color: "from-emerald-500/20 to-green-500/10" },
  { icon: Shield, title: "Bardage & isolation", desc: "Bardage Monopanel et Bacacier, isolation Rockwool et Knauf Therm. Protection complète.", href: "/bardage-isolation", img: "/svg/bardage.svg", color: "from-violet-500/20 to-purple-500/10" },
];

const steps = [
  { num: "01", icon: ClipboardList, title: "Diagnostic & devis", desc: "Visite sur site, étude technique complète et devis détaillé sous 48h. Gratuit et sans engagement." },
  { num: "02", icon: Wrench, title: "Réalisation", desc: "Intervention par nos équipes qualifiées avec des matériaux premium de nos partenaires certifiés." },
  { num: "03", icon: ShieldCheck, title: "Garantie & suivi", desc: "Garantie décennale, PV de réception et suivi post-travaux pour votre tranquillité d\u0027esprit." },
];

const realisations = [
  { title: "CHU de Limoges", sub: "Hôpital de jour – Rebeyrol", img: "/svg/etancheite-bitume.svg", type: "Étanchéité bitume" },
  { title: "Crématorium de Tulle", sub: "Étanchéité complète", img: "/svg/chantier.svg", type: "Membrane bitume" },
  { title: "BIOCOOP Limoges", sub: "Toiture végétalisée", img: "/svg/toiture-veg.svg", type: "Végétalisation" },
  { title: "HALARY TP Couzeix", sub: "Nouveau bâtiment", img: "/svg/bardage.svg", type: "Bardage" },
];

const partnerLogos = [
  { name: "Siplast", logo: "/images/partners/siplast.png" },
  { name: "Resiplast", logo: "/images/partners/resiplast.png" },
  { name: "Monopanel", logo: "/images/partners/monopanel.png" },
  { name: "BMI Monarplan", logo: "/images/partners/monarplan.png" },
  { name: "Bluetek", logo: "/images/partners/bluetek.png" },
  { name: "BASF", logo: "/images/partners/basf.png" },
  { name: "Bacacier", logo: "/images/partners/bacacier.png" },
  { name: "Velux", logo: "/images/partners/velux.png" },
];

const stats = [
  { target: 25, suffix: "+", label: "Années d\u0027expérience", icon: Clock },
  { target: 4, suffix: "", label: "Départements couverts", icon: MapPin },
  { target: 500, suffix: "+", label: "Chantiers réalisés", icon: Building2 },
  { target: 100, suffix: "%", label: "Clients satisfaits", icon: Star },
];

/* ── Animated Counter Hook ── */
function AnimatedCounter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const engagements = [
  { icon: Target, title: "Précision", desc: "Diagnostic technique pointu et solutions sur-mesure adaptées à chaque projet." },
  { icon: Zap, title: "Réactivité", desc: "Devis sous 48h, intervention rapide et respect des délais annoncés." },
  { icon: HeartHandshake, title: "Confiance", desc: "Garantie décennale, transparence totale et suivi personnalisé post-travaux." },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO — Grand impact visuel avec gradient animé
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#1a2a38]">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b26]/95 via-[#1a2a38]/80 to-[#2d3e50]/60" />
          {/* Decorative light orbs */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#b5a47a]/8 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#3d5166]/20 blur-[100px]" />
        </div>

        {/* Geometric decorations */}
        <div className="absolute top-20 right-10 w-72 h-72 border border-[#b5a47a]/10 rounded-full hidden lg:block" />
        <div className="absolute bottom-32 right-20 w-48 h-48 border border-white/5 rounded-full hidden lg:block" />

        <div className="container-main relative z-10 pt-32 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left content — 7 cols */}
            <div className="lg:col-span-7">
              <motion.div initial="hidden" animate="show" variants={fade} custom={0}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#b5a47a]/10 border border-[#b5a47a]/25 mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-[#b5a47a] animate-pulse" />
                <span className="text-xs font-bold text-[#b5a47a] uppercase tracking-[0.18em]">
                  Expert depuis 1998
                </span>
              </motion.div>

              <motion.h1 initial="hidden" animate="show" variants={fade} custom={1}
                className="text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-black text-white leading-[1.05] mb-7 tracking-tight"
              >
                Spécialiste en
                <br />
                <span className="relative inline-block">
                  <span className="text-[#b5a47a]">étanchéité</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b5a47a] to-[#b5a47a]/0 rounded-full" />
                </span>
                {" "}à Limoges
              </motion.h1>

              <motion.p initial="hidden" animate="show" variants={fade} custom={2}
                className="text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-light"
              >
                Étanchéité bitume &amp; liquide, toiture végétalisée, bardage et isolation.
                <span className="text-white/80 font-medium"> Intervention professionnelle</span> sur les départements 87, 19, 23 et 24.
              </motion.p>

              <motion.div initial="hidden" animate="show" variants={fade} custom={3}
                className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/25 hover:bg-[#c4b48c] hover:shadow-[#b5a47a]/40 transition-all duration-300 hover:-translate-y-0.5 text-base">
                  Devis gratuit
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <a href="tel:0555397299" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/15 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/25 transition-all duration-300 text-base">
                  <Phone size={17} /> 05 55 39 72 99
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div initial="hidden" animate="show" variants={fade} custom={4}
                className="flex flex-wrap items-center gap-8 mt-14 pt-8 border-t border-white/8"
              >
                {[
                  { icon: Award, text: "Garantie décennale" },
                  { icon: Users, text: "Équipe qualifiée" },
                  { icon: Eye, text: "Devis sous 48h" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <item.icon size={15} className="text-[#b5a47a]" />
                    </div>
                    <span className="text-sm text-white/50 font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right side — 5 cols — Stacked visual cards */}
            <motion.div initial="hidden" animate="show" variants={fadeRight} custom={2}
              className="hidden lg:flex lg:col-span-5 flex-col gap-4"
            >
              {/* Main image card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#b5a47a]/20 to-[#2d3e50]/20 rounded-3xl blur-2xl scale-95 group-hover:scale-100 transition-transform duration-700" />
                <div className="relative bg-white/[0.07] backdrop-blur-md rounded-3xl p-2.5 border border-white/10">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image src="/svg/etancheite-liquide.svg" alt="Chantier étanchéité" fill className="object-cover" />
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

              {/* Two small cards row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.07] backdrop-blur-md rounded-2xl p-2.5 border border-white/10">
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden">
                    <Image src="/svg/chantier.svg" alt="Chantier" fill className="object-cover" />
                  </div>
                </div>
                <div className="bg-white/[0.07] backdrop-blur-md rounded-2xl p-2.5 border border-white/10">
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden">
                    <Image src="/svg/toiture-veg.svg" alt="Toiture végétalisée" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
      </section>


      {/* ═══════════════════════════════════════════════════
          STATS BAR — Chiffres clés flottants
      ═══════════════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 pb-8">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-2xl shadow-[#2d3e50]/10 border border-[#e4ddd1]/80 overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div key={s.label} variants={scaleIn} custom={i}
                  className={`relative text-center py-8 px-6 group hover:bg-[#faf9f7] transition-colors duration-300 ${i < stats.length - 1 ? "md:border-r border-[#e4ddd1]/60" : ""}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#ede7d9] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <s.icon size={20} className="text-[#b5a47a]" strokeWidth={1.8} />
                  </div>
                  <p className="text-3xl md:text-4xl font-black text-[#2d3e50] leading-none mb-1.5">
                    <AnimatedCounter target={s.target} suffix={s.suffix} duration={s.target > 100 ? 2.5 : 1.8} />
                  </p>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          SERVICES — Cards avec gradient hover
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-white overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-20">
            <motion.span variants={fade} custom={0} className="badge-sand inline-flex mb-5">
              Nos expertises
            </motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-2 mb-5 leading-tight">
              Des solutions pour chaque{" "}
              <span className="text-[#b5a47a]">projet</span>
            </motion.h2>
            <motion.div variants={fade} custom={1} className="divider-blue mx-auto mb-6" />
            <motion.p variants={fade} custom={2} className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-base">
              De l&apos;étanchéité classique à la toiture végétalisée, nous maîtrisons chaque technique
              pour garantir la protection durable de vos bâtiments.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {services.map((s, i) => (
              <motion.div key={s.href} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} variants={scaleIn} custom={i}>
                <Link href={s.href} className="block group h-full">
                  <div className="relative bg-white rounded-2xl border border-[#e4ddd1] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#2d3e50]/10 hover:border-[#b5a47a]/40 transition-all duration-500 hover:-translate-y-1.5 h-full">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/50 via-[#1a2a38]/10 to-transparent" />
                      {/* Colored overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-[#2d3e50] transition-colors duration-300">
                          <s.icon size={22} className="text-[#b5a47a] group-hover:text-white transition-colors duration-300" strokeWidth={1.8} />
                        </div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-7">
                      <h3 className="text-xl font-bold text-[#2d3e50] mb-2.5 group-hover:text-[#b5a47a] transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed mb-5">{s.desc}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#b5a47a] group-hover:gap-3 transition-all duration-300">
                        En savoir plus <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Services CTA row */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} custom={0}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <Link href="/intervention" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#2d3e50] text-white font-bold rounded-full shadow-lg shadow-[#2d3e50]/20 hover:bg-[#3d5166] transition-all duration-300 hover:-translate-y-0.5 text-[15px]">
              <Wrench size={16} /> Intervention & dépannage
            </Link>
            <Link href="/contrat-entretien" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#2d3e50] font-bold rounded-full border-2 border-[#2d3e50]/15 hover:border-[#2d3e50]/30 hover:bg-[#faf9f7] transition-all duration-300 hover:-translate-y-0.5 text-[15px]">
              <ShieldCheck size={16} /> Contrat d&apos;entretien
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ENGAGEMENTS — Bande navy avec 3 piliers
      ═══════════════════════════════════════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#3d5166]" />
        <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-[0.06]" />

        <div className="container-main relative z-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {engagements.map((e, i) => (
              <motion.div key={e.title} variants={fade} custom={i}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#b5a47a]/15 group-hover:border-[#b5a47a]/30 transition-all duration-300">
                  <e.icon size={28} className="text-[#b5a47a]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{e.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">{e.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ABOUT — Notre savoir-faire
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-light overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            {/* Image composition */}
            <motion.div variants={fadeLeft} custom={0} className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white">
                <div className="relative aspect-[4/3]">
                  <Image src="/svg/etancheite-bitume.svg" alt="Pose membrane" fill className="object-cover" />
                </div>
              </div>
              {/* Small overlapping image */}
              <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-2xl overflow-hidden shadow-2xl border-[5px] border-white hidden md:block">
                <Image src="/svg/toiture-veg.svg" alt="Toiture végétalisée" fill className="object-cover" />
              </div>
              {/* Badge experience */}
              <div className="absolute -top-5 -left-5 bg-[#2d3e50] text-white rounded-2xl px-6 py-5 shadow-2xl shadow-[#2d3e50]/30 hidden md:flex flex-col items-center border border-[#b5a47a]/20">
                <span className="text-4xl font-black leading-none">25+</span>
                <span className="text-[11px] font-bold uppercase tracking-widest mt-1.5 text-[#b5a47a]">ans</span>
              </div>
              {/* Decorative line */}
              <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 border-2 border-[#b5a47a]/15 rounded-3xl hidden md:block" />
            </motion.div>

            {/* Text content */}
            <motion.div variants={fadeRight} custom={1}>
              <span className="badge-sand mb-5">Qui sommes-nous</span>
              <h2 className="text-2xl md:text-[2.25rem] font-black text-[#2d3e50] mt-4 mb-6 leading-tight">
                L&apos;expertise au service de{" "}
                <span className="text-[#b5a47a]">votre toiture</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4 text-[15px]">
                Créée en 1998, <strong className="text-[#2d3e50]">Étanchéité du Limousin</strong> est une
                entreprise spécialisée dans les travaux d&apos;étanchéité, de bardage et d&apos;isolation
                pour les professionnels et les collectivités.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8 text-[15px]">
                Nous intervenons dans un rayon de <strong className="text-[#2d3e50]">100 km autour de Limoges</strong>,
                couvrant les départements 87, 19, 23 et 24. Notre équipe qualifiée utilise
                exclusivement des matériaux de grandes marques.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  "Matériaux premium certifiés",
                  "Équipe formée et qualifiée",
                  "Garantie décennale",
                  "Devis gratuit sous 48h",
                ].map((item) => (
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
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          PROCESS — Comment ça marche — Timeline
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-white overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-20">
            <motion.span variants={fade} custom={0} className="badge-sand inline-flex mb-5">
              Simple et transparent
            </motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-2 mb-5 leading-tight">
              Comment ça se passe ?
            </motion.h2>
            <motion.div variants={fade} custom={1} className="divider-blue mx-auto mb-6" />
            <motion.p variants={fade} custom={2} className="text-slate-400 max-w-xl mx-auto leading-relaxed text-base">
              Un processus clair de A à Z. On vous accompagne à chaque étape.
            </motion.p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-[2px] bg-gradient-to-r from-[#e4ddd1] via-[#d4c9a8] to-[#e4ddd1]" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {steps.map((s, i) => (
                <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} custom={i}>
                  <div className="text-center relative">
                    {/* Step number circle */}
                    <div className="relative z-10 w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#2d3e50] to-[#3d5166] flex items-center justify-center mx-auto mb-7 shadow-lg shadow-[#2d3e50]/20">
                      <span className="text-lg font-black text-white">{s.num}</span>
                    </div>

                    <div className="bg-[#faf9f7] rounded-2xl p-8 border border-[#e4ddd1]/60 hover:shadow-xl hover:shadow-[#2d3e50]/06 transition-all duration-500 hover:-translate-y-1">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f0e8] to-[#ede7d9] flex items-center justify-center mx-auto mb-5">
                        <s.icon size={24} className="text-[#b5a47a]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#2d3e50] mb-3">{s.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} custom={0}
            className="text-center mt-14"
          >
            <Link href="/contact" className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/20 hover:bg-[#c4b48c] hover:shadow-[#b5a47a]/35 transition-all duration-300 hover:-translate-y-0.5 text-base">
              Commencer mon projet
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          RÉALISATIONS — Showcase moderne
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-sand overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-16">
            <motion.span variants={fade} custom={0} className="badge-sand inline-flex mb-5">Références</motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-[2.75rem] font-black text-[#2d3e50] mt-2 mb-5 leading-tight">
              Ils nous ont fait{" "}
              <span className="text-[#b5a47a]">confiance</span>
            </motion.h2>
            <motion.div variants={fade} custom={1} className="divider-blue mx-auto mb-6" />
            <motion.p variants={fade} custom={2} className="text-slate-400 max-w-lg mx-auto text-base">
              Des projets publics et privés réalisés avec soin dans toute la région.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {realisations.map((r, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-30px" }} variants={scaleIn} custom={i}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-[#e4ddd1]/60 hover:shadow-2xl hover:shadow-[#2d3e50]/10 hover:border-[#b5a47a]/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={r.img} alt={r.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Type badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#2d3e50] px-3 py-1 rounded-full">
                        {r.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-[#2d3e50] mb-1">{r.title}</h3>
                    <p className="text-xs text-slate-400">{r.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          PARTENAIRES — Logos
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 section-white overflow-hidden">
        <div className="container-main text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.span variants={fade} custom={0} className="badge-sand mb-5">Nos partenaires</motion.span>
            <motion.h2 variants={fade} custom={1} className="text-2xl md:text-3xl font-black text-[#2d3e50] mt-4 mb-4">
              Des matériaux de <span className="text-[#b5a47a]">qualité premium</span>
            </motion.h2>
            <motion.div variants={fade} custom={1} className="divider-blue mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-slate-400 max-w-lg mx-auto mb-14 text-sm leading-relaxed">
              Nous travaillons exclusivement avec les plus grandes marques du secteur
              pour vous offrir des résultats durables et fiables.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-4xl mx-auto items-center"
          >
            {partnerLogos.map((p, i) => (
              <motion.div key={p.name} variants={scaleIn} custom={i}
                className="flex items-center justify-center py-5 px-3 rounded-2xl bg-[#faf9f7] hover:bg-white hover:shadow-lg hover:shadow-[#2d3e50]/06 transition-all duration-400 group border border-transparent hover:border-[#e4ddd1] hover:-translate-y-1"
              >
                <div className="relative w-16 h-9">
                  <Image src={p.logo} alt={p.name} fill className="object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ZONE D'INTERVENTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-28 section-light overflow-hidden">
        <div className="container-main">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={fadeLeft} custom={0}>
              <span className="badge-sand mb-5">Zone d&apos;intervention</span>
              <h2 className="text-2xl md:text-[2.25rem] font-black text-[#2d3e50] mt-4 mb-6 leading-tight">
                Nous intervenons dans
                <br />
                tout le{" "}
                <span className="text-[#b5a47a]">Limousin</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-10 text-[15px]">
                Basés à Limoges, nous couvrons un rayon de 100 km. Nos équipes se déplacent
                dans 4 départements pour répondre à vos projets d&apos;étanchéité, de bardage
                et d&apos;isolation thermique.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { code: "87", name: "Haute-Vienne" },
                  { code: "19", name: "Corrèze" },
                  { code: "23", name: "Creuse" },
                  { code: "24", name: "Dordogne" },
                ].map((dept) => (
                  <div key={dept.code} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-[#e4ddd1]/70 shadow-sm hover:shadow-md hover:border-[#b5a47a]/30 transition-all duration-300">
                    <span className="text-2xl font-black text-[#b5a47a]">{dept.code}</span>
                    <div>
                      <span className="text-sm text-[#2d3e50] font-bold block">{dept.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a href="tel:0555397299" className="inline-flex items-center gap-3 text-[#2d3e50] font-bold hover:text-[#b5a47a] transition-colors text-[15px] group">
                <div className="w-10 h-10 rounded-full bg-[#b5a47a]/10 flex items-center justify-center group-hover:bg-[#b5a47a]/20 transition-colors duration-300">
                  <Phone size={17} className="text-[#b5a47a]" />
                </div>
                05 55 39 72 99 — Appelez-nous
              </a>
            </motion.div>

            <motion.div variants={fadeRight} custom={1}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-white">
                  <div className="relative aspect-square">
                    <Image src="/svg/intervention.svg" alt="Zone d'intervention" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#b5a47a]/10 flex items-center justify-center shrink-0">
                            <MapPin size={20} className="text-[#b5a47a]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#2d3e50]">6 allée des Gravelles</p>
                            <p className="text-xs text-slate-400">87000 Limoges</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-40 h-40 border-2 border-[#b5a47a]/15 rounded-3xl hidden md:block" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          CTA FINAL — Appel à l'action impactant
      ═══════════════════════════════════════════════════ */}
      <section className="py-10 section-white overflow-hidden">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b26] via-[#1a2a38] to-[#2d3e50]" />
            <div className="absolute inset-0 bg-[url('/svg/hero-building.svg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            {/* Decorative orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#b5a47a]/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#3d5166]/20 blur-[80px]" />

            <div className="relative z-10 px-8 py-20 md:px-20 md:py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-7">
                <ThumbsUp size={32} className="text-[#b5a47a]" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-[2.75rem] font-black text-white mb-5 leading-tight">
                Prêt à protéger votre{" "}
                <span className="text-[#b5a47a]">bâtiment</span> ?
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-12 text-base leading-relaxed">
                Contactez-nous dès maintenant pour un devis gratuit et sans engagement.
                Notre équipe vous rappelle sous 24h.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact" className="group inline-flex items-center gap-2.5 px-9 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/25 hover:bg-[#c4b48c] hover:shadow-[#b5a47a]/40 transition-all duration-300 hover:-translate-y-0.5 text-base">
                  Demander un devis
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <a href="tel:0555397299" className="inline-flex items-center gap-2.5 px-9 py-4 bg-white/6 backdrop-blur-md border border-white/12 text-white font-semibold rounded-full hover:bg-white/12 hover:border-white/22 transition-all duration-300 text-base">
                  <Phone size={17} /> 05 55 39 72 99
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
