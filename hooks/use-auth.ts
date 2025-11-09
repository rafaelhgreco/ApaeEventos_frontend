import { useAuthStore } from "@/stores/auth_store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

interface UseAuthController {
    handleGetToken: () => Promise<string | null>;
    handleGetRole: () => Promise<string | null>;
    handleLogout: () => Promise<void>;
    handleRefreshAuth: () => Promise<void>;
    handleRequireAuth: () => Promise<boolean>;
}

interface UseAuthReturn {
    controller: UseAuthController;
    token: string | null;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export const useAuth = (): UseAuthReturn => {
    const router = useRouter();

    const {
        token,
        role,
        isAuthenticated,
        isLoading,
        error,
        fetchToken,
        fetchRole,
        initialize,
        logout,
        setError,
    } = useAuthStore();

    // Inicializar autenticação ao montar o hook
    useEffect(() => {
        initialize();
    }, []);

    const controller: UseAuthController = {
        handleGetToken: async () => {
            try {
                const token = await fetchToken();

                if (!token) {
                    Alert.alert(
                        "Erro de Autenticação",
                        "Você precisa estar logado para acessar este recurso."
                    );
                    router.replace("/");
                    return null;
                }

                return token;
            } catch (error: any) {
                const errorMessage =
                    error.message || "Erro ao obter token de autenticação";
                setError(errorMessage);
                Alert.alert("Erro", errorMessage);
                return null;
            }
        },

        handleGetRole: async () => {
            try {
                return await fetchRole();
            } catch (error: any) {
                const errorMessage =
                    error.message || "Erro ao obter função do usuário";
                setError(errorMessage);
                return null;
            }
        },

        handleLogout: async () => {
            try {
                await logout();
                Alert.alert("Sucesso", "Logout realizado com sucesso!");
                router.replace("/");
            } catch (error: any) {
                Alert.alert("Erro", error.message || "Erro ao fazer logout");
            }
        },

        handleRefreshAuth: async () => {
            try {
                await initialize();
            } catch (error: any) {
                setError(error.message || "Erro ao atualizar autenticação");
            }
        },

        handleRequireAuth: async () => {
            const token = await controller.handleGetToken();
            return !!token;
        },
    };

    return {
        controller,
        token,
        role,
        isAuthenticated,
        isLoading,
        error,
    };
};
