import auth from "@react-native-firebase/auth";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
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
                const token = await auth().currentUser?.getIdToken();
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

    function handleClick(): void {
        console.log("Button clicked!");
    }

    if (loading) {
        return (
            <View>
                <Text>Carregando eventos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Erro ao carregar eventos: {error}</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Próximos Eventos</Text>
                <ScrollView style={styles.scrollView}>
                    {events.map((event) => (
                        <View style={styles.eventItem} key={event.id}>
                            <EventItem key={event.id} event={event} />
                        </View>
                    ))}
                </ScrollView>
                <View>
                    <Link href="/list_all_events" style={styles.linkBox}>
                        <Text style={styles.link}>Ver todos os eventos</Text>
                    </Link>
                </View>
            </View>

            <View style={styles.actionsBox}>
                <Text style={styles.title}>Ações 👇</Text>
                <View style={styles.buttonRow}>
                    <View style={styles.buttonContainer}>
                        <Button
                            label="Cadastrar Evento"
                            variant="primary"
                            onPress={handleCreateNewEvent}
                            containerStyle={[styles.button, styles.buttonEvent]}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label="Validar Ingresso"
                            variant="primary"
                            onPress={handleValidateTicket}
                            containerStyle={styles.button}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label="Dashboard"
                            variant="primary"
                            onPress={handleClick}
                            containerStyle={[
                                styles.button,
                                styles.buttonDashboard,
                            ]}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            label="Relatórios"
                            variant="primary"
                            onPress={handleClick}
                            containerStyle={[
                                styles.button,
                                styles.buttonReports,
                            ]}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.title}>Gerenciar usuários</Text>
                    <Button
                        label="Cadastrar um novo usuário"
                        onPress={() => router.push("/register")}
                        variant="outline"
                    ></Button>
                </View>
            </View>
        </View>
    );
}
