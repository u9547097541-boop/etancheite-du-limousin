"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wrench, MapPin, Phone, ArrowRight, Clock, CheckCircle,
  Droplets, Layers, Leaf, Shield, AlertTriangle, Building2,
  Users, Hammer, FileText, ChevronRight,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

const interventionTypes = [
  {
    icon: Droplets,
    title: "Étanchéité liquide",
    desc: "Application de résines et membranes liquides sur toitures-terrasses, balcons, terrasses carrelées et parkings.",
    details: ["Résines Resiplast & BASF", "Application à froid sans soudure", "Adapté aux supports complexes", "Séchage rapide"],
    href: "/etancheite-liquide",
  },
  {
    icon: Layers,
    title: "Étanchéité bitume",
    desc: "Pose de membranes bitumineuses monocouches ou bicouches par torchage, pour toitures-terrasses et toits plats.",
    details: ["Membranes Siplast & Monarplan", "Torchage professionnel", "Traitement des relevés & noues", "Compatible toutes surfaces"],
    href: "/etancheite-bitume",
  },
  {
    icon: Leaf,
    title: "Toiture végétalisée",
    desc: "Conception et réalisation de toitures végétales extensives et semi-intensives avec système drainant professionnel.",
    details: ["Étude de faisabilité gratuite", "Drainage & rétention d'eau", "Plantes adaptées au climat", "Entretien inclus possible"],
    href: "/toiture-vegetalisee",
  },
  {
    icon: Shield,
    title: "Bardage & isolation",
    desc: "Pose de bardage métallique et isolation de façades pour améliorer l'esthétique et la performance énergétique.",
    details: ["Bardage Monopanel & Bacacier", "Isolation Rockwool & Knauf", "Rénovation & neuf", "Réduction ponts thermiques"],
    href: "/bardage-isolation",
  },
  {
    icon: AlertTriangle,
    title: "Urgences & fuites",
    desc: "Intervention rapide suite à sinistre, fuite ou dégât des eaux. Diagnostic et traitement d'urgence sous 24-48h.",
    details: ["Intervention sous 24h à 48h", "Diagnostic gratuit sur place", "Rapport d'expertise fourni", "Prise en charge assurance"],
    href: "/contact",
  },
  {
    icon: Wrench,
    title: "Contrat d'entretien",
    desc: "Maintenance préventive annuelle pour anticiper les défaillances et prolonger la durée de vie de votre étanchéité.",
    details: ["Visite annuelle incluse", "Compte-rendu détaillé", "Tarif préférentiel", "Réactivité garantie"],
    href: "/contrat-entretien",
  },
];

const departments = [
  {
    code: "87",
    name: "Haute-Vienne",
    cities: ["Limoges", "Saint-Junien", "Rochechouart", "Bellac", "Ambazac", "Isle"],
    color: "bg-[#2d3e50]",
  },
  {
    code: "19",
    name: "Corrèze",
    cities: ["Brive-la-Gaillarde", "Tulle", "Ussel", "Objat", "Malemort", "Égletons"],
    color: "bg-[#3d5166]",
  },
  {
    code: "23",
    name: "Creuse",
    cities: ["Guéret", "Aubusson", "La Souterraine", "Bourganeuf", "Felletin", "Auzances"],
    color: "bg-[#4a6275]",
  },
  {
    code: "24",
    name: "Dordogne",
    cities: ["Périgueux", "Bergerac", "Sarlat", "Nontron", "Ribérac", "Terrasson"],
    color: "bg-[#567280]",
  },
];

const processSteps = [
  {
    num: "01",
    icon: Phone,
    title: "Premier contact",
    desc: "Appelez-nous ou envoyez-nous un message. Nous répondons sous quelques heures.",
  },
  {
    num: "02",
    icon: MapPin,
    title: "Visite & diagnostic",
    desc: "Déplacement gratuit sur site pour évaluer les travaux et établir un devis précis.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Devis détaillé",
    desc: "Vous recevez un devis clair et détaillé sous 48h, sans engagement.",
  },
  {
    num: "04",
    icon: Hammer,
    title: "Intervention",
    desc: "Nos équipes qualifiées interviennent aux dates convenues avec matériaux premium.",
  },
];

