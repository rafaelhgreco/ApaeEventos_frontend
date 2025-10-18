import { API_BASE_URL } from "@env";
import axios from "axios";

interface EventData {
    id: string;
    nome: string;
    data: string;
    local: string;
    capacidade: number;
    bannerUrl: string;
}

interface ReportData {
    total: number;
    usados: number;
}

export const getUserEvents = async (token: string): Promise<EventData[]> => {
    const response = await axios.get(`${API_BASE_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getEventReport = async (
    eventId: string,
    token: string
): Promise<ReportData> => {
    const response = await axios.get(`${API_BASE_URL}/report/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
