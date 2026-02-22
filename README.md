# Étanchéité du Limousin - Site Web Modernisé

## 🚀 Lancement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
app/
  layout.tsx              # Layout principal (meta SEO, header, footer)
  page.tsx                # Page d'accueil
  globals.css             # Styles globaux + design system Tailwind
  etancheite-liquide/     # Page étanchéité liquide
  etancheite-bitume/      # Page étanchéité bitume
  toiture-vegetalisee/    # Page toiture végétalisée
  bardage-isolation/      # Page bardage et isolation
  contact/                # Page contact avec formulaire
  mentions-legales/       # Mentions légales
  politique-confidentialite/

components/
  Header.tsx              # Header sticky avec navigation + bouton Connexion
  Footer.tsx              # Footer avec infos société
  Hero.tsx                # Section hero page d'accueil
  HomeContent.tsx         # Contenu page d'accueil (services, about, refs, partenaires)
  ContactForm.tsx         # Formulaire de contact
  ServicePage.tsx         # Composant réutilisable pour les pages services
  Section.tsx             # Wrapper section réutilisable

public/images/            # Images du site
  logo.png               # Logo entreprise
  partners/              # Logos partenaires
```

## 🔗 Bouton Connexion (ERP Personnel)

Le bouton **Connexion** est dans le Header (`components/Header.tsx`).  
Pour ajouter le lien vers l'ERP, modifier le `href="#"` du bouton Connexion :

```tsx
// Dans components/Header.tsx, remplacer :
<a href="#" ...>Connexion</a>

// Par le lien vers votre ERP :
<a href="https://votre-erp.example.com" target="_blank" rel="noopener noreferrer" ...>Connexion</a>
```

## 📸 Images à remplacer

Les images placeholder (fichiers SVG renommés en .jpg) doivent être remplacées :

| Fichier | Description |
|---------|-------------|
| `public/images/etancheite-liquide-detail.jpg` | Photo détail chantier étanchéité liquide |
| `public/images/lanterneaux.jpg` | Photo installation lanterneaux |
| `public/images/etancheite-bitume-detail.jpg` | Photo détail étanchéité bitume |
| `public/images/membrane-bitume.jpg` | Photo pose membrane bitumineuse |
| `public/images/toiture-veg-detail.jpg` | Photo toiture végétalisée en détail |
| `public/images/bardage-detail.jpg` | Photo bardage façade |
| `public/images/isolation-facade.jpg` | Photo isolation façade |
| `public/images/realisation-1.jpg` à `realisation-4.jpg` | Photos réalisations |
| `public/images/partners/*.png` | Logos partenaires (Siplast, Resiplast, etc.) |

## ✅ Checklist avant livraison client

- [ ] Remplacer toutes les images placeholder
- [ ] Ajouter les vrais logos partenaires
- [ ] Configurer le lien du bouton Connexion (ERP)
- [ ] Connecter le formulaire de contact (API / service email)
- [ ] Vérifier la clé Google Maps embed
- [ ] Compléter les mentions légales (hébergeur)
- [ ] Vérifier tous les textes avec le client
- [ ] Test mobile complet
- [ ] Configurer le domaine et le déploiement

## 🛠 Stack technique

- **Next.js 14** (App Router) + TypeScript
- **TailwindCSS** pour le styling
- **Lucide React** pour les icônes
- **Framer Motion** (disponible pour animations)
