import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";


export class UserService {
    private repo = AppDataSource.getRepository(User);

    async login(name: string, password: string) {
        const user = await this.repo.findOneBy({ name });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Senha inválida");
        }

        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        return { token, user: { id: user.id, name: user.name } };
    }
}
