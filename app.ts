import express from "express";
import config from "config";
import connect from "./utils/db";
import logger from "./utils/logger";

const port = config.get<number>("port");

const app = express();

app.listen(port, async () => {
  logger.info(`App running at localhost:${port}`);
  await connect();
});
