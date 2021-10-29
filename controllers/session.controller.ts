import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate user password
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send("Invalid email or password");

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create a token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );

  // Create a refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get<string>("refreshTokenTtl"),
    }
  );

  // Return tokens
  return res.send({ accessToken, refreshToken });
}