export default function InterventionPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-[76px]">
        <div className="absolute inset-0">
          <Image
            src="/svg/intervention.svg"
            alt="Intervention Étanchéité du Limousin"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2a38]/94 via-[#2d3e50]/85 to-[#1a2a38]/60" />
        </div>

        <div className="container-main relative z-10 py-20">
          <motion.div
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div
              variants={fade}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 mb-6"
            >
              <Wrench size={14} className="text-[#b5a47a]" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">
                Nos interventions
              </span>
            </motion.div>

            <motion.h1
              variants={fade}
              custom={1}
              className="text-4xl md:text-5xl font-black text-white leading-[1.08] mb-6 tracking-tight"
            >
              Interventions partout en{" "}
              <span className="text-[#b5a47a]">Limousin</span>
            </motion.h1>

            <motion.p
              variants={fade}
              custom={2}
              className="text-lg text-white/75 mb-8 leading-relaxed"
            >
              Étanchéité, bardage, toiture végétalisée — nous intervenons sur tous types
              de chantiers dans les départements 87, 19, 23 et 24. Diagnostic gratuit,
              devis sous 48h, garantie décennale.
            </motion.p>

            <motion.div variants={fade} custom={3} className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#b5a47a] text-white font-bold rounded-full shadow-lg shadow-[#b5a47a]/30 hover:bg-[#a0916a] transition-all duration-300 hover:-translate-y-0.5"
              >
                Demander une intervention <ArrowRight size={16} />
              </Link>
              <a
                href="tel:0555397299"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/8 border border-white/15 text-white font-semibold rounded-full hover:bg-white/16 transition-all duration-300"
              >
                <Phone size={16} /> 05 55 39 72 99
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f0e8] to-transparent" />
      </section>


      {/* ═══════════════════════════════════════════════════
          URGENCE BAND
      ═══════════════════════════════════════════════════ */}
      <div className="bg-[#2d3e50] py-4 border-y border-[#b5a47a]/25">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2.5">
              <AlertTriangle size={18} className="text-[#b5a47a]" />
              <span className="text-sm font-semibold text-white/90">Fuite ou sinistre urgent ?</span>
            </div>
            <span className="hidden sm:block w-px h-5 bg-white/20" />
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-[#d4c9a8]" />
              <span className="text-sm text-white/70">Intervention sous 24–48h</span>
            </div>
            <span className="hidden sm:block w-px h-5 bg-white/20" />
            <a href="tel:0555397299" className="inline-flex items-center gap-2 px-5 py-2 bg-[#b5a47a] text-white font-bold rounded-full text-sm hover:bg-[#a0916a] transition-colors">
              <Phone size={14} /> 05 55 39 72 99
            </a>
          </div>
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════
          TYPES D'INTERVENTIONS
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f5f0e8] overflow-hidden">
        <div className="container-main">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fade} custom={0} className="badge-sand inline-flex mb-4">
              Ce que nous faisons
            </motion.span>
            <motion.h2
              variants={fade}
              custom={1}
              className="text-3xl md:text-4xl font-black text-[#2d3e50] mt-2 mb-4"
            >
              Types d&apos;interventions
            </motion.h2>
            <div className="w-16 h-1 bg-[#b5a47a] rounded mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-slate-500 max-w-xl mx-auto">
              De la maintenance préventive à l&apos;urgence, nous couvrons l&apos;ensemble
              des besoins en étanchéité et façade.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interventionTypes.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={scaleIn}
                custom={i}
              >
                <Link href={item.href} className="block group h-full">
                  <div className="bg-white rounded-2xl border border-[#e4ddd1] p-7 h-full hover:shadow-xl hover:shadow-[#2d3e50]/08 hover:border-[#b5a47a]/40 transition-all duration-500 hover:-translate-y-1">
                    <div className="w-13 h-13 rounded-xl bg-[#f5f0e8] flex items-center justify-center mb-5 group-hover:bg-[#2d3e50] transition-colors duration-300">
                      <item.icon size={24} className="text-[#b5a47a] group-hover:text-[#d4c9a8] transition-colors" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-lg font-bold text-[#2d3e50] mb-2 group-hover:text-[#b5a47a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{item.desc}</p>
                    <ul className="space-y-2 mb-5">
                      {item.details.map((d, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-sm text-slate-600">
                          <CheckCircle size={14} className="text-[#b5a47a] shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b5a47a] group-hover:gap-3 transition-all duration-300">
                      En savoir plus <ChevronRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          PROCESSUS D'INTERVENTION
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-main">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fade} custom={0} className="badge-sand inline-flex mb-4">
              Comment ça se passe
            </motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-4xl font-black text-[#2d3e50] mt-2 mb-4">
              Notre processus d&apos;intervention
            </motion.h2>
            <div className="w-16 h-1 bg-[#b5a47a] rounded mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-slate-500 max-w-xl mx-auto">
              Un suivi transparent de la première prise de contact jusqu&apos;à la réception des travaux.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                custom={i}
              >
                <div className="relative text-center">
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-11 left-[calc(50%+36px)] right-[-50%] border-t-2 border-dashed border-[#d4c9a8]" />
                  )}
                  <div className="text-5xl font-black text-[#e8e2d8] mb-2 leading-none">{step.num}</div>
                  <div className="w-14 h-14 rounded-2xl bg-[#f5f0e8] flex items-center justify-center mx-auto mb-4">
                    <step.icon size={24} className="text-[#b5a47a]" />
                  </div>
                  <h3 className="text-base font-bold text-[#2d3e50] mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            custom={0}
            className="text-center mt-14"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2d3e50] text-white font-bold rounded-full shadow-lg shadow-[#2d3e50]/20 hover:bg-[#3d5166] transition-all duration-300 hover:-translate-y-0.5"
            >
              Demander un devis gratuit <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ZONE D'INTERVENTION — Départements
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f5f0e8] overflow-hidden">
        <div className="container-main">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fade} custom={0} className="badge-sand inline-flex mb-4">
              Zone géographique
            </motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-4xl font-black text-[#2d3e50] mt-2 mb-4">
              Nos zones d&apos;intervention
            </motion.h2>
            <div className="w-16 h-1 bg-[#b5a47a] rounded mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-slate-500 max-w-xl mx-auto">
              Basés à Limoges, nous couvrons un rayon de 100 km. Nos équipes interviennent
              dans 4 départements de la région Nouvelle-Aquitaine / Creuse.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.code}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={scaleIn}
                custom={i}
              >
                <div className="bg-white rounded-2xl border border-[#e4ddd1] overflow-hidden hover:shadow-lg hover:shadow-[#2d3e50]/06 hover:border-[#b5a47a]/30 transition-all duration-400">
                  <div className={`${dept.color} px-6 py-4 flex items-center gap-4`}>
                    <span className="text-3xl font-black text-white/20 leading-none">{dept.code}</span>
                    <div>
                      <p className="text-xs font-bold text-[#b5a47a] uppercase tracking-wider">Département</p>
                      <p className="text-lg font-black text-white">{dept.name}</p>
                    </div>
                    <MapPin size={20} className="text-[#b5a47a]/60 ml-auto" />
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Principales villes</p>
                    <div className="flex flex-wrap gap-2">
                      {dept.cities.map((city) => (
                        <span key={city} className="text-xs font-medium text-slate-600 bg-[#f5f0e8] px-3 py-1.5 rounded-full border border-[#e4ddd1]">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map placeholder with icon -->*/}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            custom={0}
            className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden border border-[#e4ddd1] shadow-xl"
          >
            <Image
              src="/svg/about-building.svg"
              alt="Zone intervention Limousin"
              width={800}
              height={400}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a38]/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg flex items-center gap-4">
                <MapPin size={22} className="text-[#b5a47a] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-800">6 allée des Gravelles — 87000 Limoges</p>
                  <p className="text-xs text-slate-400">Rayon d&apos;intervention : 100 km autour de Limoges</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          RAPPORT D'INTERVENTION — Mise en valeur
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-main">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-16"
          >
            <motion.span variants={fade} custom={0} className="badge-sand inline-flex mb-4">
              <FileText size={13} className="mr-1.5" /> Documentation
            </motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-4xl font-black text-[#2d3e50] mt-2 mb-4">
              Notre rapport d&apos;intervention
            </motion.h2>
            <div className="w-16 h-1 bg-[#b5a47a] rounded mx-auto mb-5" />
            <motion.p variants={fade} custom={2} className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
              À chaque intervention, nous remettons un rapport complet et détaillé.
              Photos, constats, travaux réalisés — tout est documenté pour votre tranquillité
              et votre suivi technique.
            </motion.p>
          </motion.div>

          {/* Stacked document presentation */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-6xl mx-auto"
          >
            {/* First row — 2 pages featured large */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {[
                { src: "/images/documents/rapport-page-1.png", label: "Page de garde & identification", page: "1", desc: "Identification du chantier, client, localisation et objet de l'intervention." },
                { src: "/images/documents/rapport-page-2.png", label: "Constats & diagnostics", page: "2", desc: "Description détaillée de l'état existant avec photos et observations terrain." },
              ].map((doc, i) => (
                <motion.div key={i} variants={scaleIn} custom={i} className="group">
                  <div className="bg-[#f5f0e8] rounded-3xl p-5 md:p-6 border border-[#e4ddd1] group-hover:border-[#b5a47a]/40 group-hover:shadow-2xl group-hover:shadow-[#2d3e50]/10 transition-all duration-500">
                    {/* Page number */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#2d3e50] text-white text-sm font-black flex items-center justify-center">
                        {doc.page}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2d3e50]">{doc.label}</p>
                        <p className="text-xs text-slate-400">{doc.desc}</p>
                      </div>
                    </div>
                    {/* Document image */}
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e4ddd1] group-hover:-translate-y-1 transition-transform duration-500">
                      <div className="relative aspect-[1056/1498]">
                        <Image
                          src={doc.src}
                          alt={doc.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second row — 2 remaining pages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { src: "/images/documents/rapport-page-3.png", label: "Travaux réalisés", page: "3", desc: "Descriptif complet des travaux effectués, matériaux utilisés et méthodologie." },
                { src: "/images/documents/rapport-page-4.png", label: "Conclusions & préconisations", page: "4", desc: "Bilan final, recommandations et prochaines étapes pour le client." },
              ].map((doc, i) => (
                <motion.div key={i} variants={scaleIn} custom={i + 2} className="group">
                  <div className="bg-[#f5f0e8] rounded-3xl p-5 md:p-6 border border-[#e4ddd1] group-hover:border-[#b5a47a]/40 group-hover:shadow-2xl group-hover:shadow-[#2d3e50]/10 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#2d3e50] text-white text-sm font-black flex items-center justify-center">
                        {doc.page}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2d3e50]">{doc.label}</p>
                        <p className="text-xs text-slate-400">{doc.desc}</p>
                      </div>
                    </div>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e4ddd1] group-hover:-translate-y-1 transition-transform duration-500">
                      <div className="relative aspect-[1052/1494]">
                        <Image
                          src={doc.src}
                          alt={doc.label}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Highlight banner */}
            <motion.div
              variants={fade}
              custom={4}
              className="bg-[#2d3e50] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 border border-[#b5a47a]/20"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#b5a47a]/15 flex items-center justify-center shrink-0">
                <FileText size={24} className="text-[#b5a47a]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-white mb-1">Un rapport complet à chaque intervention</h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  Photos avant/après, constats détaillés, travaux réalisés et recommandations.
                  Ce document vous permet de suivre l&apos;historique complet de votre toiture et facilite
                  les échanges avec votre assurance si nécessaire.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#b5a47a] text-white font-bold rounded-full text-sm hover:bg-[#a0916a] transition-all shrink-0 shadow-md shadow-[#b5a47a]/25"
              >
                Nous contacter <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ENGAGEMENT / GARANTIES
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#1a2a38] overflow-hidden">
        <div className="container-main">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-14"
          >
            <motion.span variants={fade} custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b5a47a]/15 border border-[#b5a47a]/30 text-[#d4c9a8] text-xs font-bold uppercase tracking-widest mb-4"
            >
              Nos garanties
            </motion.span>
            <motion.h2 variants={fade} custom={1} className="text-3xl md:text-4xl font-black text-white mt-2 mb-4">
              Nos engagements qualité
            </motion.h2>
            <div className="w-16 h-1 bg-[#b5a47a] rounded mx-auto mb-5" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: "Garantie décennale", desc: "Tous nos travaux sont couverts par une garantie décennale, vous protégeant pendant 10 ans." },
              { icon: Clock, title: "Réactivité", desc: "Devis sous 48h, intervention planifiée rapidement. Pour les urgences, nous nous déplaçons sous 24h." },
              { icon: Building2, title: "Matériaux premium", desc: "Exclusivement des grandes marques : Siplast, Resiplast, BASF, Monopanel, Bacacier, Bluetek." },
              { icon: Users, title: "Équipe qualifiée", desc: "Artisans formés et expérimentés, régulièrement mis à jour sur les nouvelles techniques du métier." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={scaleIn}
                custom={i}
              >
                <div className="bg-[#2d3e50] rounded-2xl border border-[#b5a47a]/15 p-7 h-full hover:border-[#b5a47a]/35 transition-all duration-400">
                  <div className="w-12 h-12 rounded-xl bg-[#b5a47a]/12 flex items-center justify-center mb-5">
                    <item.icon size={22} className="text-[#b5a47a]" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          CTA FINAL
      ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#3d5166]" />

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <Wrench size={42} className="text-[#b5a47a]/60 mx-auto mb-5" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Besoin d&apos;une intervention ?
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-10 text-base leading-relaxed">
                Fuite, rénovation ou nouveau projet — contactez-nous pour un diagnostic gratuit.
                Notre équipe se déplace sur l&apos;ensemble du Limousin.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#b5a47a] text-white font-bold rounded-full shadow-xl shadow-[#b5a47a]/25 hover:bg-[#a0916a] hover:shadow-[#b5a47a]/40 transition-all duration-300 hover:-translate-y-0.5 text-base"
                >
                  Demander un devis <ArrowRight size={16} />
                </Link>
                <a
                  href="tel:0555397299"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/8 backdrop-blur-md border border-white/15 text-white font-semibold rounded-full hover:bg-white/16 transition-all duration-300 text-base"
                >
                  <Phone size={16} /> 05 55 39 72 99
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
