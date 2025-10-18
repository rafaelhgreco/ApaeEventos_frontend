import { getUserEvents } from "@/services/event_services";
import auth from "@react-native-firebase/auth";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, View } from "react-native";
import Button from "../../components/ATOMIC/atoms/button";
import { Event } from "../../src/domain/events";
import styles from "../styles/eventId.style";

export default function EventDetailsPage() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Detalhes do evento",
    });
  }, [navigation]);

  useEffect(() => {
    if (!eventId) return;

    const id = Array.isArray(eventId) ? eventId[0] : eventId;
    fetchUserEvents(id);
  }, [eventId]);

  const fetchUserEvents = async (id: string) => {
    try {
      const token = await auth().currentUser?.getIdToken();
      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      const events = await getUserEvents(token);
      const findEvent = events.find((e: { id: string }) => e.id === id);

      if (!findEvent) {
        setError("Evento não encontrado.");
        return;
      }

      setEvent(findEvent);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error || !event)
    return <Text style={styles.error}>{error || "Evento não encontrado"}</Text>;

  function handleManageTickets() {
    if (!event) return;
    router.push(`/ticket?eventId=${event.id}`);
  }

  function handleClick() {
    if (!event) return;
    router.push(`/report/${event.id}`);
  }

  function handleScan() {
    if (!event) return;
    router.push(`/qrcode?eventId=${event.id}`);
  }

  const formattedDate = new Date(event.data).toLocaleDateString("pt-BR");

  return (
    <View style={styles.container}>
      {event.bannerUrl && (
        <Image
          source={{ uri: event.bannerUrl }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginBottom: 16,
          }}
          resizeMode="cover"
        />
      )}

      <View style={styles.box}>
        <Text style={styles.title}>{event.nome}</Text>
        <Text style={styles.subtitle}>📍 {event.local}</Text>
        <Text style={styles.date}>🗓️ {formattedDate}</Text>
      </View>

      <View style={styles.buttonBox}>
        <Button
          label="Criar novo ingresso"
          variant="secondary"
          onPress={handleManageTickets}
        />
      </View>

      <View style={styles.buttonBox}>
        <Button
          label="Ver todos os ingressos"
          variant="outline"
          onPress={handleClick}
        />
      </View>

      <View style={styles.buttonBox}>
        <Button
          label="Escanear ingresso"
          variant="primary"
          onPress={handleScan}
        />
      </View>
    </View>
  );
}
