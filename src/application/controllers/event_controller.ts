import {
    EventFindAllService,
    EventFindByIdService,
} from "./../services/event_services";

export class EventController {
    constructor(
        private eventFindAllUseCase: EventFindAllService,
        private eventFindByIdUseCase: EventFindByIdService
    ) {}

    async findAll() {
        const events = await this.eventFindAllUseCase.execute();
        return events;
    }

    async findById(id: number) {
        const event = await this.eventFindByIdUseCase.execute(id);
        return event;
    }
}
