import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Toiture Végétalisée à Limoges | Les Cœurs de Madagascar",
  description:
    "Toiture végétalisée à Limoges et Guéret. Réalisation de toits végétaux écologiques et isolants. Expertise depuis 1998. Départements 87, 19, 23 et 24.",
};

export default function ToitureVegetalisee() {
  return (
    <ServicePage
      title="Toiture végétalisée à Limoges, des réalisations de grande qualité"
      subtitle="Installée à Limoges, dans les environs de Guéret, l'entreprise Les Cœurs de Madagascar est experte en toiture végétalisée. Elle réalise tout type de toit végétal avec un grand professionnalisme."
      heroImage="/svg/toiture-veg.svg"
      iconName="Leaf"
      sections={[
        {
          title: "Toiture végétalisée à Limoges, un système éprouvé",
          content: [
            "Située à Limoges, non loin de Guéret, l'entreprise Les Cœurs de Madagascar est en mesure de prendre en charge toute toiture végétalisée. Depuis une vingtaine d'années, elle conduit les travaux de mise en œuvre de toit végétal, notamment pour les toitures-terrasses, dans les départements 87, 19, 23 et 24.",
            "Lors de la réalisation de votre toiture végétalisée, nous commencerons par construire une pente afin de faciliter l'évacuation de l'eau. Nous exécuterons ensuite des travaux pour rendre votre toit étanche avant d'installer le support de culture qui permettra la plantation de la végétation de votre choix.",
            "Nous pouvons également mettre en place, si vous le souhaitez, des rouleaux précultivés similaires à des plaques de gazon. Quelques mois après notre intervention, vous disposerez d'un toit verdoyant tout en étant parfaitement étanche.",
          ],
          image: "/svg/toiture-veg.svg",
          imageAlt: "Toiture végétalisée réalisée par Les Cœurs de Madagascar",
        },
        {
          title: "Optez pour un toit végétal à Guéret et dans la région",
          content: [
            "Très en vogue, les toitures végétales présentent de nombreux avantages. Écologiques, source d'oxygène et de verdure, elles se révèlent naturellement isolantes. C'est pourquoi de plus en plus de particuliers et entreprises de la région de Limoges ou Guéret optent désormais pour un toit végétal.",
            "Pratiques, certains demandent peu d'entretien et sont recouverts de la végétation locale dont les graines sont apportées par le vent.",
          ],
          image: "/svg/about-building.svg",
          imageAlt: "Toit végétal écologique",
        },
      ]}
      relatedServices={[
        { name: "Les Cœurs de Madagascar", href: "/" },
        { name: "Étanchéité liquide", href: "/etancheite-liquide" },
        { name: "Étanchéité bitume", href: "/etancheite-bitume" },
        { name: "Bardage et isolation", href: "/bardage-isolation" },
      ]}
    />
  );
}
