import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useEventStore } from "../src/infrastructure/stores/event_store";

export function useEvents() {
    const { events, fetchEvents, loading, error } = useEventStore();

    useEffect(() => {
        const loadEvents = async () => {
            const token = await AsyncStorage.getItem("auth_token");
            if (token) {
                await fetchEvents(token);
            }
        };
        loadEvents();
    }, [fetchEvents]);

    return { events, fetchEvents, loading, error };
}
