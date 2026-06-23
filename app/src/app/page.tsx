import HeroSection from "@/components/HeroSection";
import FilmCard from "@/components/FilmCard";
import ReviewCard from "@/components/ReviewCard";
import { MOCK_FILMS, MOCK_REVIEWS } from "@/data/mockData";
import Link from "next/link";
import { TrendingUp, Clock } from "lucide-react";

export default function HomePage() {
  const trending = MOCK_FILMS.slice(0, 6);
  const recentReviews = MOCK_REVIEWS;

  return (
    <>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* ── Films tendance ──────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-cl-orange" />
              <h2 className="text-white text-xl font-semibold">
                Tendances cette semaine
              </h2>
            </div>
            <Link href="/films?sort=trending"
              className="text-xs text-cl-green hover:underline">
              Voir tout →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
            {trending.map((film) => (
              <div key={film.id} className="shrink-0">
                <FilmCard film={film} trending size="md" />
              </div>
            ))}
          </div>
        </section>

        {/* ── Critiques récentes ──────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-cl-green" />
              <h2 className="text-white text-xl font-semibold">
                Critiques récentes
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showFilm />
            ))}
          </div>
        </section>

        {/* ── Tous les films ─────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">Catalogue</h2>
            <Link href="/films" className="text-xs text-cl-green hover:underline">
              Explorer tout le catalogue →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MOCK_FILMS.map((film) => (
              <FilmCard key={film.id} film={film} size="md" />
            ))}
          </div>
        </section>

        {/* ── CTA inscription ────────────────────── */}
        <section className="rounded-xl border border-cl-border bg-cl-surface p-8 text-center">
          <h3 className="text-white text-2xl font-bold mb-2">
            Rejoignez la communauté
          </h3>
          <p className="text-cl-slate mb-6">
            Créez votre compte pour noter des films, écrire des critiques et
            suivre vos amis cinéphiles.
          </p>
          <Link href="/auth/register" className="cl-btn px-8 py-3">
            C&apos;est gratuit — commencer maintenant
          </Link>
        </section>
      </div>
    </>
  );
}
