import { Hono } from "hono";
import { ok, fail } from "../lib/response";
import { v4 as uuid } from "uuid";
import { createRide } from "../db/rides";
import { authMiddleware } from "../middleware/auth";

const ride = new Hono();

ride.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();

  if (!body.pickup || !body.rideType) {
    return c.json(fail("Invalid ride data"), 400);
  }

  const user = c.get("user");

  const rideId = uuid();

  await createRide(c.env, {
    id: rideId,
    customerPhone: user.phone,
    pickup: body.pickup,
    dropLocation: body.dropLocation,
    rideType: body.rideType,
  });

  return c.json(
    ok({
      rideId,
      status: "pending",
    })
  );
});

export default ride;
