import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import validateResource from "./middleware/validateResource";
import requireUser from "./middleware/requireUser";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controllers/product.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.send("IT WORKS!");
  });

  // USER ENDPOINTS
  app.post("/api/user", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // PRODUCT ENDPOINTS
  app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler)

  app.patch('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler)

  app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler)

  app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler)

}

export default routes;
