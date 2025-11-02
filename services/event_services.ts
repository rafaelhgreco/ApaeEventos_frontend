// eslint-disable-next-line import/no-unresolved
import { API_BASE_URL } from "@env";
import axios from "axios";
import { handleApiError } from "./auth_services";

/**
 * 🧾 Tipagem completa do evento conforme o novo banco
 */
export interface EventData {
  nome: string;
  data: string | Date;
  local: string;
  capacity: number;
  bannerUrl: string | null;
  ticket_price: number;
  starts_at?: string | null;
  ends_at?: string | null;
  status?: "draft" | "published" | "canceled" | "finished";
}

/**
 * 🧠 Normaliza data para formato compatível com MySQL (YYYY-MM-DD)
 */
const normalizeDate = (date: string | Date): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * 🧠 Normaliza datetime (ex: starts_at, ends_at)
 * Retorna formato 'YYYY-MM-DD HH:MM:SS' (compatível com MySQL DATETIME)
 */
const normalizeDateTime = (value?: string | Date | null): string | null => {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 19).replace("T", " ");
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

    // 🔧 Corrige datas para exibição local
    const normalized = response.data.map((event: any) => ({
      ...event,
      data: event.data ? event.data.split("T")[0] : "",
      ticket_price: Number(event.ticket_price || 0),
      sold_count: Number(event.sold_count || 0),
      capacity: Number(event.capacity || 0),
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
      capacity: event.capacity,
      bannerUrl: event.bannerUrl,
      ticket_price: event.ticket_price,
      starts_at: normalizeDateTime(event.starts_at),
      ends_at: normalizeDateTime(event.ends_at),
      status: event.status || "published",
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
      starts_at: event.starts_at
        ? normalizeDateTime(event.starts_at)
        : undefined,
      ends_at: event.ends_at ? normalizeDateTime(event.ends_at) : undefined,
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
