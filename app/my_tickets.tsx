import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { getIdToken } from "@/lib/cognito";
import { listUserTickets } from "@/services/ticket_services";
import { styles } from "./styles/my_tickets.style";

export default function MyTicketsScreen() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = await getIdToken();
      const response = await listUserTickets(token);
      setTickets(response);
    } catch (error) {
      console.error("❌ Erro ao carregar ingressos:", error);
      Alert.alert("Erro", "Não foi possível carregar seus ingressos.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

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
        <Text style={styles.emptyText}>🎟️ Você ainda não possui ingressos.</Text>
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
            {"\n"}🗓️ {new Date(ticket.event_date).toLocaleDateString("pt-BR")}
          </Text>

          <Text style={styles.price}>
            💰 Valor Pago: R$ {Number(ticket.price_paid).toFixed(2)}
          </Text>

          <Text style={styles.status}>
            🔄 Status:{" "}
            <Text
              style={{
                color:
                  ticket.status === "issued"
                    ? "#16A34A"
                    : ticket.status === "used"
                    ? "#DC2626"
                    : "#6B7280",
              }}
            >
              {ticket.status === "issued"
                ? "Emitido"
                : ticket.status === "used"
                ? "Utilizado"
                : "Indefinido"}
            </Text>
          </Text>

          {ticket.qr_url ? (
            <View style={styles.qrBox}>
              <Image
                source={{ uri: ticket.qr_url }}
                style={styles.qrImage}
                resizeMode="contain"
              />
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
