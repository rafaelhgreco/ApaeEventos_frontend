import SearchInput from '@/components/ATOMIC/atoms/search_input';
import { getIdToken, userPool } from '@/lib/cognito';
import { getUserEvents } from '@/services/event_services';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Event } from '../src/domain/events';
import { styles } from './styles/list_all_events.style';

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Todos os Eventos' });
  }, [navigation]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = userPool.getCurrentUser();
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado. Faça login novamente.');
        router.replace('../login');
        return;
      }

      const token = await getIdToken();
      const eventsData = await getUserEvents(token);

      setEvents(eventsData);
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEventPress = (eventId: number) => {
    router.push(`/event/${eventId}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ padding: 16 }}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar eventos por nome..."
        />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleEventPress(item.id)}>
            {/* Banner grande */}
            {item.bannerUrl ? (
              <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
            ) : (
              <View style={styles.bannerPlaceholder}>
                <Text style={styles.bannerText}>Sem banner</Text>
              </View>
            )}

            {/* Infos */}
            <Text style={styles.name}>{item.nome}</Text>
            <Text style={styles.info}>📍 {item.local}</Text>
            <Text style={styles.info}>
              🗓️ {typeof item.data === 'string' ? item.data : item.data.toLocaleDateString('pt-BR')}
            </Text>

            <View style={styles.row}>
              <Text style={styles.tag}>
                🎟️ {item.sold_count || 0}/{item.capacity || 0}
              </Text>
              <Text style={styles.tag}>💰 R$ {item.ticket_price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
