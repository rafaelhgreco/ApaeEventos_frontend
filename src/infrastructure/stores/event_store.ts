import { create } from "zustand";
import { getUserEvents } from "../../../services/event_services";
import { Event } from "../../domain/events";

interface EventState {
    events: Event[];
    selectedEvent: Event | null;
    loading: boolean;
    error: string | null;
    fetchEvents: (token: string) => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
    events: [],
    selectedEvent: null,
    loading: false,
    error: null,

    fetchEvents: async (token: string) => {
        set({ loading: true, error: null });
        try {
            const events = await getUserEvents(token);
            set({ events, loading: false });
        } catch (error: any) {
            set({
                loading: false,
                error: error.message || "Erro ao buscar eventos",
            });
        }
    },
}));
