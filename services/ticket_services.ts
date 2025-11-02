// eslint-disable-next-line import/no-unresolved
import { API_BASE_URL } from "@env";
import axios from "axios";

export interface TicketData {
  eventId: number;
  buyerEmail: string;
  quantity: number;
}

/**
 * 🔹 Cria ingressos para um evento
 */
export const createTicket = async (ticket: TicketData, token: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/tickets`,
    {
      // 👇 usa os mesmos nomes que o backend espera
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
};
