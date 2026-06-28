import { Not } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Student } from "../models/Student";
import { Course } from "../models/Course";
import { AppError } from "../errors/AppError";

interface StudentInput {
    nome?: string;
    cpf?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
}

interface CourseInput {
    nome?: string;
    status?: string;
    tipo?: string;
    professor?: string;
    valor?: number | string;
    data?: string;
}

// Professores válidos do painel.
const PROFESSORES = ["gabriel", "arthur"] as const;

export class StudentService {
    private studentRepo = AppDataSource.getRepository(Student);
    private courseRepo = AppDataSource.getRepository(Course);

    // --- Serialização (entidade em inglês -> contrato do front em português) ---
    private serializeCourse(c: Course) {
        return {
            id: c.id,
            nome: c.name,
            status: c.status,
            tipo: c.tipo,
            professor: c.professor,
            valor: Number(c.value),
            data: c.date,
        };
    }

    private serializeStudent(s: Student) {
        const cursos = s.courses ?? [];
        return {
            id: s.id,
            nome: s.name,
            cpf: s.cpf,
            email: s.email,
            telefone: s.phone,
            endereco: s.address,
            criado_em: s.createdAt,
            total_cursos: cursos.length,
            cursos: cursos.map((c) => this.serializeCourse(c)),
        };
    }

    // Converte string vazia em null (para não quebrar índices únicos com '')
    private limpar(v?: string): string | null {
        const t = (v ?? "").trim();
        return t === "" ? null : t;
    }

    private normalizarStatus(status?: string): string {
        return status === "concluido" ? "concluido" : "comprado";
    }

    private normalizarProfessor(professor?: string): string {
        return PROFESSORES.includes(professor as any) ? (professor as string) : "gabriel";
    }

    private normalizarTipo(tipo?: string): string {
        return tipo === "pacote" ? "pacote" : "aula";
    }

    private normalizarValor(valor?: number | string): number {
        if (valor === "" || valor == null) return 0;
        const n = Number(valor);
        return Number.isFinite(n) ? n : 0;
    }

    // Garante que CPF/e-mail não estejam em uso por outro aluno.
    private async assertUnico(
        campo: "cpf" | "email",
        valor: string | null,
        ignorarId?: number,
    ) {
        if (!valor) return;
        const where: any = { [campo]: valor };
        if (ignorarId) where.id = Not(ignorarId);
        const existe = await this.studentRepo.findOne({ where });
        if (existe) {
            const rotulo = campo === "cpf" ? "CPF" : "e-mail";
            throw new AppError(`Já existe um aluno com este ${rotulo}`, 409);
        }
    }

    // --- CRUD de alunos ---
    async list() {
        const students = await this.studentRepo.find({
            relations: { courses: true },
            order: { createdAt: "DESC" },
        });
        return students.map((s) => this.serializeStudent(s));
    }

    async getById(id: number) {
        const student = await this.studentRepo.findOne({
            where: { id },
            relations: { courses: true },
        });
        if (!student) throw new AppError("Aluno não encontrado", 404);
        return this.serializeStudent(student);
    }

    async create(dados: StudentInput) {
        if (!dados?.nome || !dados.nome.trim()) {
            throw new AppError("O nome é obrigatório", 400);
        }
        const cpf = this.limpar(dados.cpf);
        const email = this.limpar(dados.email);
        await this.assertUnico("cpf", cpf);
        await this.assertUnico("email", email);

        const student = this.studentRepo.create({
            name: dados.nome.trim(),
            cpf,
            email,
            phone: this.limpar(dados.telefone),
            address: this.limpar(dados.endereco),
        });
        const saved = await this.studentRepo.save(student);
        return this.getById(saved.id);
    }

    async update(id: number, dados: StudentInput) {
        const student = await this.studentRepo.findOneBy({ id });
        if (!student) throw new AppError("Aluno não encontrado", 404);

        if (dados.nome !== undefined) {
            if (!dados.nome.trim()) throw new AppError("O nome é obrigatório", 400);
            student.name = dados.nome.trim();
        }
        if (dados.cpf !== undefined) {
            student.cpf = this.limpar(dados.cpf);
            await this.assertUnico("cpf", student.cpf, id);
        }
        if (dados.email !== undefined) {
            student.email = this.limpar(dados.email);
            await this.assertUnico("email", student.email, id);
        }
        if (dados.telefone !== undefined) student.phone = this.limpar(dados.telefone);
        if (dados.endereco !== undefined) student.address = this.limpar(dados.endereco);

        await this.studentRepo.save(student);
        return this.getById(id);
    }

