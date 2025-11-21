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

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Todos os Eventos' });
  }, [navigation]);

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

      setEvents([...data]);
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
     FILTRO DE BUSCA
  ---------------------------------- */
  const searched = events.filter((event) =>
    event.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ----------------------------------
     FUTUROS
  ---------------------------------- */
  const upcomingEvents = searched
    .filter((ev) => new Date(ev.data + 'T00:00:00').getTime() >= today.getTime())
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  const nextEvent = upcomingEvents[0];

  /* ----------------------------------
     PASSADOS
  ---------------------------------- */
  const pastEvents = searched
    .filter((ev) => new Date(ev.data + 'T00:00:00').getTime() < today.getTime())
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()); // mais recente primeiro

  /* ----------------------------------
     FORMATAÇÃO DE DATA
  ---------------------------------- */
  const formatEventDate = (dateString: string) => {
    if (!dateString) return 'Data não informada';

    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

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
          ListHeaderComponent={
            <>
              {/* FUTUROS */}
              <View style={{ paddingHorizontal: 16, marginTop: 4, marginBottom: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#1e293b' }}>
                  Próximos Eventos
                </Text>
              </View>

              {upcomingEvents.length === 0 && (
                <Text style={{ padding: 12 }}>Nenhum evento futuro encontrado</Text>
              )}
            </>
          }
          data={upcomingEvents}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const isNext = item.id === nextEvent?.id;

            return (
              <TouchableOpacity
                style={[styles.card, isNext && styles.highlightCard]}
                onPress={() => router.push(`/event/${item.id}`)}
              >
                {isNext && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>PRÓXIMO EVENTO</Text>
                  </View>
                )}

                {item.bannerUrl ? (
                  <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
                ) : (
                  <View style={styles.bannerPlaceholder}>
                    <Text style={styles.bannerText}>Sem banner</Text>
                  </View>
                )}

                <Text style={styles.name}>{item.nome}</Text>

                <View style={styles.row}>
                  <Calendar size={18} color="#4b5563" />
                  <Text style={styles.info}>{formatEventDate(item.data)}</Text>
                </View>

                <View style={styles.row}>
                  <MapPin size={18} color="#4b5563" />
                  <Text style={styles.info}>{item.local}</Text>
                </View>

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
          ListFooterComponent={
            <>
              {/* ------- PASSADOS ------- */}
              <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Eventos Passados</Text>

              {pastEvents.length === 0 && (
                <Text style={{ padding: 12 }}>Nenhum evento passado</Text>
              )}

              {pastEvents.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.card, { opacity: 0.7 }]}
                  onPress={() => router.push(`/event/${item.id}`)}
                >
                  {item.bannerUrl ? (
                    <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
                  ) : (
                    <View style={styles.bannerPlaceholder}>
                      <Text style={styles.bannerText}>Sem banner</Text>
                    </View>
                  )}

                  <Text style={styles.name}>{item.nome}</Text>

                  <View style={styles.row}>
                    <Calendar size={18} color="#4b5563" />
                    <Text style={styles.info}>{formatEventDate(item.data)}</Text>
                  </View>

                  <View style={styles.row}>
                    <MapPin size={18} color="#4b5563" />
                    <Text style={styles.info}>{item.local}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          }
        />
      </View>
    </SafeAreaView>
  );
}
