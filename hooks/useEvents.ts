import { useEventStore } from "@/src/infrastructure/stores/event_store";
import { useEffect } from "react";

export function useEvents() {
    const { events, fetchEvents, loading, error } = useEventStore();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return { events, loading, error };
}
