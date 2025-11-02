import axios, { AxiosError } from "axios";

class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
    }
}

export const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
            throw new AuthenticationError(
                "Token inválido ou expirado. Faça login novamente."
            );
        }

        throw new Error(
            axiosError.message || "Erro ao comunicar com o servidor"
        );
    }

    throw error;
};
