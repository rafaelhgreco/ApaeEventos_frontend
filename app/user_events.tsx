import Button from '@/components/ATOMIC/atoms/button';
import SearchInput from '@/components/ATOMIC/atoms/search_input';
import { useAuth } from '@/hooks/use-auth';
import { getIdToken, userPool } from '@/lib/cognito';
import { getUserEvents } from '@/services/event_services';
import { useNavigation, useRouter } from 'expo-router';
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
  const [highlightedEventId, setHighlightedEventId] = useState<number | null>(null);

  const navigation = useNavigation();
  const router = useRouter();
  const { controller } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Eventos Disponíveis',
      headerRight: () => (
        <Button label="Logout" variant="primary" size="small" onPress={controller.handleLogout} />
      ),
    });
  }, [navigation]);

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
        router.replace('/');
        return;
      }

      const token = await getIdToken();
      const eventsData = await getUserEvents(token);

      setEvents(eventsData);

      if (eventsData.length > 0) {
        setHighlightedEventId(eventsData[0].id);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Erro ao carregar eventos';
      setError(errorMessage);

      if (error.name === 'AuthenticationError' || error === 'Nenhum usuário autenticado.') {
        Alert.alert('Sessão Expirada', 'Sua sessão expirou. Por favor, faça login novamente.', [
          { text: 'OK', onPress: () => router.replace('/') },
        ]);
      } else {
        Alert.alert('Erro', errorMessage);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUserEvents();
  };

  const handleEventPress = (eventId: number) => {
    router.push(`/event/${eventId}`);
  };

  const filteredEvents = events.filter((event) =>
    event.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const renderEventCard = ({ item }: { item: Event }) => {
    const isHighlighted = item.id === highlightedEventId;

    const eventDate = new Date(item.data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    return (
      <TouchableOpacity
        style={[styles.card, isHighlighted && styles.cardHighlight]}
        onPress={() => handleEventPress(item.id)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: item.bannerUrl || undefined }}
          style={styles.eventBanner}
          resizeMode="cover"
        />

        <View style={styles.eventContent}>
          <Text style={styles.eventTitle} numberOfLines={2}>
            {item.nome}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.eventInfo}>📍 {item.local}</Text>
            <Text style={styles.eventInfo}>🗓️ {eventDate}</Text>
          </View>

          <View style={styles.metadataRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>👥 {item.capacity} pessoas</Text>
            </View>

            {item.ticket_price && (
              <View style={[styles.chip, styles.priceChip]}>
                <Text style={styles.priceChipText}>R$ {Number(item.ticket_price).toFixed(2)}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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

  if (events.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyIcon}>📅</Text>
        <Text style={styles.emptyTitle}>Nenhum evento disponível</Text>
        <Text style={styles.emptySubtitle}>Não há eventos cadastrados no momento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Buscar eventos..." />
      </View>

      {filteredEvents.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>Nenhum evento encontrado</Text>
          <Text style={styles.emptySubtitle}>Tente buscar por outro nome</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
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
      )}
    </View>
  );
}
