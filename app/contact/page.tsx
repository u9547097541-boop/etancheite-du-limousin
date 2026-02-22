import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Étanchéité du Limousin - Limoges",
  description:
    "Contactez Étanchéité du Limousin pour un devis gratuit. 6 allée des Gravelles, 87000 Limoges. Tél : 05 55 39 72 99. Email : contact@etancheitedulimousin.com",
};

export default function Contact() {
  return <ContactForm />;
}
