import { Event } from "../../domain/events";
import { EventRepository } from "../../infrastructure/repository/event_repository";

export class EventFindAllService {
    constructor(private eventRepository: EventRepository) {}

    async execute(): Promise<Event[]> {
        const events = await this.eventRepository.findAll();
        return events;
    }
}

export class EventFindByIdService {
    constructor(private eventRepository: EventRepository) {}

    async execute(id: string): Promise<Event | null> {
        const event = await this.eventRepository.findById(id);
        return event;
    }
}
