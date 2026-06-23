import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CineLog — Track the films you love",
  description:
    "Notez et critiquez vos films, suivez vos amis, découvrez de nouveaux chefs-d'œuvre.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-cl-border py-8 text-center text-xs text-cl-slate/60 mt-16">
          <p>
            © 2025 CineLog — Projet NoSQL — PostgreSQL · MongoDB · Redis · Neo4j
          </p>
        </footer>
      </body>
    </html>
  );
}
