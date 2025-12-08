import { styles } from '@/src/styles/dashboard.style';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface EventSummary {
  data: string;
}

interface SystemStatusProps {
  events: EventSummary[];
}

export default function SystemStatus({ events }: SystemStatusProps) {
  const now = new Date().getTime();

  const past = events.filter((e) => new Date(e.data).getTime() < now).length;
  const future = events.length - past;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Status do Sistema</Text>

      <View style={styles.statusRow}>
        <Feather name="check-circle" size={20} color="#10B981" />
        <Text style={styles.statusText}>{past} eventos concluídos</Text>
      </View>

      <View style={styles.statusRow}>
        <Feather name="calendar" size={20} color="#3B82F6" />
        <Text style={styles.statusText}>{future} próximos eventos</Text>
      </View>

      <View style={styles.statusRow}>
        <Feather name="trending-up" size={20} color="#6366F1" />
        <Text style={styles.statusText}>Sistema operacional</Text>
      </View>
    </View>
  );
}
