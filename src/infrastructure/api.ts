// services/apiClient.ts
import axios from "axios";
import { env } from "../../config/env";

const apiClient = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 10000,
});

if (__DEV__) {
    apiClient.interceptors.request.use((config) => {
        // Simula GET /events
        if (config.method === "get" && config.url === "/events") {
            config.adapter = () =>
                Promise.resolve({
                    data: [
                        {
                            id: 1,
                            name: "Event 1",
                            date: "2023-10-01",
                            local: "Location 1",
                            description: "Description 1",
                        },
                        {
                            id: 2,
                            name: "Event 2",
                            date: "2023-10-02",
                            local: "Location 2",
                            description: "Description 2",
                        },
                        {
                            id: 3,
                            name: "Event 3",
                            date: "2023-10-02",
                            local: "Location 3",
                            description: "Description 3",
                        },
                    ],
                    status: 200,
                    statusText: "OK",
                    headers: {},
                    config,
                });
        }

        // Simula GET /events/:id
        if (config.method === "get" && config.url?.startsWith("/events/")) {
            const id = Number(config.url.split("/").pop());

            const eventsMock = [
                {
                    id: 1,
                    name: "Event 1",
                    date: "2023-10-01",
                    local: "Location 1",
                    description: "Description 1",
                },
                {
                    id: 2,
                    name: "Event 2",
                    date: "2023-10-02",
                    local: "Location 2",
                    description: "Description 2",
                },
            ];

            const event = eventsMock.find((event) => event.id === id);

            config.adapter = () =>
                Promise.resolve({
                    data: event || { message: "Event not found" },
                    status: event ? 200 : 404,
                    statusText: event ? "OK" : "Not Found",
                    headers: {},
                    config,
                });
        }

        return config;
    });
}

export { apiClient };
