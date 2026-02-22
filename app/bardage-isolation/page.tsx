import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Bardage et Isolation à Limoges | Étanchéité du Limousin",
  description:
    "Bardage et isolation de façade à Limoges et Guéret. Produits Monopanel, Bacacier, Rockwool, Knauf Therm. Depuis 1998. Départements 87, 19, 23 et 24.",
};

export default function BardageIsolation() {
  return (
    <ServicePage
      title="Bardage à Limoges, une équipe spécialisée à votre service"
      subtitle="Située à Limoges, dans le secteur de Guéret, l'entreprise Étanchéité du Limousin assure la réalisation de bardage. Elle prend également en charge tout chantier d'isolation de façade."
      heroImage="/svg/bardage.svg"
      iconName="Shield"
      sections={[
        {
          title: "Bardage à Limoges, un grand choix de revêtements extérieurs pour vos façades",
          content: [
            "Installée à Limoges, près de Guéret, la société Étanchéité du Limousin est spécialisée en travaux de bardage. Créée en 1998, elle effectue aussi des travaux d'isolation de façade dans les départements 87, 19, 23 et 24.",
            "Nous sommes en mesure de réaliser tout type de bardages. Nous utilisons notamment les produits Monopanel, une marque réputée proposant une large gamme de produits isolants, afin de réaliser des façades métal de qualité dans un grand choix de coloris. Nous travaillons aussi avec Bacacier, un fabricant qui offre un choix important de matériaux dans de nombreuses teintes.",
            "Rigoureux, nous procédons à la pose de ces vêtures extérieures avec professionnalisme sur vos façades, que vous résidiez à Limoges, Guéret ou dans les départements avoisinants.",
          ],
          image: "/svg/bardage.svg",
          imageAlt: "Travaux de bardage sur façade",
        },
        {
          title: "Faites réaliser une isolation de façade à Guéret ou dans les départements limitrophes",
          content: [
            "En matière d'isolation de façade et de toit, nous avons recours aux produits des gammes Rockwool ou Knauf Therm. Leurs panneaux isolants nous permettent de réaliser des vêtures extérieures de qualité, parfaitement isolantes. Vous bénéficiez ainsi d'un confort thermique optimal sans devoir empiéter sur les surfaces intérieures de votre bâtiment ou de votre habitation.",
            "Bien entendu, lors de l'étude de votre projet, nous vous conseillerons la solution nous semblant la mieux adaptée à la configuration de la façade ou du toit à isoler.",
          ],
          image: "/svg/about-building.svg",
          imageAlt: "Isolation de façade",
        },
      ]}
      relatedServices={[
        { name: "Étanchéité du Limousin", href: "/" },
        { name: "Étanchéité liquide", href: "/etancheite-liquide" },
        { name: "Étanchéité bitume", href: "/etancheite-bitume" },
        { name: "Toiture végétalisée", href: "/toiture-vegetalisee" },
      ]}
    />
  );
}
