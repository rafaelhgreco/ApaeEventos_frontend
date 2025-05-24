import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { env } from "../../config/env";

const apiClient = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 10000,
});

const mock = new MockAdapter(apiClient, { delayResponse: 1000 });

mock.onGet("/events").reply(200, [
    {
        id: "1",
        name: "Event 1",
        date: "2023-10-01",
        local: "Location 1",
        description: "Description 1",
    },
    {
        id: "2",
        name: "Event 2",
        date: "2023-10-02",
        local: "Location 2",
        description: "Description 2",
    },
    {
        id: "3",
        name: "Event 3",
        date: "2023-10-02",
        local: "Location 3",
        description: "Description 3",
    },
]);

mock.onGet(/\/events\/\d+/).reply((config) => {
    const id = config.url?.split("/").pop();
    const eventsMock = [
        {
            id: "1",
            name: "Event 1",
            date: "2023-10-01",
            local: "Location 1",
            description: "Description 1",
        },
        {
            id: "2",
            name: "Event 2",
            date: "2023-10-02",
            local: "Location 2",
            description: "Description 2",
        },
    ];
    const event = eventsMock.find((event) => event.id === id);
    if (event) {
        return [200, event];
    }

    return [404, { message: "Event not found" }];
});

export { apiClient, mock };
