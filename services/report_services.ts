import { API_BASE_URL } from "@env";
import axios from "axios";

export interface ReportData {
    total: number;
    usados: number;
}

export const getEventReport = async (
    eventId: string,
    token: string
): Promise<ReportData> => {
    const response = await axios.get(`${API_BASE_URL}/report/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
