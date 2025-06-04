import axios from "axios";

const API_URL = "http://35.247.231.143:3000"; // atualize se necessário

export interface ReportData {
    total: number;
    usados: number;
}

export const getEventReport = async (
    eventId: string,
    token: string
): Promise<ReportData> => {
    const response = await axios.get(`${API_URL}/report/${eventId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
