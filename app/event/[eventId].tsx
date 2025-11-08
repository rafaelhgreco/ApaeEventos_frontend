import { getIdToken, getUserRole } from "@/lib/cognito";
import {
    deleteEvent,
    getUserEvents,
    updateEvent,
} from "@/services/event_services";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    ScrollView,
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

    // Estados do formulário
    const [editedEvent, setEditedEvent] = useState({
        nome: "",
        local: "",
        data: new Date(),
        starts_at: new Date(),
        capacity: "",
        ticket_price: "",
        status: "published" as Event["status"],
    });

    const [showPicker, setShowPicker] = useState({
        date: false,
        time: false,
    });

    useLayoutEffect(() => {
        navigation.setOptions({ title: "Detalhes do evento" });
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
            const findEvent = eventsData.find(
                (e: { id: number }) => e.id === id
            );

            if (!findEvent) {
                setError("Evento não encontrado.");
                return;
            }

            setEvent(findEvent);
            setEditedEvent({
                nome: findEvent.nome,
                local: findEvent.local,
                data: new Date(findEvent.data),
                starts_at: findEvent.starts_at
                    ? new Date(findEvent.starts_at)
                    : new Date(),
                capacity: findEvent.capacity?.toString() || "",
                ticket_price: findEvent.ticket_price?.toString() || "",
                status: findEvent.status || "published",
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
                nome: editedEvent.nome,
                local: editedEvent.local,
                data: editedEvent.data.toISOString().split("T")[0],
                starts_at: editedEvent.starts_at.toISOString(),
                capacity: Number(editedEvent.capacity) || 0,
                ticket_price: Number(editedEvent.ticket_price) || 0,
                status: editedEvent.status,
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
            "Tem certeza que deseja excluir este evento? Essa ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
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
                            Alert.alert(
                                "Erro",
                                "Não foi possível excluir o evento."
                            );
                        }
                    },
                },
            ]
        );
    };

    if (loading)
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    if (error || !event)
        return (
            <Text style={styles.error}>{error || "Evento não encontrado"}</Text>
        );

    // 🧭 Formatação de data no modo visualização
    const formattedDate = new Date(event.data).toLocaleDateString("pt-BR");
    const formattedTime = event.starts_at
        ? new Date(event.starts_at).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "—";

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                <View style={{ gap: 16 }}>
                    <Text style={styles.label}>Nome do Evento</Text>
                    <TextInput
                        value={editedEvent.nome}
                        onChangeText={(text) =>
                            setEditedEvent((prev) => ({ ...prev, nome: text }))
                        }
                        style={styles.input}
                    />

                    <Text style={styles.label}>Local</Text>
                    <TextInput
                        value={editedEvent.local}
                        onChangeText={(text) =>
                            setEditedEvent((prev) => ({ ...prev, local: text }))
                        }
                        style={styles.input}
                    />

                    <Text style={styles.label}>Data do Evento</Text>
                    <Button
                        label={editedEvent.data.toLocaleDateString("pt-BR")}
                        variant="outline"
                        onPress={() =>
                            setShowPicker((prev) => ({
                                ...prev,
                                date: !prev.date,
                            }))
                        }
                    />
                    {showPicker.date && (
                        <DateTimePicker
                            value={editedEvent.data}
                            mode="date"
                            display={
                                Platform.OS === "ios" ? "spinner" : "default"
                            }
                            onChange={(_, selectedDate) => {
                                if (selectedDate) {
                                    setEditedEvent((prev) => ({
                                        ...prev,
                                        data: selectedDate,
                                    }));
                                }
                                setShowPicker((prev) => ({
                                    ...prev,
                                    date: false,
                                }));
                            }}
                        />
                    )}

                    <Text style={styles.label}>Horário de Início</Text>
                    <Button
                        label={editedEvent.starts_at.toLocaleTimeString(
                            "pt-BR",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}
                        variant="outline"
                        onPress={() =>
                            setShowPicker((prev) => ({
                                ...prev,
                                time: !prev.time,
                            }))
                        }
                    />
                    {showPicker.time && (
                        <DateTimePicker
                            value={editedEvent.starts_at}
                            mode="time"
                            is24Hour={true}
                            display={
                                Platform.OS === "ios" ? "spinner" : "default"
                            }
                            onChange={(_, selectedTime) => {
                                if (selectedTime) {
                                    setEditedEvent((prev) => ({
                                        ...prev,
                                        starts_at: selectedTime,
                                    }));
                                }
                                setShowPicker((prev) => ({
                                    ...prev,
                                    time: false,
                                }));
                            }}
                        />
                    )}

                    <Text style={styles.label}>Capacidade</Text>
                    <TextInput
                        value={editedEvent.capacity}
                        onChangeText={(text) =>
                            setEditedEvent((prev) => ({
                                ...prev,
                                capacity: text,
                            }))
                        }
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Preço do Ingresso (R$)</Text>
                    <TextInput
                        value={editedEvent.ticket_price}
                        onChangeText={(text) =>
                            setEditedEvent((prev) => ({
                                ...prev,
                                ticket_price: text,
                            }))
                        }
                        keyboardType="decimal-pad"
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
                        <Text style={styles.date}>🕓 {formattedTime}</Text>
                        <Text style={styles.date}>
                            🎟️ Capacidade: {event.capacity}
                        </Text>
                        <Text style={styles.date}>
                            💰 Preço: R${" "}
                            {Number(event.ticket_price || 0).toFixed(2)}
                        </Text>
                        <Text style={styles.date}>
                            🔄 Status:{" "}
                            {event.status === "published"
                                ? "Publicado"
                                : event.status === "draft"
                                ? "Rascunho"
                                : event.status === "canceled"
                                ? "Cancelado"
                                : "Finalizado"}
                        </Text>
                        <Text style={styles.date}>
                            ✅ Vendidos: {event.sold_count || 0} /{" "}
                            {event.capacity || 0}
                        </Text>
                        <Text style={styles.date}>
                            💵 Receita Estimada: R${" "}
                            {(
                                Number(event.ticket_price || 0) *
                                Number(event.sold_count || 0)
                            ).toFixed(2)}
                        </Text>
                    </View>

                    {role === "admin" && (
                        <>
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
                                <Button
                                    label="Escanear ingresso"
                                    variant="primary"
                                    onPress={() =>
                                        router.push(
                                            `/qrcode?eventId=${event.id}`
                                        )
                                    }
                                />
                            </View>
                        </>
                    )}

                    {role === "default" && (
                        <View style={styles.buttonBox}>
                            <Button
                                label="Comprar Ingressos"
                                variant="secondary"
                                onPress={() =>
                                    router.push(`/ticket?eventId=${event.id}`)
                                }
                            />
                        </View>
                    )}

                    <View style={styles.buttonBox}>
                        <Button
                            label="Ver todos os ingressos"
                            variant="outline"
                            onPress={() => router.push(`/my_tickets`)}
                        />
                    </View>
                </>
            )}
        </ScrollView>
    );
}
