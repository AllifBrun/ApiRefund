import { SessionsController } from "@/controllers.ts/sessions-controller";
import { Router } from "express";

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);

export { sessionsRoutes };
