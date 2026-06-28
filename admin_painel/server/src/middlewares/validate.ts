import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

// Valida req.body contra um schema do zod.
// Em caso de erro responde 400 com { erro } (formato esperado pelo front).
export function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            const mensagem = resultado.error.issues
                .map((issue) => issue.message)
                .join("; ");
            return res.status(400).json({ erro: mensagem });
        }

        req.body = resultado.data;
        return next();
    };
}
