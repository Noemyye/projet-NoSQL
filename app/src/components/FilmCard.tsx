import Link from "next/link";
import Image from "next/image";
import StarRating from "./StarRating";
import type { Film } from "@/data/mockData";

interface FilmCardProps {
  film: Film;
  showRating?: boolean;
  trending?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function FilmCard({
  film,
  showRating = true,
  trending = false,
  size = "md",
}: FilmCardProps) {
  const widths  = { sm: 120, md: 150, lg: 200 };
  const heights = { sm: 180, md: 225, lg: 300 };
  const w = widths[size];
  const h = heights[size];

  return (
    <Link href={`/films/${film.id}`} className="block group">
      <div className="poster-card" style={{ width: w, height: h }}>
        <Image
          src={film.poster}
          alt={film.title}
          width={w}
          height={h}
          className="object-cover w-full h-full rounded"
          unoptimized
        />
        <div className="poster-overlay">
          {trending && (
            <span className="badge-trending mb-1">Tendance</span>
          )}
          {showRating && (
            <StarRating score={film.avgScore} size="sm" />
          )}
        </div>
      </div>
      <div className="mt-1.5" style={{ width: w }}>
        <p className="text-white text-xs font-medium truncate group-hover:text-cl-green transition-colors">
          {film.title}
        </p>
        <p className="text-cl-slate/60 text-xs">{film.year}</p>
      </div>
    </Link>
  );
}
