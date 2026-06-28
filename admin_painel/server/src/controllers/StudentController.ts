import { Request, Response } from "express";
import { StudentService } from "../services/StudentService";
import { AppError } from "../errors/AppError";

const service = new StudentService();

function tratarErro(res: Response, e: unknown) {
    if (e instanceof AppError) {
        return res.status(e.statusCode).json({ erro: e.message });
    }
    // Erro não previsto: registra no servidor e devolve 500 genérico (sem vazar detalhes).
    console.error(e);
    return res.status(500).json({ erro: "Erro interno do servidor" });
}

export class StudentController {
    // GET /alunos
    async list(req: Request, res: Response) {
        try {
            const alunos = await service.list();
            return res.status(200).json(alunos);
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // GET /alunos/:id
    async getById(req: Request, res: Response) {
        try {
            const aluno = await service.getById(Number(req.params.id));
            return res.status(200).json(aluno);
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // POST /alunos
    async create(req: Request, res: Response) {
        try {
            const aluno = await service.create(req.body);
            return res.status(201).json(aluno);
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // PUT /alunos/:id
    async update(req: Request, res: Response) {
        try {
            const aluno = await service.update(Number(req.params.id), req.body);
            return res.status(200).json(aluno);
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // DELETE /alunos/:id
    async remove(req: Request, res: Response) {
        try {
            await service.remove(Number(req.params.id));
            return res.status(204).send();
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // POST /alunos/:id/cursos
    async addCourse(req: Request, res: Response) {
        try {
            const aluno = await service.addCourse(Number(req.params.id), req.body);
            return res.status(201).json(aluno);
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // PUT /alunos/:studentId/cursos/:courseId
    async updateCourse(req: Request, res: Response) {
        try {
            const aluno = await service.updateCourse(
                Number(req.params.studentId),
                Number(req.params.courseId),
                req.body,
            );
            return res.status(200).json(aluno);
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // DELETE /alunos/:studentId/cursos/:courseId
    async removeCourse(req: Request, res: Response) {
        try {
            await service.removeCourse(
                Number(req.params.studentId),
                Number(req.params.courseId),
            );
            return res.status(204).send();
        } catch (e) {
            return tratarErro(res, e);
        }
    }

    // GET /stats
    async dashboard(req: Request, res: Response) {
        try {
            const stats = await service.dashboard();
            return res.status(200).json(stats);
        } catch (e) {
            return tratarErro(res, e);
        }
    }
}
