import { Hono } from "hono";
import type { Env } from "./types/env";
import health from "./routes/health";
import auth from "./routes/auth";
import me from "./routes/me";
import ride from "./routes/ride";

const app = new Hono<{ Bindings: Env }>();

app.route("/health", health);
app.route("/auth", auth);
app.route("/me", me);
app.route("/ride", ride);

app.get("/", (c) => {
  return c.text("LocalRide API");
});

export default app;
