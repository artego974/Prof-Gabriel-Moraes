import { Router } from "express";
import { StudentController } from "../controllers/StudentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
    studentCreateSchema,
    studentUpdateSchema,
    courseCreateSchema,
    courseUpdateSchema,
} from "../validators/schemas";

const routes = Router();
const controller = new StudentController();

// Todas as rotas abaixo exigem token válido
routes.use(authMiddleware);

// Dashboard
routes.get("/stats", controller.dashboard.bind(controller));

// CRUD de alunos
routes.get("/alunos", controller.list.bind(controller));
routes.get("/alunos/:id", controller.getById.bind(controller));
routes.post("/alunos", validate(studentCreateSchema), controller.create.bind(controller));
routes.put("/alunos/:id", validate(studentUpdateSchema), controller.update.bind(controller));
routes.delete("/alunos/:id", controller.remove.bind(controller));

// Cursos do aluno
routes.post("/alunos/:id/cursos", validate(courseCreateSchema), controller.addCourse.bind(controller));
routes.put("/alunos/:studentId/cursos/:courseId", validate(courseUpdateSchema), controller.updateCourse.bind(controller));
routes.delete("/alunos/:studentId/cursos/:courseId", controller.removeCourse.bind(controller));

export default routes;
