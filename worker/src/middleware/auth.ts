import { verifyToken } from "../lib/jwt";

export async function authMiddleware(
  c,
  next
) {
  const header =
    c.req.header("Authorization");

  if (!header) {
    return c.json(
      { success: false, message: "No token" },
      401
    );
  }

  const token = header.replace(
    "Bearer ",
    ""
  );

  try {
    const payload = await verifyToken(
      c.env,
      token
    );

    c.set("user", payload);

    await next();
  } catch {
    return c.json(
      { success: false, message: "Invalid token" },
      401
    );
  }
}
