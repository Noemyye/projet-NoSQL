import neo4j, { Driver, Session } from "neo4j-driver";

declare global {
  // eslint-disable-next-line no-var
  var _neo4jDriver: Driver | undefined;
}

const driver: Driver =
  globalThis._neo4jDriver ??
  neo4j.driver(
    process.env.NEO4J_URI ?? "bolt://localhost:7687",
    neo4j.auth.basic(
      process.env.NEO4J_USER ?? "neo4j",
      process.env.NEO4J_PASSWORD ?? "cinelog_pass"
    )
  );

if (process.env.NODE_ENV !== "production") globalThis._neo4jDriver = driver;

export default driver;

export function getSession(): Session {
  return driver.session({ database: "neo4j" });
}

// ─── Helpers ─────────────────────────────────────────────────

/** Films recommandés pour un utilisateur via ses follows */
export async function getRecommendations(userId: string, limit = 10) {
  const session = getSession();
  try {
    const result = await session.run(
      `
      MATCH (me:User {id: $userId})-[:FOLLOWS]->(friend:User)-[:RATED]->(film:Film)
      WHERE NOT (me)-[:RATED]->(film)
        AND NOT (me)-[:WATCHLISTED {status: 'watched'}]->(film)
      RETURN film, avg(friend_rating.score) AS friendScore, count(friend) AS friendCount
      ORDER BY friendScore DESC, friendCount DESC
      LIMIT $limit
      `,
      { userId, limit: neo4j.int(limit) }
    );
    return result.records.map((r) => r.get("film").properties);
  } finally {
    await session.close();
  }
}

/** Abonnés d'un utilisateur */
export async function getFollowers(userId: string) {
  const session = getSession();
  try {
    const result = await session.run(
      `MATCH (follower:User)-[:FOLLOWS]->(u:User {id: $userId}) RETURN follower`,
      { userId }
    );
    return result.records.map((r) => r.get("follower").properties);
  } finally {
    await session.close();
  }
}
