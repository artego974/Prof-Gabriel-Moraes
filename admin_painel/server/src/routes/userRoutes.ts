import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../validators/schemas";

const routes = Router()
const controller = new UserController

routes.post("/login", validate(loginSchema), controller.login.bind(controller))

export default routes