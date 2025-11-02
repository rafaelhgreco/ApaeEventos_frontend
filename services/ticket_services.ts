import { API_BASE_URL } from "@env";
import axios from "axios";

export interface TicketData {
    eventId: number;
    tipo: string;
    email: string;
}

export const createTicket = async (ticket: TicketData, token: string) => {
    const response = await axios.post(
        `${API_BASE_URL}/tickets`,
        {
            eventId: ticket.eventId,
            tipo: ticket.tipo,
            email: ticket.email,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
