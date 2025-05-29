import { getUserEvents } from "@/services/event_services";
import auth from "@react-native-firebase/auth";
import { Link, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Event } from "../../src/domain/events";
import Button from "../ATOMIC/atoms/button";
import { styles } from "./event_card.style";
import { EventItem } from "./event_item";

export default function EventsCard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserEvents = async () => {
        try {
            const token = await auth().currentUser?.getIdToken();
            if (!token) {
                Alert.alert("Erro", "Usuário não autenticado.");
                return;
            }

            const eventos = await getUserEvents(token);
            setEvents(eventos);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            Alert.alert("Erro", "Não foi possível carregar os eventos.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserEvents();
        }, [])
    );

    function handleCreateNewEvent(): void {
        router.push("/new_event");
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
                            onPress={handleClick}
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
            </View>
        </View>
    );
}
