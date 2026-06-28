import { z } from "zod";

// Campos opcionais que o front pode mandar como string vazia.
const textoOpcional = z.string().trim().optional();
const emailOpcional = z
    .string()
    .trim()
    .email("E-mail inválido")
    .or(z.literal(""))
    .optional();

// --- Login ---
export const loginSchema = z.object({
    usuario: z.string({ error: "Usuário é obrigatório" }).trim().min(1, "Usuário é obrigatório"),
    senha: z.string({ error: "Senha é obrigatória" }).min(1, "Senha é obrigatória"),
});

// --- Alunos ---
export const studentCreateSchema = z.object({
    nome: z.string().trim().min(1, "O nome é obrigatório"),
    cpf: textoOpcional,
    email: emailOpcional,
    telefone: textoOpcional,
    endereco: textoOpcional,
});

// Update: todos opcionais, mas se "nome" vier não pode ser vazio.
export const studentUpdateSchema = studentCreateSchema.partial();

// --- Cursos ---
export const courseCreateSchema = z.object({
    nome: z.string().trim().min(1, "O nome do curso é obrigatório"),
    status: z.enum(["comprado", "concluido"], { error: "Status inválido" }).optional(),
    valor: z.coerce.number({ error: "Valor inválido" }).min(0, "Valor inválido").optional(),
    data: textoOpcional,
});

export const courseUpdateSchema = courseCreateSchema.partial();
