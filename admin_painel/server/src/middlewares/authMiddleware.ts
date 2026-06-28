import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = header.substring(7);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = payload;
        return next();
    } catch {
        return res.status(401).json({ erro: "Token inválido" });
    }
}
