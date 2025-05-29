import axios from "axios";

const API_URL = "http://35.247.231.143:3000";

export interface TicketData {
    eventId: string;
    tipo: string;
    email: string;
}

export const createTicket = async (ticket: TicketData, token: string) => {
    const response = await axios.post(
        `${API_URL}/tickets`,
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
