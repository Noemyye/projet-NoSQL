import Image from "next/image";
import { notFound } from "next/navigation";
import StarRating from "@/components/StarRating";
import FilmCard from "@/components/FilmCard";
import ReviewCard from "@/components/ReviewCard";
import { MOCK_USERS, MOCK_REVIEWS, MOCK_FILMS } from "@/data/mockData";
import { Users, Star, BookOpen, Eye } from "lucide-react";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = MOCK_USERS.find((u) => u.pseudo === params.username);
  if (!user) notFound();

  const reviews = MOCK_REVIEWS.filter((r) => r.user.id === user.id);
  const recentFilms = MOCK_FILMS.slice(0, 8);

  const stats = [
    { icon: Eye,      label: "Films vus",   value: user.filmsWatched.toLocaleString("fr-FR") },
    { icon: Star,     label: "Critiques",   value: user.reviewsCount.toLocaleString("fr-FR") },
    { icon: Users,    label: "Abonnés",     value: user.followersCount.toLocaleString("fr-FR") },
    { icon: BookOpen, label: "Abonnements", value: user.followingCount.toLocaleString("fr-FR") },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* ── En-tête profil ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-10">
        <Image
          src={user.avatar}
          alt={user.pseudo}
          width={80}
          height={80}
          className="rounded-full border-2 border-cl-green"
          unoptimized
        />
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold">{user.pseudo}</h1>
          {user.bio && (
            <p className="text-cl-slate text-sm mt-1 max-w-lg">{user.bio}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button className="cl-btn text-sm">Suivre</button>
          <button className="cl-btn-ghost text-sm">Message</button>
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-cl-surface border border-cl-border rounded-lg p-4 text-center"
          >
            <Icon size={18} className="text-cl-green mx-auto mb-1" />
            <p className="text-white text-xl font-bold">{value}</p>
            <p className="text-cl-slate/60 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Films récents ──────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-white text-lg font-semibold mb-4">
          Films récemment notés
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentFilms.map((film) => (
            <div key={film.id} className="shrink-0">
              <FilmCard film={film} size="sm" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Films favoris ──────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-white text-lg font-semibold mb-4">
          Films favoris
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {MOCK_FILMS.slice(0, 4).map((film) => (
            <div key={film.id} className="relative">
              <FilmCard film={film} size="sm" />
              <div className="absolute top-1 left-1 bg-cl-green text-white text-xs rounded px-1">
                ♥
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Critiques récentes ─────────────────────── */}
      <section className="mb-12">
        <h2 className="text-white text-lg font-semibold mb-4">
          Critiques récentes
        </h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} showFilm />
            ))}
          </div>
        ) : (
          <p className="text-cl-slate text-sm">Aucune critique pour l&apos;instant.</p>
        )}
      </section>

      {/* ── Activité récente : watchlist ───────────── */}
      <section>
        <h2 className="text-white text-lg font-semibold mb-4">À voir</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {MOCK_FILMS.slice(2, 7).map((film) => (
            <div key={film.id} className="shrink-0">
              <FilmCard film={film} size="sm" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
