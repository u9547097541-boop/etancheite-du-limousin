import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Étanchéité Liquide à Limoges | Les Cœurs de Madagascar",
  description:
    "Spécialistes de l'étanchéité liquide à Limoges et Guéret. Résines de qualité Resiplast et BASF pour toitures-terrasses, balcons et sols techniques. Départements 87, 19, 23 et 24.",
};

export default function EtancheiteLiquide() {
  return (
    <ServicePage
      title="Étanchéité liquide à Limoges, des professionnels à votre service"
      subtitle="Installée à Limoges, près de Guéret, la société Les Cœurs de Madagascar met en œuvre des systèmes d'étanchéité liquide très efficaces."
      heroImage="/svg/etancheite-liquide.svg"
      iconName="Droplets"
      sections={[
        {
          title: "Étanchéité liquide à Limoges, des travaux adaptés à votre demande",
          content: [
            "Basée à Limoges, non loin de Guéret, l'entreprise Les Cœurs de Madagascar est spécialisée dans la réalisation de systèmes d'étanchéité liquide. Forte d'une vingtaine d'années d'expérience, elle est en mesure de vous proposer des solutions à base de résines dans les départements 87, 19, 23 et 24.",
            "Nous assurons l'étanchéité liquide des toitures-terrasses ou balcons du secteur de Limoges, Guéret et des départements alentour, mais aussi des revêtements de sols techniques en résine. Pour toutes ces prestations, nous utilisons des résines de qualité, des marques Resiplast ou BASF, afin de vous garantir un résultat optimal.",
            "Particulièrement appropriée dès lors que la surface n'est pas régulière, la résine peut s'appliquer de différentes manières, y compris au rouleau. Autre avantage, elle ne demande la réalisation d'aucun joint, ce qui permet d'avoir un revêtement parfaitement continu. Si vous le souhaitez, nous saurons vous conseiller la résine la mieux adaptée à la surface concernée.",
          ],
          image: "/svg/etancheite-liquide.svg",
          imageAlt: "Travaux d'étanchéité liquide sur toiture-terrasse",
        },
        {
          title: "Installation de lanterneaux à Guéret et dans les départements limitrophes",
          content: [
            "Nous sommes également en mesure de procéder à toute pose de lanterneaux, qu'ils concernent le désenfumage, l'éclairage ou l'aération. Nous utilisons des produits des marques Bluetek ou Velux afin d'assurer une longévité inégalable à vos nouvelles installations.",
            "Nous opérons avec savoir-faire et rigueur afin qu'en dépit de ces réalisations vos toits plats restent tout à fait étanches.",
          ],
          image: "/svg/chantier.svg",
          imageAlt: "Installation de lanterneaux",
        },
      ]}
      relatedServices={[
        { name: "Les Cœurs de Madagascar", href: "/" },
        { name: "Étanchéité bitume", href: "/etancheite-bitume" },
        { name: "Toiture végétalisée", href: "/toiture-vegetalisee" },
        { name: "Bardage et isolation", href: "/bardage-isolation" },
      ]}
    />
  );
}
