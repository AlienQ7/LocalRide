import { Hono } from "hono";
import { ok } from "../lib/response";

const health = new Hono();

health.get("/", (c) => {
  return c.json(
    ok({
      service: "LocalRide API",
      status: "healthy",
    })
  );
});

export default health;
