// eslint-disable-next-line import/no-unresolved
import { API_BASE_URL } from "@env";
import axios from "axios";
import { handleApiError } from "./auth_services";

/**
 * Tipagem do evento usado no app
 */
export interface EventData {
  nome: string;
  data: string | Date;
  local: string;
  capacidade: number;
  bannerUrl: string | null;
}

/**
 * 🧠 Função auxiliar para normalizar data (corrige o fuso horário UTC)
 * - Converte para formato 'YYYY-MM-DD' antes de enviar ou exibir
 */
const normalizeDate = (date: string | Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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

    // 🔧 Corrige fuso da data recebida (YYYY-MM-DDTHH:mm:ssZ → YYYY-MM-DD)
    const normalized = response.data.map((event: any) => ({
      ...event,
      data: event.data ? event.data.split("T")[0] : "",
    }));

    return normalized;
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
      local: event.local,
      data: normalizeDate(event.data),
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
    const payload = {
      ...event,
      data: event.data ? normalizeDate(event.data) : undefined,
    };

    const response = await axios.put(`${API_BASE_URL}/events/${id}`, payload, {
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
