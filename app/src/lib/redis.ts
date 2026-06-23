import { createClient, RedisClientType } from "redis";

declare global {
  // eslint-disable-next-line no-var
  var _redisClient: RedisClientType | undefined;
}

const client: RedisClientType =
  (globalThis._redisClient as RedisClientType | undefined) ??
  (createClient({ url: process.env.REDIS_URL }) as RedisClientType);

if (!client.isOpen) {
  client.connect().catch(console.error);
}

if (process.env.NODE_ENV !== "production") {
  globalThis._redisClient = client;
}

export default client;

// ─── Helpers ─────────────────────────────────────────────────

/** Score moyen pré-calculé d'un film */
export async function getFilmAvgScore(filmId: string) {
  const val = await client.get(`film:avg:${filmId}`);
  return val ? parseFloat(val) : null;
}

/** Nombre de ratings pour un film */
export async function getFilmRatingCount(filmId: string) {
  const val = await client.get(`film:ratings_count:${filmId}`);
  return val ? parseInt(val, 10) : null;
}

/** Films tendance du jour (sorted set) */
export async function getTrendingToday(limit = 10) {
  return client.zRangeWithScores("trending:day", 0, limit - 1, { REV: true });
}

/** Films tendance de la semaine (sorted set) */
export async function getTrendingWeek(limit = 10) {
  return client.zRangeWithScores("trending:week", 0, limit - 1, { REV: true });
}
