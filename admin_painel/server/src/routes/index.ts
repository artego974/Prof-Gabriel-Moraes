import { Router } from "express";
import userRoutes from "./userRoutes";
import studentRoutes from "./studentRoutes";

const routes = Router();

routes.use(userRoutes);
routes.use(studentRoutes);

export default routes;
