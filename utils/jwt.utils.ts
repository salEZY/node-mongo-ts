import jwt from "jsonwebtoken";
import config from "config";

const publicKey = config.get<string>("public_key");
const secretKey = config.get<string>("secret_key");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, secretKey, {
    ...(options && options),
    // algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, secretKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === "JWT EXPIRED",
      decoded: null,
    };
  }
}
