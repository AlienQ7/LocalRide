import { Hono } from "hono";
import { ok, fail } from "../lib/response";
import { signupSchema, loginSchema } from "../schemas/auth";
import { validate } from "../lib/validation";
import { v4 as uuid } from "uuid";

import {
  createDriver,
  findDriverByPhone,
} from "../db/drivers";

import {
  authMiddleware,
} from "../middleware/auth";

import {
  hashPassword,
  verifyPassword,
} from "../lib/password";

import {
  getLoginAttempt,
  increaseAttempts,
  resetAttempts,
} from "../db/security";

import { AUTH_CONFIG } from "../config/auth";

import { signToken } from "../lib/jwt";

const auth = new Hono();

auth.post("/signup", async (c) => {
  const body = await c.req.json();

  const result = validate(signupSchema, body);

  if (!result.success) {
    return c.json(fail("Invalid signup data"), 400);
  }

  const existingDriver =
    await findDriverByPhone(
      c.env,
      result.data.phone
    );

  if (existingDriver) {
    return c.json(
      fail("Phone already registered"),
      409
    );
  }

  const passwordHash =
    await hashPassword(
      result.data.password
    );

  const driverId = uuid();
  
  await createDriver(c.env, {
    id: driverId,
    name: result.data.name,
    phone: result.data.phone,
    vehicleType: result.data.vehicleType,
    vehicleNumber: result.data.vehicleNumber,
    licenseNumber: result.data.licenseNumber,
    passwordHash,
  });

  return c.json(
    ok({
      driverId,
      verified: false,
    })
  );
});

auth.post("/login", async (c) => {
  const body = await c.req.json();

  const result = validate(loginSchema, body);

  if (!result.success) {
    return c.json(fail("Invalid login data"), 400);
  }

  // check lock
  const attempt =
    await getLoginAttempt(
      c.env,
      result.data.phone
    );

  const now = Date.now();

  if (
    attempt?.locked_until &&
    now < attempt.locked_until
  ) {
    return c.json(
      fail("Too many attempts. Try later."),
      429
    );
  }

  // user
  const driver =
    await findDriverByPhone(
      c.env,
      result.data.phone
    );

  if (!driver) {
    return c.json(
      fail("Driver not found"),
      404
    );
  }

  // password
  const valid =
    await verifyPassword(
      result.data.password,
      driver.password_hash
    );

  if (!valid) {
    const newAttempts =
      (attempt?.attempts || 0) + 1;

    const locked =
      newAttempts >=
      AUTH_CONFIG.MAX_LOGIN_ATTEMPTS
        ? Date.now() +
          AUTH_CONFIG.LOCK_TIME_MINUTES *
            60 *
            1000
        : null;

    await increaseAttempts(
      c.env,
      result.data.phone,
      newAttempts,
      locked
    );

    return c.json(
      fail("Wrong password"),
      401
    );
  }

  // reset attempts
  await resetAttempts(
    c.env,
    result.data.phone
  );
  console.log("A"); //
  console.log("JWT_SECRET:", c.env.JWT_SECRET); //tempo
  console.log("b");
  // token
  const token = await signToken(
    c.env,
    {
      driverId: driver.id,
      phone: driver.phone,
    }
  );

  return c.json(
    ok({
      token,
      driverId: driver.id,
    })
  );
});

auth.post("/logout", (c) => {
  return c.json(
    ok({
      action: "logout",
    })
  );
});

auth.get(
  "/me",
  authMiddleware,
  async (c) => {
    return c.json(
      ok({
        user: c.get("user"),
      })
    );
  }
);

export default auth;
