// ============================================================
// CineLog — MongoDB init
// Catalogue films : schéma, collections, indexes
// ============================================================

// Connexion à la base cinelog
// (MONGO_INITDB_DATABASE force ce contexte au démarrage)
const db = db.getSiblingDB("cinelog");

// ─────────────────────────────────────────
// Collection films avec validation JSON Schema
// ─────────────────────────────────────────
db.createCollection("films", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "year", "synopsis", "genres", "published"],
      properties: {
        title: {
          bsonType: "string",
          description: "Titre du film — obligatoire",
        },
        year: {
          bsonType: "int",
          minimum: 1888,
          description: "Année de sortie",
        },
        synopsis: {
          bsonType: "string",
          description: "Synopsis du film",
        },
        duration: {
          bsonType: "int",
          minimum: 1,
          description: "Durée en minutes",
        },
        genres: {
          bsonType: "array",
          minItems: 1,
          items: { bsonType: "string" },
          description: "Tableau de genres",
        },
        cast: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["name", "role"],
            properties: {
              name: { bsonType: "string" },
              role: { bsonType: "string" },
            },
          },
        },
        crew: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["name", "position"],
            properties: {
              name: { bsonType: "string" },
              position: { bsonType: "string" },
            },
          },
        },
        posters: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Tableau d'URLs de posters",
        },
        country: {
          bsonType: "string",
        },
        language: {
          bsonType: "string",
        },
        published: {
          bsonType: "bool",
          description: "Visible publiquement ou brouillon",
        },
      },
    },
  },
  validationLevel: "moderate",
  validationAction: "error",
});

// ─────────────────────────────────────────
// Indexes films
// ─────────────────────────────────────────
db.films.createIndex({ title: "text", synopsis: "text" }, { name: "films_fulltext" });
db.films.createIndex({ year: 1 },        { name: "films_year" });
db.films.createIndex({ genres: 1 },       { name: "films_genres" });
db.films.createIndex({ published: 1 },    { name: "films_published" });
db.films.createIndex({ "crew.name": 1 },  { name: "films_director" });

// ─────────────────────────────────────────
// Collection admins_log (actions admin)
// ─────────────────────────────────────────
db.createCollection("admin_logs", {
  capped: true,
  size: 10485760, // 10 MB
  max: 5000,
});

db.admin_logs.createIndex({ timestamp: -1 }, { name: "logs_timestamp" });
db.admin_logs.createIndex({ action: 1 },     { name: "logs_action" });

print("MongoDB: base cinelog initialisée — collections films + admin_logs créées.");
