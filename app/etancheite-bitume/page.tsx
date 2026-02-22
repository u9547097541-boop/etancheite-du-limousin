import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Étanchéité Bitume à Limoges | Étanchéité du Limousin",
  description:
    "Étanchéité bitume à Limoges et Guéret. Pose de membranes bitumineuses monocouches ou bicouches Siplast. Vingtaine d'années d'expérience. Départements 87, 19, 23 et 24.",
};

export default function EtancheiteBitume() {
  return (
    <ServicePage
      title="Étanchéité bitume à Limoges, une équipe compétente et impliquée"
      subtitle="Située à Limoges, dans les environs de Guéret, la société Étanchéité du Limousin est spécialisée dans la réalisation d'étanchéité bitume. Elle intervient dans tout le secteur pour procéder à la pose de membranes bitumineuses."
      heroImage="/svg/etancheite-bitume.svg"
      iconName="Layers"
      sections={[
        {
          title: "Étanchéité bitume à Limoges, un système éprouvé pour vos toitures-terrasses",
          content: [
            "Établie à Limoges, à proximité de Guéret, l'entreprise Étanchéité du Limousin prend en charge des chantiers d'étanchéité bitume de manière très professionnelle. Elle affiche en effet une vingtaine d'années d'expérience de ce type de travaux dans les départements 87, 19, 23 et 24.",
            "Pour effectuer l'étanchéité bitume de vos toitures-terrasses de la région de Limoges ou Guéret, nous utilisons des membranes bitumineuses monocouches ou bicouches du fabricant Siplast. Nous disposons ainsi de matériaux résistants, qui ne se dénatureront pas au fil du temps.",
          ],
          image: "/svg/etancheite-bitume.svg",
          imageAlt: "Pose de membranes bitumineuses sur toiture-terrasse",
        },
        {
          title: "Pose de membranes bitumineuses à Guéret et dans un rayon de 100 kilomètres",
          content: [
            "Nous réaliserons avec soin la pose des membranes bitumineuses de votre toit-terrasse. La qualité de la pose est essentielle pour être certain que votre toiture sera parfaitement étanche. Après avoir préparé la surface dans les règles de l'art, nous déroulerons la membrane en prenant soin, en cas de chevauchement, de procéder à un recouvrement d'une dizaine de centimètres.",
            "Selon les cas, nous effectuerons les joints à l'air chaud ou à la flamme pour que votre revêtement soit totalement imperméable. En fonction de vos attentes, cette membrane bitumineuse pourra être recouverte de dalles ou de tout autre matériau.",
          ],
          image: "/svg/chantier.svg",
          imageAlt: "Pose de membrane bitumineuse",
        },
      ]}
      relatedServices={[
        { name: "Étanchéité du Limousin", href: "/" },
        { name: "Étanchéité liquide", href: "/etancheite-liquide" },
        { name: "Toiture végétalisée", href: "/toiture-vegetalisee" },
        { name: "Bardage et isolation", href: "/bardage-isolation" },
      ]}
    />
  );
}
