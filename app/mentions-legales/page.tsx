import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Les Cœurs de Madagascar",
};

export default function MentionsLegales() {
  return (
    <section className="pt-40 pb-24 section-light">
      <div className="container-main max-w-3xl">
        <span className="text-blue-600 font-semibold text-xs uppercase tracking-[0.2em] mb-3 block">Informations légales</span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10">Mentions légales</h1>

        <div className="space-y-5">
          <div className="card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Éditeur du site</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Les Cœurs de Madagascar<br />
              6 allée des Gravelles<br />
              87000 Limoges<br />
              SIREN : 418415774<br />
              Téléphone : 05 55 39 72 99<br />
              Email : contact@etancheitedulimousin.com
            </p>
          </div>

          <div className="card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Hébergement</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {/* TODO: À compléter avec les informations de l'hébergeur */}
              Informations d&apos;hébergement à compléter.
            </p>
          </div>

          <div className="card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Propriété intellectuelle</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              L&apos;ensemble de ce site relève de la législation française et
              internationale sur le droit d&apos;auteur et la propriété intellectuelle.
              Tous les droits de reproduction sont réservés, y compris les
              représentations iconographiques et photographiques.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
