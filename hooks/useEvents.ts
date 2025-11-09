import { getIdToken } from "@/lib/cognito";
import { useEffect } from "react";
import { useEventStore } from "../stores/event_store";

export function useEvents() {
    const { events, fetchEvents, loading, error } = useEventStore();

    useEffect(() => {
        const loadEvents = async () => {
            try {
                // Obtém o token Cognito do usuário logado
                const token = await getIdToken();
                if (token) {
                    await fetchEvents(token);
                }
            } catch (err) {
                console.error("❌ Erro ao carregar eventos:", err);
            }
        };

        loadEvents();
    }, [fetchEvents]);

    return { events, fetchEvents, loading, error };
}
