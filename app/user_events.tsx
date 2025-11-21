import Button from '@/components/ATOMIC/atoms/button';
import SearchInput from '@/components/ATOMIC/atoms/search_input';
import { useAuth } from '@/hooks/use-auth';
import { getIdToken, userPool } from '@/lib/cognito';
import { getUserEvents } from '@/services/event_services';
import { useNavigation, useRouter } from 'expo-router';
import { Calendar, DollarSign, MapPin, Ticket, Users } from 'lucide-react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Event } from '../src/domain/events';
import { colors } from './styles/themes';
import { styles } from './styles/user_events.style';

export default function UserEventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation();
  const router = useRouter();
  const { controller } = useAuth();

  /* ---------------------------------------------
     HEADER CUSTOM
  --------------------------------------------- */
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Eventos Disponíveis',
      headerRight: () => (
        <Button label="Logout" variant="primary" size="small" onPress={controller.handleLogout} />
      ),
    });
  }, [navigation]);

  /* ---------------------------------------------
     LOAD EVENTS
  --------------------------------------------- */
  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = userPool.getCurrentUser();
      if (!user) {
        Alert.alert('Erro de Autenticação', 'Você precisa estar logado para visualizar eventos.');
        return router.replace('/');
      }

      const token = await getIdToken();
      const eventsData = await getUserEvents(token);

      setEvents(eventsData);
    } catch (err: any) {
      setError(err?.message || 'Erro ao carregar eventos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserEvents();
  };

  /* ---------------------------------------------
     LÓGICA DE EVENTOS FUTUROS + BUSCA
  --------------------------------------------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const searched = events.filter((ev) => ev.nome.toLowerCase().includes(search.toLowerCase()));

  // Só FUTUROS
  const upcomingEvents = searched
    .filter((ev) => new Date(ev.data + 'T00:00:00').getTime() >= today.getTime())
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  const nextEvent = upcomingEvents[0];

  /* ---------------------------------------------
     FORMATAÇÃO DE DATA
  --------------------------------------------- */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /* ---------------------------------------------
     CARD DE EVENTO
  --------------------------------------------- */
  const renderEventCard = ({ item }: { item: Event }) => {
    const isHighlighted = item.id === nextEvent?.id;

    return (
      <TouchableOpacity
        style={[styles.card, isHighlighted && styles.cardHighlight]}
        onPress={() => router.push(`/event/${item.id}`)}
        activeOpacity={0.9}
      >
        {/* Banner */}
        <Image
          source={{ uri: item.bannerUrl || undefined }}
          style={styles.eventBanner}
          resizeMode="cover"
        />

        {/* Conteúdo */}
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={2}>
            {item.nome}
          </Text>

          {/* Local + Data */}
          <View style={styles.infoRow}>
            <MapPin size={18} color={colors.primary} />
            <Text style={styles.eventInfo}>{item.local}</Text>

            <Calendar size={18} color={colors.primary} />
            <Text style={styles.eventInfo}>{formatDate(String(item.data))}</Text>
          </View>

          {/* Chips */}
          <View style={styles.metadataRow}>
            <View style={styles.chip}>
              <Users size={16} color={colors.primaryDark} />
              <Text style={styles.chipText}>{item.capacity} pessoas</Text>
            </View>

            {item.ticket_price && (
              <View style={[styles.chip, styles.priceChip]}>
                <DollarSign size={16} color={colors.successDark} />
                <Text style={styles.priceChipText}>R$ {Number(item.ticket_price).toFixed(2)}</Text>
              </View>
            )}

            <View style={styles.chip}>
              <Ticket size={16} color={colors.primaryDark} />
              <Text style={styles.chipText}>
                {item.sold_count || 0}/{item.capacity}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  /* ---------------------------------------------
     ESTADOS: loading, erro, vazio
  --------------------------------------------- */
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUserEvents}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (upcomingEvents.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyIcon}>🎉</Text>
        <Text style={styles.emptyTitle}>Nenhum evento disponível</Text>
        <Text style={styles.emptySubtitle}>Em breve novos eventos serão liberados!</Text>
      </View>
    );
  }

  /* --------------------------------------------- */
  /*                   RENDER MAIN                 */
  /* --------------------------------------------- */
  return (
    <View style={styles.container}>
      {/* Busca */}
      <View style={styles.searchContainer}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Buscar eventos..." />
      </View>

      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
