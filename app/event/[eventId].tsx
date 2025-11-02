import { getIdToken, getUserRole } from "@/lib/cognito";
import {
  deleteEvent,
  getUserEvents,
  updateEvent,
} from "@/services/event_services";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../../components/ATOMIC/atoms/button";
import { Event } from "../../src/domain/events";
import styles from "../styles/eventId.style";

export default function EventDetailsPage() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState<string>("default");
  const navigation = useNavigation();

  // Estados de edição
  const [editedEvent, setEditedEvent] = useState({
    nome: "",
    local: "",
    data: "",
    capacidade: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Detalhes do evento",
    });
  }, [navigation]);

  useEffect(() => {
    if (!eventId) return;
    const id = Array.isArray(eventId) ? eventId[0] : eventId;
    const numericId = parseInt(id, 10);
    fetchUserEvents(numericId);
    fetchUserRole();
  }, [eventId]);

  const fetchUserRole = async () => {
    try {
      const userRole = await getUserRole();
      setRole(userRole);
    } catch (err) {
      console.error("Erro ao obter role:", err);
      setRole("default");
    }
  };

  const fetchUserEvents = async (id: number) => {
    try {
      setLoading(true);
      const token = await getIdToken();
      const eventsData = await getUserEvents(token);

      const findEvent = eventsData.find((e: { id: number }) => e.id === id);
      if (!findEvent) {
        setError("Evento não encontrado.");
        return;
      }

      setEvent(findEvent);
      setEditedEvent({
        nome: findEvent.nome,
        local: findEvent.local,
        data: findEvent.data?.split("T")[0] || "",
        capacidade: findEvent.capacidade?.toString() || "",
      });
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const token = await getIdToken();

      const updatedEvent = {
        ...editedEvent,
        capacidade: Number(editedEvent.capacidade) || 0,
      };

      await updateEvent(event?.id!, updatedEvent, token);
      Alert.alert("Sucesso", "Evento atualizado com sucesso!");
      setIsEditing(false);
      fetchUserEvents(event?.id!);
    } catch (err: any) {
      console.error("Erro ao atualizar evento:", err);
      Alert.alert("Erro", "Falha ao atualizar evento.");
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este evento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await getIdToken();
              await deleteEvent(event?.id!, token);
              Alert.alert("Evento excluído com sucesso!");
              router.back();
            } catch (err: any) {
              console.error("Erro ao excluir evento:", err);
              Alert.alert("Erro", "Não foi possível excluir o evento.");
            }
          },
        },
      ]
    );
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error || !event)
    return <Text style={styles.error}>{error || "Evento não encontrado"}</Text>;

  // ✅ Corrige tipo e formatação de data
  const dateString =
    typeof event.data === "string"
      ? event.data
      : (event.data as Date).toISOString();
  const [year, month, day] = dateString.split("T")[0].split("-");
  const formattedDate = `${day}/${month}/${year}`;

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

      {isEditing ? (
        <View style={{ gap: 12 }}>
          <TextInput
            value={editedEvent.nome}
            onChangeText={(text) =>
              setEditedEvent((prev) => ({ ...prev, nome: text }))
            }
            placeholder="Nome do evento"
            style={styles.input}
          />
          <TextInput
            value={editedEvent.local}
            onChangeText={(text) =>
              setEditedEvent((prev) => ({ ...prev, local: text }))
            }
            placeholder="Local"
            style={styles.input}
          />
          <TextInput
            value={editedEvent.data}
            onChangeText={(text) =>
              setEditedEvent((prev) => ({ ...prev, data: text }))
            }
            placeholder="AAAA-MM-DD"
            style={styles.input}
          />
          <TextInput
            value={editedEvent.capacidade}
            onChangeText={(text) =>
              setEditedEvent((prev) => ({ ...prev, capacidade: text }))
            }
            placeholder="Capacidade"
            keyboardType="numeric"
            style={styles.input}
          />

          <Button
            label="Salvar alterações"
            variant="primary"
            onPress={handleSaveEdit}
          />
          <Button
            label="Cancelar"
            variant="outline"
            onPress={() => setIsEditing(false)}
          />
        </View>
      ) : (
        <>
          <View style={styles.box}>
            <Text style={styles.title}>{event.nome}</Text>
            <Text style={styles.subtitle}>📍 {event.local}</Text>
            <Text style={styles.date}>🗓️ {formattedDate}</Text>
          </View>

          {/* 🔹 Apenas admin pode ver os botões de edição e exclusão */}
          {role === "admin" && (
            <View style={{ gap: 10, marginTop: 20 }}>
              <Button
                label="Editar Evento"
                variant="secondary"
                onPress={() => setIsEditing(true)}
              />
              <Button
                label="Excluir Evento"
                variant="outline"
                onPress={handleDelete}
              />
            </View>
          )}

          <View style={styles.buttonBox}>
            <Button
              label="Criar novo ingresso"
              variant="secondary"
              onPress={() => router.push(`/ticket?eventId=${event.id}`)}
            />
          </View>

          <View style={styles.buttonBox}>
            <Button
              label="Ver todos os ingressos"
              variant="outline"
              onPress={() => router.push(`/report/${event.id}`)}
            />
          </View>

          <View style={styles.buttonBox}>
            <Button
              label="Escanear ingresso"
              variant="primary"
              onPress={() => router.push(`/qrcode?eventId=${event.id}`)}
            />
          </View>
        </>
      )}
    </View>
  );
}
