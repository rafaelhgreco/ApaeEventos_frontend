// eslint-disable-next-line import/no-unresolved
import { API_BASE_URL } from "@env";
import axios from "axios";

/**
 * 🎫 Estrutura dos dados do ticket
 */
export interface TicketData {
    eventId: number;
    buyerEmail: string;
    quantity: number;
}

/**
 * 🎟️ Estrutura de retorno do ticket (exemplo vindo do backend)
 */
export interface TicketResponse {
    id?: number;
    code: string;
    qrUrl: string;
    pricePaid: number;
    status?: string;
    event_name?: string;
    event_date?: string;
    event_location?: string;
}

/**
 * 🔹 Cria um ou mais ingressos para um evento
 */
export const createTicket = async (ticket: TicketData, token: string) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/tickets`,
            {
                eventId: ticket.eventId,
                buyerEmail: ticket.buyerEmail,
                quantity: ticket.quantity,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error(
            "❌ Erro ao criar ticket:",
            error?.response?.data || error
        );
        throw error;
    }
};

/**
 * 🔹 Lista todos os ingressos do usuário autenticado
 */
export const listUserTickets = async (token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tickets`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data as TicketResponse[];
    } catch (error: any) {
        console.error(
            "❌ Erro ao listar tickets:",
            error?.response?.data || error
        );
        throw error;
    }
};

/**
 * 🔹 Obtém detalhes de um ingresso específico pelo ID
 */
export const getTicketById = async (id: number, token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tickets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data as TicketResponse;
    } catch (error: any) {
        console.error(
            "❌ Erro ao buscar ticket:",
            error?.response?.data || error
        );
        throw error;
    }
};
