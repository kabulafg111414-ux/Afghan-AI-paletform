PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS support_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id TEXT NOT NULL UNIQUE,
  status_token_hash TEXT NOT NULL,
  payload_ciphertext TEXT NOT NULL,
  payload_iv TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received'
    CHECK (status IN ('received','under_review','approved','referred','fulfilled','closed','rejected')),
  created_at TEXT NOT NULL,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_support_requests_created
  ON support_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_requests_status
  ON support_requests(status, created_at DESC);

-- No names, exact addresses, identity numbers, medical records, or child identifiers.
-- Request payload is AES-GCM encrypted by the Worker before it reaches this table.
-- Status token is stored only as a SHA-256 hash.
