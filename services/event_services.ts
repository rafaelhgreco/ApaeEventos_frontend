import { API_BASE_URL } from "@env";
import axios from "axios";
import { handleApiError } from "./auth_services";

/**
 * Tipagem do evento usado no app
 */
export interface EventData {
  nome: string;
  data: Date;
  local: string;
  capacidade: number;
  bannerUrl: string;
}

/**
 * 🔹 Obtém todos os eventos disponíveis (qualquer usuário autenticado)
 */
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
    console.error("❌ Erro ao buscar eventos:", error);
    handleApiError(error);
  }
};

/**
 * 🔹 Cria um novo evento (apenas admin ou staff)
 */
export const createEvent = async (event: EventData, token: string) => {
  try {
    const payload = {
      nome: event.nome,
      data: event.data,
      local: event.local,
      capacidade: event.capacidade,
      bannerUrl: event.bannerUrl,
    };

    const response = await axios.post(`${API_BASE_URL}/events`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Erro ao criar evento:", error);
    handleApiError(error);
  }
};

/**
 * 🔹 Atualiza um evento existente (somente admin)
 */
export const updateEvent = async (
  id: number,
  event: Partial<EventData>,
  token: string
) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/events/${id}`, event, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar evento:", error);
    handleApiError(error);
  }
};

/**
 * 🔹 Exclui um evento (somente admin)
 */
export const deleteEvent = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao excluir evento:", error);
    handleApiError(error);
  }
};
