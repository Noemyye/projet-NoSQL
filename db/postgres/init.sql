-- ============================================================
-- CineLog — PostgreSQL init
-- Données transactionnelles : users, ratings, reviews, social
-- ============================================================

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────
-- Utilisateurs
-- ─────────────────────────────────────────
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      VARCHAR(255) UNIQUE NOT NULL,
  pseudo     VARCHAR(50)  UNIQUE NOT NULL,
  avatar     VARCHAR(500),
  bio        TEXT,
  role       VARCHAR(20)  NOT NULL DEFAULT 'user'
               CHECK (role IN ('user', 'admin', 'moderator')),
  created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Notations (0.5 → 5 par pas de 0.5)
-- film_id référence un ObjectId MongoDB (stocké en string)
-- ─────────────────────────────────────────
CREATE TABLE ratings (
  id         UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID    NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  film_id    VARCHAR(24) NOT NULL,
  score      NUMERIC(2,1) NOT NULL
               CHECK (score >= 0.5 AND score <= 5.0
                      AND (score * 2) = FLOOR(score * 2)),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, film_id)
);

-- ─────────────────────────────────────────
-- Critiques
-- ─────────────────────────────────────────
CREATE TABLE reviews (
  id         UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID    NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  film_id    VARCHAR(24) NOT NULL,
  content    TEXT    NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- Likes sur les critiques
-- ─────────────────────────────────────────
CREATE TABLE review_likes (
  user_id    UUID NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  review_id  UUID NOT NULL REFERENCES reviews(id)  ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, review_id)
);

-- ─────────────────────────────────────────
-- Watchlist (vu / à voir / revu)
-- ─────────────────────────────────────────
CREATE TABLE watchlist (
  id         UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID    NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  film_id    VARCHAR(24) NOT NULL,
  status     VARCHAR(20) NOT NULL
               CHECK (status IN ('watched', 'to_watch', 'rewatched')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, film_id)
);

-- ─────────────────────────────────────────
-- Abonnements (followers)
-- ─────────────────────────────────────────
CREATE TABLE followers (
  follower_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id <> following_id)
);

-- ─────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────
CREATE INDEX idx_ratings_film_id      ON ratings(film_id);
CREATE INDEX idx_ratings_user_id      ON ratings(user_id);
CREATE INDEX idx_reviews_film_id      ON reviews(film_id);
CREATE INDEX idx_reviews_user_id      ON reviews(user_id);
CREATE INDEX idx_watchlist_user_id    ON watchlist(user_id);
CREATE INDEX idx_watchlist_film_id    ON watchlist(film_id);
CREATE INDEX idx_followers_follower   ON followers(follower_id);
CREATE INDEX idx_followers_following  ON followers(following_id);

-- ─────────────────────────────────────────
-- Trigger updated_at automatique
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_ratings_updated_at
  BEFORE UPDATE ON ratings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
