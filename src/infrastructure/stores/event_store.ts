import { create } from "zustand";
import { Event } from "../../domain/events";
import { apiClient } from "../api"; // Importe a instância do apiClient

interface EventState {
    events: Event[];
    loading: boolean;
    error: string | null;
    fetchEvents: () => Promise<void>;
    fetchEventById: (id: string) => Promise<void>;
}

export const useEventStore = create<EventState>((set, get) => ({
    events: [],
    loading: false,
    error: null,

    fetchEvents: async () => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.get<Event[]>("/events");
            set({ events: response.data, loading: false });
        } catch (error: any) {
            set({
                loading: false,
                error: error.message || "Failed to fetch events",
            });
        }
    },

    fetchEventById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await apiClient.get<Event>(`/events/${id}`);
            set({ events: [response.data], loading: false });
        } catch (error: any) {
            set({
                loading: false,
                error: error.response?.data.message || "Failed to fetch event",
            });
        }
    },
}));
