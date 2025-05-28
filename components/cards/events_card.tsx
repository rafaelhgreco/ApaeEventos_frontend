import { getUserEvents } from "@/services/event_services";
import { border, colors } from "@/styles/themes";
import auth from "@react-native-firebase/auth";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Event } from "../../src/domain/events";
import Button from "../ATOMIC/atoms/button";
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

    useEffect(() => {
        fetchUserEvents();
    }, []);

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
                        <EventItem key={event.id} event={event} />
                    ))}
                </ScrollView>
                <View>
                    <Link href="/explore" style={styles.linkBox}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: Dimensions.get("window").height * 0.3,
        width: 350,
        maxHeight: 250,
        backgroundColor: "#fff",
        borderRadius: border.radiusLarge,
    },
    actionsBox: {
        marginTop: 10,
        flex: 1,
        padding: 20,
        width: 350,
        maxHeight: 250,
        borderRadius: border.radiusLarge,
    },
    buttonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: "48%",
        marginBottom: 10,
        minHeight: 100,
    },
    button: {
        width: "100%",
        height: 100,
        borderRadius: border.radiusMedium,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    buttonEvent: {
        backgroundColor: "green",
    },
    buttonDashboard: {
        backgroundColor: "orange",
    },
    buttonReports: {
        backgroundColor: "gray",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
    link: {
        fontSize: 16,
        fontWeight: "bold",
        color: "green",
        textDecorationLine: "underline",
    },
    linkBox: {
        padding: 10,
        alignSelf: "flex-end",
    },
});
