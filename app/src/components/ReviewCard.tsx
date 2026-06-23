import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import type { Review } from "@/data/mockData";
import { Heart } from "lucide-react";

interface ReviewCardProps {
  review: Review;
  showFilm?: boolean;
}

export default function ReviewCard({ review, showFilm = true }: ReviewCardProps) {
  return (
    <div className="border border-cl-border rounded-lg p-4 bg-cl-surface">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Link href={`/profile/${review.user.pseudo}`} className="shrink-0">
          <Image
            src={review.user.avatar}
            alt={review.user.pseudo}
            width={36}
            height={36}
            className="rounded-full"
            unoptimized
          />
        </Link>

        <div className="flex-1 min-w-0">
          {/* En-tête */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
            <Link
              href={`/profile/${review.user.pseudo}`}
              className="text-white text-sm font-semibold hover:text-cl-green transition-colors"
            >
              {review.user.pseudo}
            </Link>
            {showFilm && (
              <>
                <span className="text-cl-slate/40 text-xs">a critiqué</span>
                <Link
                  href={`/films/${review.film.id}`}
                  className="text-cl-green text-sm font-medium hover:underline"
                >
                  {review.film.title}
                </Link>
                <span className="text-cl-slate/40 text-xs">({review.film.year})</span>
              </>
            )}
          </div>

          {/* Note */}
          <div className="mb-2">
            <StarRating score={review.score} size="sm" showScore />
          </div>

          {/* Texte */}
          <p className="text-cl-slate text-sm leading-relaxed line-clamp-4">
            {review.content}
          </p>

          {/* Pied */}
          <div className="mt-3 flex items-center justify-between text-xs text-cl-slate/50">
            <time>{new Date(review.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</time>
            <button className="flex items-center gap-1 hover:text-cl-green transition-colors">
              <Heart size={13} />
              <span>{review.likesCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
