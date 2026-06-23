import Link from "next/link";
import { Film } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Film size={28} className="text-cl-green" />
            <span className="text-white font-bold text-2xl">
              Cine<span className="text-cl-green">Log</span>
            </span>
          </Link>
          <p className="text-cl-slate text-sm mt-2">
            Rejoignez des milliers de cinéphiles
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-cl-surface border border-cl-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-xs text-cl-slate mb-1.5">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              className="cl-input"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs text-cl-slate mb-1.5">Pseudo</label>
            <input
              type="text"
              placeholder="cinephile_dupont"
              className="cl-input"
              autoComplete="username"
            />
            <p className="text-xs text-cl-slate/40 mt-1">
              Affiché publiquement sur vos critiques
            </p>
          </div>
          <div>
            <label className="block text-xs text-cl-slate mb-1.5">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="cl-input"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-xs text-cl-slate mb-1.5">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="cl-input"
              autoComplete="new-password"
            />
          </div>

          <button className="cl-btn w-full py-2.5 text-sm mt-2">
            Créer mon compte
          </button>

          <p className="text-xs text-cl-slate/50 text-center leading-relaxed">
            En créant un compte, vous acceptez nos{" "}
            <a href="#" className="text-cl-green hover:underline">
              Conditions d&apos;utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="text-cl-green hover:underline">
              Politique de confidentialité
            </a>
            .
          </p>
        </div>

        <p className="text-center text-cl-slate text-sm mt-4">
          Déjà membre ?{" "}
          <Link href="/auth/login" className="text-cl-green hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
