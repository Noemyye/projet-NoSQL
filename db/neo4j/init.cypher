// ============================================================
// CineLog — Neo4j init
// Graphe social et recommandations
// ============================================================

// ─────────────────────────────────────────
// Contraintes d'unicité (créent aussi un index)
// ─────────────────────────────────────────
CREATE CONSTRAINT user_id_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.id IS UNIQUE;

CREATE CONSTRAINT film_id_unique IF NOT EXISTS
  FOR (f:Film) REQUIRE f.id IS UNIQUE;

// ─────────────────────────────────────────
// Index supplémentaires
// ─────────────────────────────────────────
CREATE INDEX user_pseudo IF NOT EXISTS
  FOR (u:User) ON (u.pseudo);

CREATE INDEX film_title IF NOT EXISTS
  FOR (f:Film) ON (f.title);

CREATE INDEX film_year IF NOT EXISTS
  FOR (f:Film) ON (f.year);

// ─────────────────────────────────────────
// Modèle de graphe attendu (commentaires)
//
// Noeuds :
//   (:User  { id, pseudo, email })
//   (:Film  { id, title, year, genres: [] })
//
// Relations :
//   (:User)-[:FOLLOWS]->(:User)
//   (:User)-[:RATED    { score, date }]->(:Film)
//   (:User)-[:REVIEWED { date }]->(:Film)
//   (:User)-[:WATCHLISTED { status }]->(:Film)
//   (:Film)-[:SAME_GENRE]->(:Film)
// ─────────────────────────────────────────
