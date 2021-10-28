import { Request, Response } from "express";
import { omit } from 'lodash'
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    res.status(201).send(omit(user.toJSON(), "password"))
  } catch (err: any) {
    logger.error(err);
    return res.status(409).send(err.message);
  }
}
