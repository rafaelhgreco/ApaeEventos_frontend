import { ENV } from "@/config/env";
import axios from "axios";

const API_BASE_URL = ENV.API_BASE_URL;

export interface ReportData {
    total: number;
    usados: number;
}

export const getEventReport = async (
    eventId: number,
    token: string
): Promise<ReportData> => {
    const response = await axios.get(`${API_BASE_URL}/report/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
