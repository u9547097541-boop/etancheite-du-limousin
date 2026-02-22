"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", message: "", rgpd: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ═══ Hero ═══ */}
      <section className="relative pt-40 pb-16 overflow-hidden section-blue-soft">
        <div className="container-main relative z-10">
          <motion.div initial="hidden" animate="show">
            <motion.div variants={fade} custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-full mb-5 shadow-sm"
            >
              <Mail size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Contact</span>
            </motion.div>

            <motion.h1 variants={fade} custom={1}
              className="text-3xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight"
            >
              Contactez-nous
            </motion.h1>
            <motion.p variants={fade} custom={2} className="text-base text-slate-500 max-w-2xl leading-relaxed">
              N&apos;hésitez pas à nous contacter pour toute demande de devis ou d&apos;information.
              Nous vous répondrons dans les plus brefs délais.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══ Content ═══ */}
      <section className="pb-24 pt-12 section-white">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="card p-6 shadow-md">
                <h3 className="text-lg font-bold text-slate-800 mb-5">Nos coordonnées</h3>
                <div className="space-y-5">
                  <a href="tel:0555397299" className="flex items-start gap-4 group">
                    <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Phone size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Téléphone</p>
                      <p className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">05 55 39 72 99</p>
                    </div>
                  </a>

                  <a href="mailto:contact@etancheitedulimousin.com" className="flex items-start gap-4 group">
                    <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Mail size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Email</p>
                      <p className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">contact@etancheitedulimousin.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-blue-50 rounded-lg">
                      <MapPin size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Adresse</p>
                      <p className="text-slate-700 font-medium">6 allée des Gravelles<br />87000 Limoges</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="card p-2 shadow-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.1!2d1.27!3d45.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDUwJzAuMCJOIDHCsDE2JzAuMCJF!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                  width="100%" height="250"
                  style={{ border: 0, borderRadius: "0.75rem" }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Les Cœurs de Madagascar"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-8 md:p-10 shadow-md">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <CheckCircle size={56} className="text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Message envoyé !</h3>
                    <p className="text-slate-500">Nous avons bien reçu votre demande et reviendrons vers vous dans les plus brefs délais.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Envoyez-nous un message</h3>
                    <p className="text-sm text-slate-400 mb-4">
                      Remplissez le formulaire ci-dessous pour toute demande de devis ou d&apos;information.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-2 font-medium">Nom *</label>
                        <input type="text" required placeholder="Votre nom" value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-clean w-full px-4 py-3 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-2 font-medium">Téléphone *</label>
                        <input type="tel" required placeholder="Votre téléphone" value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-clean w-full px-4 py-3 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-2 font-medium">Email *</label>
                      <input type="email" required placeholder="votre@email.com" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-clean w-full px-4 py-3 text-sm" />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-500 mb-2 font-medium">Message *</label>
                      <textarea required rows={5} placeholder="Décrivez votre projet..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="input-clean w-full px-4 py-3 resize-none text-sm" />
                    </div>

                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="rgpd" required checked={formData.rgpd}
                        onChange={(e) => setFormData({ ...formData, rgpd: e.target.checked })}
                        className="mt-1 accent-blue-500" />
                      <label htmlFor="rgpd" className="text-xs text-slate-400 leading-relaxed">
                        J&apos;accepte que mes données personnelles soient utilisées pour traiter ma demande conformément à la{" "}
                        <a href="/politique-confidentialite" className="text-blue-500 hover:text-blue-600 underline">
                          politique de confidentialité
                        </a>.
                      </label>
                    </div>

                    <button type="submit"
                      className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-base font-semibold"
                    >
                      <Send size={16} />
                      Envoyer le message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
