import { styles } from '@/src/styles/dashboard.style';
import React from 'react';
import { Text, View } from 'react-native';

interface EventSummary {
  event_name: string;
  tickets_issued: number;
}

interface TopEventsListProps {
  events: EventSummary[];
}

export default function TopEventsList({ events }: TopEventsListProps) {
  if (!events || events.length === 0) return null;

  const sorted = [...events].sort((a, b) => b.tickets_issued - a.tickets_issued).slice(0, 3);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Top Eventos</Text>

      {sorted.map((e, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.listTitle}>
            {i + 1}. {e.event_name}
          </Text>
          <Text style={styles.listSub}>{e.tickets_issued} ingressos emitidos</Text>
        </View>
      ))}
    </View>
  );
}
