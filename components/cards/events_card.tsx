import { getIdToken, userPool } from "@/lib/cognito";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import { useEvents } from "../../hooks/useEvents";
import Button from "../ATOMIC/atoms/button";
import { styles } from "./event_card.style";
import { EventItem } from "./event_item";

export default function EventsCard() {
    const { events, fetchEvents, loading, error } = useEvents();
    const router = useRouter();

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
                } catch (err) {
                    console.error("Erro ao carregar eventos:", err);
                }
            };

            loadEvents();
        }, [fetchEvents])
    );

    return (
        <View style={styles.container}>
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
                            {/* 🔥 Banner do evento */}
                            {event.bannerUrl ? (
                                <Image
                                    source={{ uri: event.bannerUrl }}
                                    style={styles.banner}
                                    resizeMode="cover"
                                />
                            ) : null}

                            {/* Nome, data, local */}
                            <EventItem event={event} />

                            {/* Info inferior */}
                            <View style={styles.infoBox}>
                                <Text style={styles.infoText}>
                                    🎟️ {event.sold_count || 0} /{" "}
                                    {event.capacity || 0} ingressos vendidos
                                </Text>
                                <Text style={styles.infoText}>
                                    💰 R${" "}
                                    {Number(event.ticket_price || 0).toFixed(2)}
                                </Text>
                            </View>

                            <View style={styles.buttonViewDetails}>
                                <Button
                                    label="Ver Detalhes"
                                    variant="outline"
                                    size="small"
                                    onPress={() =>
                                        router.push(`/event/${event.id}`)
                                    }
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
            )}

            <View style={styles.linkContainer}>
                <TouchableOpacity
                    onPress={() => router.push("/list_all_events")}
                    style={styles.linkBox}
                >
                    <Text style={styles.link}>Ver todos os eventos 👉</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
