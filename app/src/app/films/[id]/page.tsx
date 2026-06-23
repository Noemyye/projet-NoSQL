import Image from "next/image";
import { notFound } from "next/navigation";
import StarRating from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import FilmCard from "@/components/FilmCard";
import { MOCK_FILMS, MOCK_REVIEWS } from "@/data/mockData";
import { Clock, Globe, Flag, Bookmark, Eye, RotateCcw } from "lucide-react";

export default function FilmDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const film = MOCK_FILMS.find((f) => f.id === params.id);
  if (!film) notFound();

  const reviews = MOCK_REVIEWS.filter((r) => r.film.id === film.id);
  const similar = MOCK_FILMS.filter(
    (f) => f.id !== film.id && f.genres.some((g) => film.genres.includes(g))
  ).slice(0, 6);

  const ratingBars = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((score) => ({
    score,
    pct: Math.random() * 60 + (score >= 4 ? 30 : 0),
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ── Bandeau principal ──────────────────────────── */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Poster */}
        <div className="shrink-0">
          <Image
            src={film.poster}
            alt={film.title}
            width={220}
            height={330}
            className="rounded-lg shadow-2xl"
            unoptimized
          />
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-1">
            {film.title}
          </h1>
          <p className="text-cl-slate text-lg mb-4">{film.year}</p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-5">
            {film.genres.map((g) => (
              <a
                key={g}
                href={`/films?genre=${encodeURIComponent(g)}`}
                className="text-xs px-2.5 py-1 rounded border border-cl-border text-cl-slate hover:border-cl-green hover:text-cl-green transition-colors"
              >
                {g}
              </a>
            ))}
          </div>

          {/* Méta */}
          <div className="flex flex-wrap gap-5 text-sm text-cl-slate mb-6">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {Math.floor(film.duration / 60)}h{" "}
              {film.duration % 60}min
            </span>
            <span className="flex items-center gap-1.5">
              <Globe size={14} /> {film.language}
            </span>
            <span className="flex items-center gap-1.5">
              <Flag size={14} /> {film.country}
            </span>
          </div>

          {/* Note moyenne */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <StarRating score={film.avgScore} size="lg" showScore />
              <p className="text-cl-slate/60 text-xs mt-0.5">
                {film.ratingsCount.toLocaleString("fr-FR")} notes
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="cl-btn flex items-center gap-2">
              <Eye size={15} /> J&apos;ai vu ce film
            </button>
            <button className="cl-btn-ghost flex items-center gap-2">
              <Bookmark size={15} /> À voir
            </button>
            <button className="cl-btn-ghost flex items-center gap-2">
              <RotateCcw size={15} /> Revu
            </button>
          </div>
        </div>

        {/* Distribution des notes */}
        <div className="shrink-0 w-44">
          <p className="text-xs text-cl-slate/60 uppercase tracking-wider mb-3">
            Distribution des notes
          </p>
          <div className="space-y-1">
            {ratingBars.map(({ score, pct }) => (
              <div key={score} className="flex items-center gap-2">
                <span className="text-xs text-cl-slate/50 w-6 text-right">
                  {score}
                </span>
                <div className="flex-1 h-2 bg-cl-surface rounded overflow-hidden">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: "var(--cl-orange)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Synopsis ───────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-white text-lg font-semibold mb-3">Synopsis</h2>
        <p className="text-cl-slate leading-relaxed max-w-3xl">{film.synopsis}</p>
      </section>

      {/* ── Cast & Crew ────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <section>
          <h2 className="text-white text-lg font-semibold mb-4">Distribution</h2>
          <ul className="space-y-2">
            {film.cast.map((c) => (
              <li key={c.name} className="flex justify-between text-sm">
                <span className="text-white">{c.name}</span>
                <span className="text-cl-slate/60">{c.role}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-white text-lg font-semibold mb-4">Équipe technique</h2>
          <ul className="space-y-2">
            {film.crew.map((c) => (
              <li key={c.name} className="flex justify-between text-sm">
                <span className="text-white">{c.name}</span>
                <span className="text-cl-slate/60">{c.position}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ── Critiques ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-white text-lg font-semibold mb-4">
          Critiques ({reviews.length})
        </h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} showFilm={false} />
            ))}
          </div>
        ) : (
          <p className="text-cl-slate text-sm">
            Aucune critique pour ce film.{" "}
            <a href="/auth/register" className="text-cl-green hover:underline">
              Soyez le premier !
            </a>
          </p>
        )}
      </section>

      {/* ── Films similaires ───────────────────────────── */}
      {similar.length > 0 && (
        <section>
          <h2 className="text-white text-lg font-semibold mb-4">Films similaires</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {similar.map((f) => (
              <div key={f.id} className="shrink-0">
                <FilmCard film={f} size="sm" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
