//~ import { SignJWT, jwtVerify } from "jose";
//~ import { AUTH_CONFIG } from "../config/auth";

//~ export async function signToken(
  //~ env: { JWT_SECRET: string },
  //~ payload: {
    //~ driverId: string;
    //~ phone: string;
  //~ }
//~ ) {
  //~ console.log("ENV OBJECT:", env);
  //~ console.log("JWT_SECRET:", env.JWT_SECRET);
  //~ console.log(
    //~ "JWT_SECRET LENGTH:",
    //~ env.JWT_SECRET?.length
  //~ );

  //~ const secret = new TextEncoder().encode(
    //~ env.JWT_SECRET
  //~ );

  //~ return new SignJWT(payload)
    //~ .setProtectedHeader({ alg: "HS256" })
    //~ .setIssuedAt()
    //~ .setExpirationTime(AUTH_CONFIG.TOKEN_EXPIRY)
    //~ .sign(secret);
//~ }

//~ export async function verifyToken(
  //~ env: { JWT_SECRET: string },
  //~ token: string
//~ ) {
  //~ const secret = new TextEncoder().encode(
    //~ env.JWT_SECRET
  //~ );

  //~ const { payload } = await jwtVerify(
    //~ token,
    //~ secret
  //~ );

  //~ return payload;
//~ }
import { SignJWT, jwtVerify } from "jose";
import { AUTH_CONFIG } from "../config/auth";

export async function signToken(
  env: { JWT_SECRET: string },
  payload: {
    driverId: string;
    phone: string;
  }
) {
  const secret = new TextEncoder().encode(
    env.JWT_SECRET
  );

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(
      AUTH_CONFIG.TOKEN_EXPIRY
    )
    .sign(secret);
}

export async function verifyToken(
  env: { JWT_SECRET: string },
  token: string
) {
  const secret = new TextEncoder().encode(
    env.JWT_SECRET
  );

  const { payload } = await jwtVerify(
    token,
    secret
  );

  return payload;
}
