import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export class UserController {
    async login(req: Request, res: Response) {
        const { usuario, senha } = req.body;

        if (!usuario || !senha) {
            return res.status(400).json({ erro: "Usuário e senha são obrigatórios" });
        }

        try {
            const result = await service.login(usuario, senha);
            return res.status(200).json(result);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Erro ao realizar login";
            return res.status(401).json({ erro: message });
        }
    }
}
