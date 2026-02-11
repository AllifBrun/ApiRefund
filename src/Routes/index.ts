import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionsRoutes } from "./sessions-routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

export { routes };
