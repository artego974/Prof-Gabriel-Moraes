// Erro de aplicação com status HTTP associado.
// Permite ao controller diferenciar erros tratados (4xx) de falhas inesperadas (500).
export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
    }
}
