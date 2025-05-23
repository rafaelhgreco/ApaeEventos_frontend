import { Event } from "../../domain/events";
import { apiClient } from "../api";
import { EventRepository } from "./event_repository";

export class MockEventRepository implements EventRepository {
    create(event: Event): Promise<Event> {
        throw new Error("Method not implemented.");
    }
    update(event: Event): Promise<Event> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Event[]> {
        const response = await apiClient.get("/events");
        return response.data;
    }
    async findById(id: string): Promise<Event | null> {
        const response = await apiClient.get(`/events/${id}`);
        return response.data;
    }
}
