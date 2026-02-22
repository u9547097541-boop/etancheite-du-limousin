import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Les Cœurs de Madagascar - Étanchéité, Toiture & Bardage à Limoges",
  description:
    "Les Cœurs de Madagascar, spécialiste en étanchéité bitume, étanchéité liquide, toiture végétalisée et bardage isolation à Limoges, Guéret et départements 87, 19, 23, 24. Depuis 1998.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        {/* Netlify Identity Widget — required for Decap CMS login */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </head>
      <body className="antialiased bg-white">
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Redirect to /admin after Netlify Identity login */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", function(user) {
                  if (!user) {
                    window.netlifyIdentity.on("login", function() {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
