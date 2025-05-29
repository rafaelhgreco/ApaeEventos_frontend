import { getUserEvents } from "@/services/event_services";
import auth from "@react-native-firebase/auth";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import Button from "../../components/ATOMIC/atoms/button";
import { Event } from "../../src/domain/events";
import styles from "../styles/eventId.style";

export default function EventDetailsPage() {
    const { eventId } = useLocalSearchParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

            const eventos = await getUserEvents(token);
            const eventoEncontrado = eventos.find(
                (e: { id: string }) => e.id === id
            );

            if (!eventoEncontrado) {
                setError("Evento não encontrado.");
                return;
            }

            setEvent(eventoEncontrado);
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
        return (
            <Text style={styles.error}>{error || "Evento não encontrado"}</Text>
        );

    function handleManageTickets() {
        // Implementar lógica para gerenciar ingressos
        Alert.alert(
            "Gerenciar ingressos",
            "Funcionalidade em desenvolvimento."
        );
    }

    const formattedDate = new Date(event.data).toLocaleDateString("pt-BR");

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>{event.nome}</Text>
                <Text style={styles.subtitle}>📍 {event.local}</Text>
                <Text style={styles.date}>🗓️ {formattedDate}</Text>
            </View>
            <Button
                label="Gerenciar ingressos"
                variant="secondary"
                onPress={handleManageTickets}
            />
        </View>
    );
}
