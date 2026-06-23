import FilmCard from "@/components/FilmCard";
import { MOCK_FILMS, ALL_GENRES } from "@/data/mockData";
import { Search, SlidersHorizontal } from "lucide-react";

export default function FilmsPage({
  searchParams,
}: {
  searchParams: { genre?: string; sort?: string; q?: string };
}) {
  const { genre, sort, q } = searchParams;

  let films = [...MOCK_FILMS];

  if (genre) films = films.filter((f) => f.genres.includes(genre));
  if (q) films = films.filter((f) => f.title.toLowerCase().includes(q.toLowerCase()));
  if (sort === "score") films = films.sort((a, b) => b.avgScore - a.avgScore);
  else if (sort === "year") films = films.sort((a, b) => b.year - a.year);
  else if (sort === "trending") films = films.sort((a, b) => b.ratingsCount - a.ratingsCount);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ── En-tête ────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold mb-1">Films</h1>
        <p className="text-cl-slate text-sm">{films.length} films dans le catalogue</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ── Filtres sidebar ─────────────── */}
        <aside className="md:w-52 shrink-0">
          <div className="sticky top-20 space-y-6">
            {/* Recherche */}
            <div>
              <label className="text-xs text-cl-slate/70 uppercase tracking-wider mb-2 block">
                Recherche
              </label>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-cl-slate/50" />
                <input
                  type="search"
                  placeholder="Titre…"
                  defaultValue={q}
                  className="cl-input pl-8 text-xs"
                />
              </div>
            </div>

            {/* Tri */}
            <div>
              <label className="text-xs text-cl-slate/70 uppercase tracking-wider mb-2 block flex items-center gap-1">
                <SlidersHorizontal size={11} /> Trier par
              </label>
              <div className="space-y-1">
                {[
                  { value: "", label: "Popularité" },
                  { value: "score", label: "Note moyenne" },
                  { value: "year", label: "Année" },
                  { value: "trending", label: "Tendances" },
                ].map((opt) => (
                  <a
                    key={opt.value}
                    href={`/films${opt.value ? `?sort=${opt.value}` : ""}`}
                    className={`block text-sm px-2 py-1 rounded transition-colors ${
                      sort === opt.value || (!sort && !opt.value)
                        ? "text-cl-green bg-cl-surface"
                        : "text-cl-slate hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div>
              <label className="text-xs text-cl-slate/70 uppercase tracking-wider mb-2 block">
                Genre
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_GENRES.map((g) => (
                  <a
                    key={g}
                    href={`/films?genre=${encodeURIComponent(g)}`}
                    className={`text-xs px-2 py-0.5 rounded border transition-colors ${
                      genre === g
                        ? "border-cl-green text-cl-green"
                        : "border-cl-border text-cl-slate hover:border-cl-slate hover:text-white"
                    }`}
                  >
                    {g}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Grille films ─────────────────── */}
        <div className="flex-1">
          {films.length === 0 ? (
            <p className="text-cl-slate text-center py-16">Aucun film trouvé.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {films.map((film) => (
                <FilmCard key={film.id} film={film} size="md" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
