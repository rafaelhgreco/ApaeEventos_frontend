import { getIdToken, getUserRole, userPool } from "@/lib/cognito";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEvents } from "../../hooks/useEvents";
import Button from "../ATOMIC/atoms/button";
import { styles } from "./event_card.style";
import { EventItem } from "./event_item";

export default function EventsCard() {
  const { events, fetchEvents, loading, error } = useEvents();
  const [role, setRole] = useState<string>("default");
  const router = useRouter();

  // 🔹 Atualiza eventos e role sempre que o usuário voltar à tela
  useFocusEffect(
    useCallback(() => {
      const loadEvents = async () => {
        try {
          const user = userPool.getCurrentUser();
          if (!user) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
          }

          const token = await getIdToken();
          await fetchEvents(token);

          const currentRole = await getUserRole();
          setRole(currentRole);
        } catch (err) {
          console.error("Erro ao carregar eventos:", err);
        }
      };

      loadEvents();
    }, [fetchEvents])
  );

  const handleCreateNewEvent = () => router.push("/new_event");
  const handleValidateTicket = () => router.push("/qrcode");
  const handleDashboard = () => router.push("/dashboard");

  const handleBuyTicket = (eventId: number) => {
    Alert.alert(
      "Compra de ingresso",
      "Função de compra de ingresso será adicionada após integração com o gateway de pagamento.",
      [{ text: "OK" }]
    );
  };

  return (
    <View>
      {/* 🔸 Bloco de eventos */}
      <View style={styles.container}>
        <Text style={styles.title}>Próximos Eventos</Text>

        <ScrollView style={styles.scrollView}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : events.length === 0 ? (
            <Text style={styles.title}>Nenhum evento encontrado</Text>
          ) : (
            events.map((event) => (
              <View style={styles.eventCard} key={event.id}>
                <TouchableOpacity
                  onPress={() => router.push(`/event/${event.id}`)}
                >
                  <EventItem event={event} />
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                      🎟️ {event.sold_count || 0} / {event.capacity || 0} ingressos vendidos
                    </Text>
                    <Text style={styles.infoText}>
                      💰 R$ {Number(event.ticket_price || 0).toFixed(2)}
                    </Text>
                  </View>
                  <Button
                    label="Ver Detalhes"
                    variant="outline"
                    onPress={() => router.push(`/event/${event.id}`)}
                  />
                  {role === "default" && (
                    <Button
                      label="Comprar Ingresso"
                      variant="primary"
                      onPress={() => handleBuyTicket(event.id)}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.linkContainer}>
          <Link href="/list_all_events" style={styles.linkBox}>
            <Text style={styles.link}>Ver todos os eventos 👉</Text>
          </Link>
        </View>
      </View>

      {/* 🔹 Ações rápidas (somente staff/admin) */}
      {role !== "default" && (
        <View style={styles.actionsBox}>
          <Text style={styles.title}>Ações Rápidas</Text>
          <View style={styles.actionsGrid}>
            <View style={styles.actionCard}>
              <Button
                label="Cadastrar Evento"
                variant="primary"
                onPress={handleCreateNewEvent}
                containerStyle={styles.actionButton}
                textStyle={styles.actionButtonText}
              />
            </View>

            <View style={styles.actionCard}>
              <Button
                label="Validar Ingresso"
                variant="primary"
                onPress={handleValidateTicket}
                containerStyle={styles.actionButton}
                textStyle={styles.actionButtonText}
              />
            </View>

            <View style={styles.actionCard}>
              <Button
                label="Dashboard"
                variant="primary"
                onPress={handleDashboard}
                containerStyle={styles.actionButton}
                textStyle={styles.actionButtonText}
              />
            </View>

            <View style={styles.actionCard}>
              <Button
                label="Registrar Usuário"
                variant="primary"
                onPress={() => router.push("/admin_register")}
                containerStyle={styles.actionButton}
                textStyle={styles.actionButtonText}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
