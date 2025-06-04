import { Event } from "../../domain/events";

export interface EventRepository {
    create(event: Event): Promise<Event>;
    findById(id: number): Promise<Event | null>;
    findAll(): Promise<Event[]>;
    update(event: Event): Promise<Event>;
    delete(id: number): Promise<void>;
}
