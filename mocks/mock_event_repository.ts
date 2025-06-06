import { Event } from "../src/domain/events";
import { EventRepository } from "../src/infrastructure/repository/event_repository";

const mockEvents: Event[] = [
    new Event({
        id: 1,
        name: "Evento 1",
        date: new Date("2023-10-01"),
        local: "Local 1",
    }),
    new Event({
        id: 2,
        name: "Evento 2",
        date: new Date("2023-10-02"),
        local: "Local 2",
    }),
    new Event({
        id: 3,
        name: "Evento 3",
        date: new Date("2023-10-03"),
        local: "Local 3",
    }),
    new Event({
        id: 4,
        name: "Evento 4",
        date: new Date("2023-10-03"),
        local: "Local 4",
    }),
];

export class MockEventRepository implements EventRepository {
    async findAll(): Promise<Event[]> {
        return mockEvents;
    }
    async findById(id: number): Promise<Event | null> {
        const event = mockEvents.find((event) => event.id === id);
        return event || null;
    }
    async create(event: Event): Promise<Event> {
        mockEvents.push(event);
        return event;
    }
    async update(event: Event): Promise<Event> {
        const index = mockEvents.findIndex((e) => e.id === event.id);
        if (index !== -1) {
            mockEvents[index] = event;
            return event;
        }
        throw new Error("Event not found");
    }
    async delete(id: number): Promise<void> {
        const index = mockEvents.findIndex((event) => event.id === id);
        if (index !== -1) {
            mockEvents.splice(index, 1);
            return;
        }
        throw new Error("Event not found");
    }
}
