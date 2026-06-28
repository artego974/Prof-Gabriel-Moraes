import bcrypt from "bcryptjs";
import { AppDataSource } from "./data-source";
import { User } from "../models/User";

// Cria um usuário admin padrão caso ainda não exista nenhum usuário.
// Permite logar no painel logo de primeira (usuario: admin / senha: admin123).
export async function seedAdmin() {
    const repo = AppDataSource.getRepository(User);
    const total = await repo.count();
    if (total > 0) return;

    const user = repo.create({
        name: "admin",
        password: await bcrypt.hash("admin123", 10),
    });
    await repo.save(user);
    console.log("Usuário admin criado -> usuario: admin / senha: admin123");
}
