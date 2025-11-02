import { API_BASE_URL } from "@env";
import axios from "axios";
import { handleApiError } from "./auth_services";

export interface EventData {
    nome: string;
    data: Date;
    local: string;
    capacidade: number;
    bannerUrl: string;
}

export const getUserEvents = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const createEvent = async (event: EventData, token: string) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/events`,
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
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};
