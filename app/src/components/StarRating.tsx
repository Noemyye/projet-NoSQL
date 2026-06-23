interface StarRatingProps {
  score: number;       // 0.5 – 5.0
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
}

export default function StarRating({
  score,
  size = "md",
  showScore = false,
}: StarRatingProps) {
  const sizeMap = { sm: 12, md: 16, lg: 20 };
  const px = sizeMap[size];

  const stars = Array.from({ length: 5 }, (_, i) => {
    const threshold = i + 1;
    if (score >= threshold) return "full";
    if (score >= threshold - 0.5) return "half";
    return "empty";
  });

  return (
    <span className="inline-flex items-center gap-0.5">
      {stars.map((type, i) => (
        <svg
          key={i}
          width={px}
          height={px}
          viewBox="0 0 24 24"
          className={
            type === "empty"
              ? "text-cl-border"
              : "text-cl-orange"
          }
        >
          {type === "full" && (
            <polygon
              fill="currentColor"
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            />
          )}
          {type === "half" && (
            <>
              <defs>
                <linearGradient id={`half-${i}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                fill={`url(#half-${i})`}
                stroke="currentColor"
                strokeWidth="1.5"
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              />
            </>
          )}
          {type === "empty" && (
            <polygon
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            />
          )}
        </svg>
      ))}
      {showScore && (
        <span className="ml-1 text-cl-orange font-semibold text-sm">
          {score.toFixed(1)}
        </span>
      )}
    </span>
  );
}
