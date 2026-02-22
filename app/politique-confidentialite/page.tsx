import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Étanchéité du Limousin",
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="pt-40 pb-24 section-light">
      <div className="container-main max-w-3xl">
        <span className="text-blue-600 font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">Protection des données</span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10">
          Politique de confidentialité
        </h1>

        <div className="space-y-5">
          <div className="card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              Collecte des données personnelles
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Les données personnelles collectées via le formulaire de contact
              (nom, téléphone, email, message) sont utilisées uniquement dans le
              cadre du traitement de votre demande. Elles ne sont en aucun cas
              transmises à des tiers.
            </p>
          </div>

          <div className="card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              Cookies
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Ce site peut utiliser des cookies à des fins statistiques. Vous
              pouvez configurer votre navigateur pour refuser les cookies.
            </p>
          </div>

          <div className="card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              Vos droits
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification et de suppression de vos données personnelles. Pour
              exercer ces droits, contactez-nous à
              contact@etancheitedulimousin.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
