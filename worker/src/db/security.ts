import type { Env } from "../types/env";

export async function getLoginAttempt(
  env: Env,
  phone: string
) {
  return env.localride_db
    .prepare(
      `SELECT * FROM login_attempts WHERE phone = ?`
    )
    .bind(phone)
    .first();
}

export async function resetAttempts(
  env: Env,
  phone: string
) {
  return env.localride_db
    .prepare(
      `DELETE FROM login_attempts WHERE phone = ?`
    )
    .bind(phone)
    .run();
}

export async function increaseAttempts(
  env: Env,
  phone: string,
  attempts: number,
  lockedUntil: number | null
) {
  return env.localride_db
    .prepare(
      `
      INSERT INTO login_attempts (phone, attempts, locked_until)
      VALUES (?, ?, ?)
      ON CONFLICT(phone)
      DO UPDATE SET
        attempts = excluded.attempts,
        locked_until = excluded.locked_until
      `
    )
    .bind(phone, attempts, lockedUntil)
    .run();
}
