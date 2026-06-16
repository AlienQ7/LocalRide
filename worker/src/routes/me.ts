import { Hono } from "hono";
import { ok } from "../lib/response";

const me = new Hono();

me.get("/", (c) => {
  return c.json(
    ok({
      user: null,
    })
  );
});

export default me;
