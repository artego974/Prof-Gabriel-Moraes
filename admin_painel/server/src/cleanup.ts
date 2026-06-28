import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { Student } from "./models/Student";
import { Course } from "./models/Course";

AppDataSource.initialize()
    .then(async () => {
        const courseRepo = AppDataSource.getRepository(Course);
        const studentRepo = AppDataSource.getRepository(Student);

        const cursos = await courseRepo.count();
        const alunos = await studentRepo.count();

        // Apaga cursos primeiro (FK), depois alunos. Usuários são preservados.
        await courseRepo.createQueryBuilder().delete().execute();
        await studentRepo.createQueryBuilder().delete().execute();

        console.log(`Limpeza concluída: ${cursos} curso(s) e ${alunos} aluno(s) removidos.`);
        await AppDataSource.destroy();
    })
    .catch(async (err) => {
        console.error("Erro na limpeza:", err);
        process.exit(1);
    });
