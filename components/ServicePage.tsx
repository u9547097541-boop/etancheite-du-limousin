"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Droplets, Layers, Leaf, Shield } from "lucide-react";

// eslint-disable-next-line
const iconMap: Record<string, any> = {
  Droplets, Layers, Leaf, Shield,
};

interface Section { title: string; content: string[]; image: string; imageAlt: string; }
interface RelatedService { name: string; href: string; }
interface ServicePageProps {
  title: string; subtitle: string; heroImage: string; iconName: string;
  sections: Section[]; relatedServices: RelatedService[];
}

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function ServicePage({ title, subtitle, heroImage, iconName, sections, relatedServices }: ServicePageProps) {
  const Icon = iconMap[iconName] || Layers;
  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90" />
        </div>

        <div className="container-main relative z-10 pb-16 pt-40">
          <motion.div initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={fade} custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 glass-hero rounded-full mb-5"
            >
              <Icon size={15} className="text-[#b5a47a]" />
              <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">Service</span>
            </motion.div>

            <motion.h1 variants={fade} custom={1}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] mb-5 tracking-tight"
            >
              {title}
            </motion.h1>

            <motion.p variants={fade} custom={2} className="text-base text-white/70 max-w-2xl leading-relaxed mb-8">
              {subtitle}
            </motion.p>

            <motion.div variants={fade} custom={3} className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 btn-primary">
                Devis gratuit <ArrowRight size={15} />
              </Link>
              <a href="tel:0555397299" className="inline-flex items-center gap-2 px-6 py-3 btn-light">
                <Phone size={15} /> 05 55 39 72 99
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══ Content Sections ═══ */}
      {sections.map((section, idx) => (
        <section key={idx} className={`py-20 relative overflow-hidden ${idx % 2 === 0 ? "section-white" : "section-light"}`}>
          <div className="container-main relative">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fade} custom={0} className={idx % 2 !== 0 ? "lg:order-2" : ""}>
                <span className="text-[#b5a47a] font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5 leading-tight">{section.title}</h2>
                <div className="space-y-4">
                  {section.content.map((para, pIdx) => (
                    <p key={pIdx} className="text-slate-500 leading-relaxed">{para}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fade} custom={1} className={idx % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="card p-2 shadow-xl shadow-slate-200/60">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image src={section.image} alt={section.imageAlt} fill className="object-cover" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ═══ Related Services ═══ */}
      <section className="py-20 section-light">
        <div className="container-main">
          <div className="card p-8 md:p-12 shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Nos autres prestations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedServices.map((service) => (
                <Link key={service.href} href={service.href}
                  className="group flex items-center justify-center gap-2 px-4 py-3 card !rounded-lg text-sm text-slate-500 hover:text-[#2d3e50] hover:border-[#b5a47a]/40 transition-all text-center"
                >
                  {service.name}
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#b5a47a]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 section-white">
        <div className="container-main">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a38] via-[#2d3e50] to-[#3d5166]" />
            <div className="relative z-10 p-12 md:p-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Un projet d&apos;étanchéité ?
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
                Contactez-nous pour un devis gratuit. Notre équipe vous accompagne dans tous vos projets.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 btn-white text-lg">
                  Nous contacter <ArrowRight size={18} />
                </Link>
                <a href="tel:0555397299" className="inline-flex items-center gap-2 px-8 py-4 btn-light text-lg">
                  <Phone size={18} /> 05 55 39 72 99
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
