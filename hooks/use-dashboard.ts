import { getIdToken } from '@/lib/cognito';
import { API_BASE_URL } from '@env';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface DashboardEventSummary {
  event_id: number;
  event_name: string;
  data: string;
  tickets_issued: number;
  tickets_used: number;
  revenue: number;
  capacity: number;
  remaining: number;
}

interface EventCheckins {
  total_scans: number;
  unique_tickets_scanned: number;
  first_scan_at: string | null;
  last_scan_at: string | null;
}

interface TimelinePoint {
  dia: string;
  scans: number;
}

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [eventsList, setEventsList] = useState<DashboardEventSummary[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<DashboardEventSummary | null>(null);
  const [checkins, setCheckins] = useState<EventCheckins | null>(null);
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);

  /**
   * ============================================================
   * FUNÇÃO PRINCIPAL: LOAD DASHBOARD
   * ============================================================
   */
  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getIdToken();
      if (!token) {
        Alert.alert('Erro', 'Você precisa estar autenticado.');
        return;
      }

      /** ============================
       * 1) OVERVIEW GLOBAL
       * ============================ */
      const overview = await axios.get(`${API_BASE_URL}/dashboard/overview`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allEvents = overview.data.events || [];
      setEventsList(allEvents);

      /** ================================================
       * Caso ainda não tenha evento selecionado, apenas
       * carrega visão geral e não continua.
       * ================================================ */
      if (!selectedEventId) {
        setSelectedEvent(null);
        setCheckins(null);
        setTimeline([]);
        return;
      }

      /** ============================
       * 2) DETALHE DO EVENTO
       * ============================ */
      const detail = await axios.get(`${API_BASE_URL}/dashboard/events/${selectedEventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const summary = detail.data.sales;
      const checkinsData = detail.data.checkins;
      const timelineData = detail.data.timeline || [];

      setSelectedEvent(summary);
      setCheckins(checkinsData);
      setTimeline(timelineData);
    } catch (err) {
      console.error('❌ Erro no dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedEventId]);

  /**
   * ============================================================
   * EFEITOS
   * ============================================================
   */
  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    loading,
    eventsList,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    checkins,
    timeline,
    refresh: loadDashboard,
  };
};
