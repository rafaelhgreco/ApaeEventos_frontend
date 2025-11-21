import SearchInput from '@/components/ATOMIC/atoms/search_input';
import { getIdToken, getUserRole, userPool } from '@/lib/cognito';
import { getUserEvents } from '@/services/event_services';
import { useNavigation, useRouter } from 'expo-router';
import { Calendar, DollarSign, MapPin, Ticket, User } from 'lucide-react-native';
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

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles/list_all_events.style';

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [role, setRole] = useState<'admin' | 'default'>('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation();
  const router = useRouter();

  /* -------------------------------
     HEADER
  ------------------------------- */
  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Todos os Eventos' });
  }, [navigation]);

  /* -------------------------------
     INICIAR
  ------------------------------- */
  useEffect(() => {
    loadRole();
    fetchEvents();
  }, []);

  const loadRole = async () => {
    try {
      const r = await getUserRole();
      setRole(r === 'admin' ? 'admin' : 'default');
    } catch {
      setRole('default');
    }
  };

  /* -------------------------------
     CARREGAR EVENTOS
  ------------------------------- */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = userPool.getCurrentUser();
      if (!user) {
        Alert.alert('Erro', 'Usuário não autenticado. Faça login novamente.');
        return router.replace('../login');
      }

      const token = await getIdToken();
      const data = await getUserEvents(token);

      const sorted = [...data].sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime(),
      );

      setEvents(sorted);
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------
     BUSCA
  ------------------------------- */
  const filteredEvents = events.filter((event) =>
    event.nome.toLowerCase().includes(search.toLowerCase()),
  );

  /* -------------------------------
     FORMATAÇÃO DE DATA INTELIGENTE
  ------------------------------- */
  const formatEventDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';

    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = date.getTime() - today.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Hoje';
    if (days === 1) return 'Amanhã';
    if (days === 2) return 'Depois de amanhã';

    const names = [
      'domingo',
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
    ];
    const dayName = names[date.getDay()];

    if (days > 2 && days < 7) return `Próxima ${dayName}`;
    if (days >= 7 && days < 30) return `Daqui ${days} dias`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  /* -------------------------------
     PRÓXIMO EVENTO
  ------------------------------- */
  const nextEvent = filteredEvents.find(
    (ev) => new Date(ev.data).getTime() >= new Date().setHours(0, 0, 0, 0),
  );

  /* -------------------------------
     RENDER
  ------------------------------- */

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* BUSCA */}
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
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 120, // evita ficar atrás da barra inferior
          }}
          initialNumToRender={10}
          maxToRenderPerBatch={6}
          windowSize={5}
          removeClippedSubviews
          renderItem={({ item }) => {
            const isNext = item.id === nextEvent?.id;

            return (
              <TouchableOpacity
                style={[styles.card, isNext && styles.highlightCard]}
                onPress={() => router.push(`/event/${item.id}`)}
              >
                {/* Badge */}
                {isNext && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>PRÓXIMO EVENTO</Text>
                  </View>
                )}

                {/* Banner */}
                {item.bannerUrl ? (
                  <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
                ) : (
                  <View style={styles.bannerPlaceholder}>
                    <Text style={styles.bannerText}>Sem banner</Text>
                  </View>
                )}

                {/* Nome */}
                <Text style={styles.name}>{item.nome}</Text>

                {/* Data */}
                <View style={styles.row}>
                  <Calendar size={18} color="#4b5563" />
                  <Text style={styles.info}>{formatEventDate(item.data)}</Text>
                </View>

                {/* Local */}
                <View style={styles.row}>
                  <MapPin size={18} color="#4b5563" />
                  <Text style={styles.info}>{item.local}</Text>
                </View>

                {/* Infos */}
                <View style={styles.row}>
                  <Ticket size={18} color="#374151" />
                  <Text style={styles.tag}>
                    {item.sold_count || 0}/{item.capacity || 0}
                  </Text>

                  {role === 'admin' && (
                    <>
                      <DollarSign size={18} color="#374151" />
                      <Text style={styles.tag}>R$ {item.ticket_price}</Text>

                      <User size={18} color="#374151" />
                      <Text style={styles.tag}>Criado por {item.created_by_name}</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
