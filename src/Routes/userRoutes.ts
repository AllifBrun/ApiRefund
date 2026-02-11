import { Router } from "express";
import { UserController } from "@/controllers/userController";
import { use } from "react";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/", userController.create);

export { userRoutes };