    async remove(id: number) {
        const student = await this.studentRepo.findOneBy({ id });
        if (!student) throw new AppError("Aluno não encontrado", 404);
        await this.studentRepo.remove(student);
    }

    // --- Cursos do aluno ---
    async addCourse(studentId: number, dados: CourseInput) {
        const student = await this.studentRepo.findOneBy({ id: studentId });
        if (!student) throw new AppError("Aluno não encontrado", 404);
        if (!dados?.nome || !dados.nome.trim()) {
            throw new AppError("O nome do curso é obrigatório", 400);
        }
        const course = this.courseRepo.create({
            name: dados.nome.trim(),
            status: this.normalizarStatus(dados.status),
            tipo: this.normalizarTipo(dados.tipo),
            professor: this.normalizarProfessor(dados.professor),
            value: this.normalizarValor(dados.valor),
            date: dados.data || null,
            student,
        });
        await this.courseRepo.save(course);
        return this.getById(studentId);
    }

    async updateCourse(studentId: number, courseId: number, dados: CourseInput) {
        const course = await this.courseRepo.findOne({
            where: { id: courseId, student: { id: studentId } },
        });
        if (!course) throw new AppError("Curso não encontrado", 404);

        if (dados.nome !== undefined) {
            if (!dados.nome.trim()) throw new AppError("O nome do curso é obrigatório", 400);
            course.name = dados.nome.trim();
        }
        if (dados.status !== undefined) course.status = this.normalizarStatus(dados.status);
        if (dados.tipo !== undefined) course.tipo = this.normalizarTipo(dados.tipo);
        if (dados.professor !== undefined) course.professor = this.normalizarProfessor(dados.professor);
        if (dados.valor !== undefined) course.value = this.normalizarValor(dados.valor);
        if (dados.data !== undefined) course.date = dados.data || null;

        await this.courseRepo.save(course);
        return this.getById(studentId);
    }

    async removeCourse(studentId: number, courseId: number) {
        const course = await this.courseRepo.findOne({
            where: { id: courseId, student: { id: studentId } },
        });
        if (!course) throw new AppError("Curso não encontrado", 404);
        await this.courseRepo.remove(course);
    }

    // --- Dashboard / estatísticas ---
    async dashboard() {
        const totalAlunos = await this.studentRepo.count();
        const totalCursos = await this.courseRepo.count();
        const concluidos = await this.courseRepo.count({
            where: { status: "concluido" },
        });
        const resultado = await this.courseRepo
            .createQueryBuilder("course")
            .select("COALESCE(SUM(course.value), 0)", "receita")
            .getRawOne<{ receita: string }>();

        // Receita e contagem de aulas/pacotes agrupados por professor.
        const porProfessorRaw = await this.courseRepo
            .createQueryBuilder("course")
            .select("course.professor", "professor")
            .addSelect("COALESCE(SUM(course.value), 0)", "receita")
            .addSelect("COUNT(*)", "cursos")
            .addSelect("SUM(CASE WHEN course.tipo = 'aula' THEN 1 ELSE 0 END)", "aulas")
            .addSelect("SUM(CASE WHEN course.tipo = 'pacote' THEN 1 ELSE 0 END)", "pacotes")
            .groupBy("course.professor")
            .getRawMany<{
                professor: string;
                receita: string;
                cursos: string;
                aulas: string;
                pacotes: string;
            }>();

        // Garante que todos os professores apareçam, mesmo sem cursos (receita 0).
        const porProfessor = PROFESSORES.map((professor) => {
            const linha = porProfessorRaw.find((r) => r.professor === professor);
            return {
                professor,
                receita: Number(linha?.receita) || 0,
                cursos: Number(linha?.cursos) || 0,
                aulas: Number(linha?.aulas) || 0,
                pacotes: Number(linha?.pacotes) || 0,
            };
        });

        return {
            totalAlunos,
            totalCursos,
            concluidos,
            receita: Number(resultado?.receita) || 0,
            porProfessor,
        };
    }
}
