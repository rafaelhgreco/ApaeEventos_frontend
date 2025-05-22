// src/api/mock/handlers/eventHandlers.ts
import MockAdapter from "axios-mock-adapter";

const mockEvents = [
    {
        id: "1",
        name: "Tech Conference 2024",
        date: "2024-07-15T09:00:00",
        local: "Convention Center, New York",
    },
    // ... outros eventos
];

export default function registerEventHandlers(mock: MockAdapter) {
    // Listar todos os eventos
    mock.onGet("/events").reply(200, mockEvents);

    // Buscar evento por ID
    mock.onGet(/\/events\/\d+/).reply((config) => {
        const id = config.url?.split("/").pop();
        const event = mockEvents.find((e) => e.id === id);

        return event ? [200, event] : [404, { error: "Evento não encontrado" }];
    });

    // Criar novo evento
    mock.onPost("/events").reply((config) => {
        const newEvent = JSON.parse(config.data);
        mockEvents.push(newEvent);
        return [201, newEvent];
    });
}
