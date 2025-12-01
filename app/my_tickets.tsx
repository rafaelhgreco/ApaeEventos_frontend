import { getIdToken } from '@/lib/cognito';
import { listUserTickets } from '@/services/ticket_services';
import { styles } from '@/src/styles/my_tickets.style';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function MyTicketsScreen() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const { eventId } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Ingressos' });
  }, [navigation]);

  const fetchTickets = useCallback(async () => {
    try {
      const token = await getIdToken();
      const response = await listUserTickets(token);

      if (eventId) {
        const numericId = Number(eventId);
        const filtered = response.filter((t) => t.event_id === numericId);
        setTickets(filtered);
      } else {
        setTickets(response);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar ingressos:', error);
      Alert.alert('Erro', 'Não foi possível carregar seus ingressos.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTickets();
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando ingressos...</Text>
      </View>
    );

  if (tickets.length === 0)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🎟️ Nenhum ingresso para este evento.</Text>
      </View>
    );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.title}>🎟️ Meus Ingressos</Text>

      {tickets.map((ticket) => (
        <View style={styles.ticketCard} key={ticket.id}>
          <Text style={styles.eventTitle}>{ticket.event_name}</Text>

          <Text style={styles.eventDetails}>
            📍 {ticket.event_location}
            {'\n'}🗓️ {new Date(ticket.event_date).toLocaleDateString('pt-BR')}
          </Text>

          <Text style={styles.price}>💰 Valor Pago: R$ {Number(ticket.price_paid).toFixed(2)}</Text>

          <Text style={styles.status}>
            🔄 Status:{' '}
            <Text
              style={{
                color:
                  ticket.status === 'issued'
                    ? '#16A34A'
                    : ticket.status === 'used'
                    ? '#DC2626'
                    : '#6B7280',
              }}
            >
              {ticket.status === 'issued'
                ? 'Emitido'
                : ticket.status === 'used'
                ? 'Utilizado'
                : 'Indefinido'}
            </Text>
          </Text>

          {ticket.qr_url ? (
            <View style={styles.qrBox}>
              <Image source={{ uri: ticket.qr_url }} style={styles.qrImage} resizeMode="contain" />
              <Text style={styles.code}>Código: {ticket.code}</Text>
            </View>
          ) : (
            <Text style={styles.missingQr}>⚠️ QR Code não disponível.</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
