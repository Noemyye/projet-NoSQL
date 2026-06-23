import Link from "next/link";
import { Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Film size={48} className="text-cl-border mb-4" />
      <h1 className="text-white text-4xl font-bold mb-2">404</h1>
      <p className="text-cl-slate mb-6">Cette page n&apos;existe pas ou a été supprimée.</p>
      <Link href="/" className="cl-btn px-6 py-2">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
