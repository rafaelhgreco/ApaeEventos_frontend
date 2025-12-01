import { Event } from '@/src/domain/events';
import { formatWithOptions } from 'date-fns/fp';
import { ptBR } from 'date-fns/locale/pt-BR';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './event_item.style';

export const EventItem: React.FC<{ event: Event }> = ({ event }) => {
  // ✅ Garante que a data seja string
  const dateValue =
    typeof event.data === 'string' ? event.data : (event.data as Date).toISOString();

  const [year, month, day] = dateValue.split('T')[0].split('-');

  // ✅ Converte para data local correta
  const formatBR = formatWithOptions({ locale: ptBR });
  const formattedDate = formatBR("dd 'de' MMMM 'de' yyyy")(
    new Date(Number(year), Number(month) - 1, Number(day)),
  );
  return (
    <View style={styles.eventItem}>
      <Text style={styles.eventName} numberOfLines={1}>
        {event.nome}
      </Text>
      <Text style={styles.eventData}>Data: {formattedDate}</Text>
      <Text style={styles.eventLocal}>Local: {event.local}</Text>
    </View>
  );
};
