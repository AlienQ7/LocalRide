CREATE TABLE IF NOT EXISTS ride_requests (
  id TEXT PRIMARY KEY,
  customer_phone TEXT NOT NULL,
  pickup TEXT NOT NULL,
  drop_location TEXT,
  ride_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);
