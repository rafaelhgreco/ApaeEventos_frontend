import MockAdapter from "axios-mock-adapter";
import apiClient from "./api_client";
import eventHandlers from "./event_handlers";

// Cria o mock adapter apenas em desenvolvimento
const setupMocks = () => {
    if (process.env.NODE_ENV !== "development") return;

    const mock = new MockAdapter(apiClient, { delayResponse: 500 });

    // Registra todos os handlers
    eventHandlers(mock);

    console.log("Mock adapter configurado!");
};

export default setupMocks;
