import {
  create,
  getNumericDate,
  verify,
} from "https://deno.land/x/djwt@v2.2/mod.ts";

const secret = "secret";

export function getToken(payload: any) {
  return create({ alg: "HS512", typ: "JWT" }, {
    ...payload,
    exp: getNumericDate(30 * 60),
  }, secret);
}

export function verifyToken(token: string) {
  return verify(token, secret, "HS512");
}
