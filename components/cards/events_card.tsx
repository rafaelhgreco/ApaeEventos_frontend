import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
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
                const token = "await auth().currentUser?.getIdToken();";
                if (!token) {
                    Alert.alert("Erro", "Usuário não autenticado.");
                    return;
                }

                await fetchEvents(token);
            };

            loadEvents();
        }, [])
    );

    function handleCreateNewEvent(): void {
        router.push("/new_event");
    }

    function handleValidateTicket(): void {
        router.push("/qrcode");
    }

    function handleDashboard(): void {
        router.push("/dashboard");
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Próximos Eventos</Text>
                <ScrollView style={styles.scrollView}>
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : events.length === 0 ? (
                        <Text style={styles.title}>
                            Nenhum evento encontrado
                        </Text>
                    ) : (
                        events.map((event) => (
                            <View style={styles.eventItem} key={event.id}>
                                <EventItem event={event} />
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
                            onPress={() => router.push("/register")}
                            containerStyle={styles.actionButton}
                            textStyle={styles.actionButtonText}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
