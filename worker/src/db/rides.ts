import type { Env } from "../types/env";

export async function createRide(env: Env, ride: {
  id: string;
  customerPhone: string;
  pickup: string;
  dropLocation?: string;
  rideType: string;
}) {
  return env.localride_db
    .prepare(
      `
      INSERT INTO ride_requests (
        id,
        customer_phone,
        pickup,
        drop_location,
        ride_type,
        status,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    )
    .bind(
      ride.id,
      ride.customerPhone,
      ride.pickup,
      ride.dropLocation || null,
      ride.rideType,
      "pending",
      new Date().toISOString()
    )
    .run();
}
