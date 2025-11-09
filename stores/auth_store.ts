import { getIdToken, getUserRole, signOut, userPool } from "@/lib/cognito";
import { create } from "zustand";

interface AuthState {
    token: string | null;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    setToken: (token: string | null) => void;
    setRole: (role: string | null) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    fetchToken: () => Promise<string | null>;
    fetchRole: () => Promise<string | null>;
    initialize: () => Promise<void>;
    logout: () => Promise<void>;
    clearAuth: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>((set, get) => ({
    token: null,
    role: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    setToken: (token) =>
        set({
            token,
            isAuthenticated: !!token,
            error: token ? null : get().error,
        }),

    setRole: (role) => set({ role }),

    setError: (error) => set({ error, isLoading: false }),

    setLoading: (loading) => set({ isLoading: loading }),

    fetchToken: async () => {
        const state = get();
        if (state.token && state.isAuthenticated) {
            return state.token;
        }

        try {
            state.setLoading(true);
            const user = userPool.getCurrentUser();

            if (!user) {
                state.clearAuth();
                return null;
            }

            const token = await getIdToken();
            state.setToken(token);
            return token;
        } catch (error: any) {
            console.error("Erro ao buscar token:", error);
            state.setError(error.message || "Erro ao buscar token");
            state.clearAuth();
            return null;
        } finally {
            state.setLoading(false);
        }
    },

    fetchRole: async () => {
        const state = get();

        try {
            const role = await getUserRole();

            state.setRole(role);
            return role;
        } catch (error: any) {
            console.error("Erro ao buscar role:", error);
            state.setError(error.message || "Erro ao buscar função do usuário");
            return null;
        }
    },

    initialize: async () => {
        const state = get();
        state.setLoading(true);

        try {
            const token = await state.fetchToken();
            if (token) {
                await state.fetchRole();
            }
        } catch (error: any) {
            console.error("Erro ao inicializar autenticação:", error);
            state.setError(error.message || "Erro ao inicializar");
        } finally {
            state.setLoading(false);
        }
    },

    logout: async () => {
        try {
            const user = userPool.getCurrentUser();
            if (user) {
                const email = user.getUsername();
                await signOut(email);
            }
            get().clearAuth();
        } catch (error: any) {
            console.error("Erro ao fazer logout:", error);
            get().setError(error.message || "Erro ao fazer logout");
            get().clearAuth();
        }
    },

    clearAuth: () => {
        set({
            token: null,
            role: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
        });
    },
}));
