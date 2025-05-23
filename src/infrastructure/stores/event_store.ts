import { create } from "zustand";
import { MockEventRepository } from "../../../mocks/mock_event_repository";
import { Event } from "../../domain/events";
import {
    EventFindAllService,
    EventFindByIdService,
} from "./../../application/services/event_services";

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
            const mockEventRepository = new MockEventRepository();
            const eventFindAllEventsUseCase = new EventFindAllService(
                mockEventRepository
            );
            const events = await eventFindAllEventsUseCase.execute();
            set({ events, loading: false });
        } catch (error) {
            set({ loading: false, error: "Failed to fetch events" });
        }
    },
    fetchEventById: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const mockEventRepository = new MockEventRepository();
            const eventFindByIdUseCase = new EventFindByIdService(
                mockEventRepository
            );
            const event = await eventFindByIdUseCase.execute(id);
            if (event) {
                set({ events: [event], loading: false });
            } else {
                set({ loading: false, error: "Event not found" });
            }
        } catch (error) {
            set({ loading: false, error: "Failed to fetch event" });
        }
    },
}));
