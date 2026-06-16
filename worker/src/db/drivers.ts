import type { Env } from "../types/env";

export async function createDriver(
  env: Env,
  driver: {
    id: string;
    name: string;
    phone: string;
    vehicleType: string;
    vehicleNumber: string;
    licenseNumber: string;
    passwordHash: string;
  }
) {
  return env.localride_db
    .prepare(
      `
      INSERT INTO drivers (
        id,
        name,
        phone,
        vehicle_type,
        vehicle_number,
        license_number,
        password_hash,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    )
    .bind(
      driver.id,
      driver.name,
      driver.phone,
      driver.vehicleType,
      driver.vehicleNumber,
      driver.licenseNumber,
      driver.passwordHash,
      new Date().toISOString()
    )
    .run();
}
export async function findDriverByPhone(
  env: Env,
  phone: string
) {
  return env.localride_db
    .prepare(
      `
      SELECT *
      FROM drivers
      WHERE phone = ?
    `
    )
    .bind(phone)
    .first();
}
