import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionsRoutes } from "./sessions-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { refundsRoutes } from "./refunds-routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

//Rotas privadas
routes.use(ensureAuthenticated);
routes.use("/refunds", refundsRoutes);

export { routes };
