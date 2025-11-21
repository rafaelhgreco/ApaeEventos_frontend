import { getIdToken } from '@/lib/cognito';
// eslint-disable-next-line import/no-unresolved
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

interface ChartData {
  labels: string[];
  datasets: any[];
  legend?: string[];
}

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [eventsList, setEventsList] = useState<DashboardEventSummary[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<DashboardEventSummary | null>(null);
  const [checkins, setCheckins] = useState<EventCheckins | null>(null);

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
    legend: [],
  });

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

      // 1 — OVERVIEW
      const overview = await axios.get(`${API_BASE_URL}/dashboard/overview`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allEvents = overview.data.events || [];
      setEventsList(allEvents);

      // Se não tem evento selecionado ainda, só exibe o global
      if (!selectedEventId) {
        setChartData({
          labels: allEvents.map((e: DashboardEventSummary) => e.event_name.substring(0, 10)),
          datasets: [
            {
              data: allEvents.map((e: DashboardEventSummary) => e.tickets_issued),
              color: () => '#16A34A',
            },
            {
              data: allEvents.map((e: DashboardEventSummary) => e.tickets_used),
              color: () => '#DC2626',
            },
          ],
          legend: ['Emitidos', 'Usados'],
        });
        return;
      }

      // 2 — DETALHES DO EVENTO
      const detail = await axios.get(`${API_BASE_URL}/dashboard/events/${selectedEventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const summary = detail.data.sales;
      const checkinsData = detail.data.checkins;
      const timeline = detail.data.timeline || [];

      setSelectedEvent(summary);
      setCheckins(checkinsData);

      setChartData({
        labels: timeline.map((d: any) => d.dia.substring(5)),
        datasets: [
          {
            data: timeline.map((d: any) => d.scans),
            color: () => '#4F46E5',
          },
        ],
        legend: ['Check-ins por dia'],
      });
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

  // CARREGAR AO INICIAR
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
    chartData,
    refresh: loadDashboard,
  };
};
