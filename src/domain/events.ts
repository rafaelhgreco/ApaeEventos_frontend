export interface Event {
  /** Identificador único do evento */
  id: number;

  /** Nome do evento */
  nome: string;

  /** Local do evento */
  local: string;

  /** Data principal (sem hora) — formato 'YYYY-MM-DD' */
  data: string | Date;

  /** URL opcional do banner armazenado no S3 */
  bannerUrl?: string | null;

  /** Capacidade máxima de participantes */
  capacity: number;

  /** Quantidade de ingressos vendidos (atualizado por triggers ou API) */
  sold_count: number;

  /** Valor do ingresso em reais */
  ticket_price: number;

  /** Status atual do evento */
  status: "published" | "draft" | "canceled" | "finished";

  /** ID do usuário (admin/staff) que criou o evento */
  created_by?: number | null;

  /** Horário de início opcional (ISO completo: 'YYYY-MM-DDTHH:mm:ssZ') */
  starts_at?: string | null;

  /** Horário de término opcional (ISO completo) */
  ends_at?: string | null;

  /** Data e hora de criação do registro */
  created_at?: string | null;

  /** Data e hora da última atualização */
  updated_at?: string | null;
}

export type EventInput = Omit<Event, "id" | "sold_count" | "created_at" | "updated_at">;
