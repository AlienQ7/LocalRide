CREATE TABLE ride_requests (
  id TEXT PRIMARY KEY,
  passenger_name TEXT NOT NULL,
  passenger_phone TEXT NOT NULL,

  pickup_lat REAL NOT NULL,
  pickup_lng REAL NOT NULL,

  drop_lat REAL NOT NULL,
  drop_lng REAL NOT NULL,

  status TEXT NOT NULL DEFAULT 'pending',

  driver_id TEXT,

  created_at TEXT NOT NULL
);
