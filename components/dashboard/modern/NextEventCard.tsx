import { styles } from '@/src/styles/dashboard.style';
import React from 'react';
import { Text, View } from 'react-native';

interface EventSummary {
  event_id: number;
  event_name: string;
  data: string | Date; // pode vir string ou Date
  tickets_issued: number;
  tickets_used: number;
  revenue: number;
  capacity: number;
  remaining: number;
}

interface NextEventCardProps {
  events: EventSummary[];
}

// 🔧 Converte string ISO para Date LOCAL sem mudar o dia
function parseLocalDate(value: string | Date): Date {
  if (value instanceof Date) return value;

  if (typeof value === 'string') {
    // caso 1: "2025-08-09" → sem hora
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split('-').map(Number);
      return new Date(y, m - 1, d);
    }

    // caso 2: ISO "2025-08-09T00:00:00.000Z" → converter mantendo dia
    const iso = new Date(value);
    return new Date(iso.getUTCFullYear(), iso.getUTCMonth(), iso.getUTCDate());
  }

  return new Date(value as any);
}

export default function NextEventCard({ events }: NextEventCardProps) {
  if (!events || events.length === 0) return null;

  // DEBUG bonitão
  events.forEach((e) => {
    const parsed = parseLocalDate(e.data);
    console.log('RAW:', e.data, '| TYPE:', typeof e.data, '| PARSED:', parsed);
  });

  const now = Date.now();

  // 🔹 Filtrar apenas os eventos futuros
  const futureEvents = events.filter((e) => {
    const timestamp = parseLocalDate(e.data).getTime();
    return timestamp >= now;
  });

  // 🔹 Escolher o próximo evento
  let nextEvent: EventSummary | null = null;

  if (futureEvents.length > 0) {
    nextEvent = [...futureEvents].sort(
      (a, b) => parseLocalDate(a.data).getTime() - parseLocalDate(b.data).getTime(),
    )[0];
  } else {
    nextEvent = [...events].sort(
      (a, b) => parseLocalDate(b.data).getTime() - parseLocalDate(a.data).getTime(),
    )[0];
  }

  if (!nextEvent) return null;

  const issued = Number(nextEvent.tickets_issued || 0);
  const capacity = Number(nextEvent.capacity || 1);
  const rate = capacity > 0 ? Math.round((issued / capacity) * 100) : 0;

  const eventDate = parseLocalDate(nextEvent.data);

  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroTitle}>Próximo Evento</Text>
      <Text style={styles.heroEvent}>{nextEvent.event_name}</Text>

      <Text style={styles.heroDate}>{eventDate.toLocaleDateString('pt-BR')}</Text>

      <View style={styles.heroStatsRow}>
        <View style={styles.heroStat}>
          <Text style={styles.heroStatLabel}>Emitidos</Text>
          <Text style={styles.heroStatValue}>{issued}</Text>
        </View>

        <View style={styles.heroStat}>
          <Text style={styles.heroStatLabel}>Capacidade</Text>
          <Text style={styles.heroStatValue}>{capacity}</Text>
        </View>

        <View style={styles.heroStat}>
          <Text style={styles.heroStatLabel}>Ocupação</Text>
          <Text style={styles.heroStatValue}>{rate}%</Text>
        </View>
      </View>
    </View>
  );
}
