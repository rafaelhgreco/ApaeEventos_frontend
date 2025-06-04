import axios from "axios";

const API_URL = "http://35.247.231.143:3000";

export interface EventData {
    nome: string;
    data: Date;
    local: string;
    capacidade: number;
    bannerUrl: string;
}

export const getUserEvents = async (token: string) => {
    const response = await axios.get(`${API_URL}/events`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createEvent = async (event: EventData, token: string) => {
    const response = await axios.post(
        `${API_URL}/events`,
        {
            nome: event.nome,
            data: event.data,
            local: event.local,
            capacidade: event.capacidade,
            bannerUrl: event.bannerUrl,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
