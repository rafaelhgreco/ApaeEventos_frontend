import { styles } from '@/src/styles/dashboard.style';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Text, View } from 'react-native';

// Tipagem dos eventos vindos do backend
interface EventItem {
  event_id: number;
  event_name: string;
}

// Props do componente
interface EventSelectProps {
  events: EventItem[];
  selectedId: number | null;
  onChange: (id: number) => void;
}

export default function EventSelect({ events, selectedId, onChange }: EventSelectProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.cardLabel}>Selecione o Evento</Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          backgroundColor: '#fff',
        }}
      >
        <Picker
          selectedValue={selectedId ?? undefined}
          onValueChange={(value: number) => onChange(value)}
          style={{ color: '#000' }}
        >
          {events.map((ev: EventItem) => (
            <Picker.Item key={ev.event_id} label={ev.event_name} value={ev.event_id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
