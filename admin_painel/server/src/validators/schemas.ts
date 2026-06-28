import { z } from "zod";

// =============================================================================
// Especificações de formato (regex) dos campos do aluno.
// Os campos são opcionais, mas SE preenchidos precisam bater com o formato —
// caso contrário a requisição é rejeitada (400) e nada é inserido no banco.
// =============================================================================

/**
 * CPF — Cadastro de Pessoa Física, 11 dígitos.
 * Aceita os dois formatos de entrada:
 *   - Mascarado:  000.000.000-00   (3 + 3 + 3 dígitos, pontos e hífen)
 *   - Só números: 00000000000      (11 dígitos seguidos)
 * O regex valida apenas o FORMATO; os dígitos verificadores são conferidos
 * pelo algoritmo oficial em `cpfTemDigitosValidos()`.
 */
const CPF_REGEX = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

/**
 * E-mail — parte local + "@" + domínio + "." + TLD.
 *   - parte local: letras, números e . _ % + -
 *   - exatamente um "@"
 *   - domínio com ao menos um ponto e TLD de 2+ letras
 *   - sem espaços
 */
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Telefone brasileiro. Aceita:
 *   - Mascarado:  (00) 00000-0000  (celular)  ou  (00) 0000-0000  (fixo)
 *   - Só números: 11 dígitos (celular) ou 10 dígitos (fixo)
 * DDD de 2 dígitos + 8 (fixo) ou 9 (celular) dígitos.
 */
const TELEFONE_REGEX = /^(\(\d{2}\)\s?\d{4,5}-\d{4}|\d{10,11})$/;

// Valida os dois dígitos verificadores do CPF (algoritmo oficial da Receita).
function cpfTemDigitosValidos(valor: string): boolean {
    const cpf = valor.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    // Rejeita sequências repetidas (000.000.000-00, 111..., etc.) que passam no regex.
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const digito = (base: string, pesoInicial: number) => {
        let soma = 0;
        for (let i = 0; i < base.length; i++) {
            soma += Number(base[i]) * (pesoInicial - i);
        }
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };

    const d1 = digito(cpf.slice(0, 9), 10);
    const d2 = digito(cpf.slice(0, 10), 11);
    return d1 === Number(cpf[9]) && d2 === Number(cpf[10]);
}

// Campos opcionais que o front pode mandar como string vazia.
const textoOpcional = z.string().trim().optional();

// Vazio/ausente é permitido; se vier valor, precisa passar no formato.
const cpfOpcional = z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || CPF_REGEX.test(v), "CPF inválido — use 000.000.000-00 ou 11 dígitos")
    .refine((v) => !v || cpfTemDigitosValidos(v), "CPF inválido — dígitos verificadores não conferem");

const emailOpcional = z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || EMAIL_REGEX.test(v), "E-mail inválido");

const telefoneOpcional = z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || TELEFONE_REGEX.test(v), "Telefone inválido — use (00) 00000-0000");

// --- Login ---
export const loginSchema = z.object({
    usuario: z.string({ error: "Usuário é obrigatório" }).trim().min(1, "Usuário é obrigatório"),
    senha: z.string({ error: "Senha é obrigatória" }).min(1, "Senha é obrigatória"),
});

// --- Alunos ---
export const studentCreateSchema = z.object({
    nome: z.string().trim().min(1, "O nome é obrigatório"),
    cpf: cpfOpcional,
    email: emailOpcional,
    telefone: telefoneOpcional,
    endereco: textoOpcional,
});

// Update: todos opcionais, mas se "nome" vier não pode ser vazio.
export const studentUpdateSchema = studentCreateSchema.partial();

// --- Cursos ---
export const courseCreateSchema = z.object({
    nome: z.string().trim().min(1, "O nome do curso é obrigatório"),
    status: z.enum(["comprado", "concluido"], { error: "Status inválido" }).optional(),
    professor: z.enum(["gabriel", "arthur"], { error: "Professor inválido" }).optional(),
    valor: z.coerce.number({ error: "Valor inválido" }).min(0, "Valor inválido").optional(),
    data: textoOpcional,
});

export const courseUpdateSchema = courseCreateSchema.partial();
