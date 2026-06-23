import Link from "next/link";
import { Film } from "lucide-react";

export default function LoginPage() {
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
            Content de vous revoir !
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-cl-surface border border-cl-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-xs text-cl-slate mb-1.5">
              Email ou pseudo
            </label>
            <input
              type="text"
              placeholder="cinephile@example.com"
              className="cl-input"
              autoComplete="username"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs text-cl-slate">Mot de passe</label>
              <a href="#" className="text-xs text-cl-green hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="cl-input"
              autoComplete="current-password"
            />
          </div>

          <button className="cl-btn w-full py-2.5 text-sm mt-2">
            Se connecter
          </button>
        </div>

        <p className="text-center text-cl-slate text-sm mt-4">
          Pas encore de compte ?{" "}
          <Link href="/auth/register" className="text-cl-green hover:underline">
            S&apos;inscrire gratuitement
          </Link>
        </p>
      </div>
    </div>
  );
}
