import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.send("IT WORKS!");
  });
}

export default routes;
