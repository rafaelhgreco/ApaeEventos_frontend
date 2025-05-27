// import { useEventStore } from "@/stores/event_store";

// import { useEventStore } from "@/src/infrastructure/stores/event_store";
import { useEventStore } from "@/src/infrastructure/stores/event_store";
import { border, colors } from "@/styles/themes";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../ATOMIC/atoms/button";
import { EventItem } from "./event_item";

export default function EventsCard() {
    const { events, loading, fetchEvents } = useEventStore();
    const router = useRouter();

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    if (loading) {
        return (
            <View>
                <Text>Carregando eventos...</Text>
            </View>
        );
    }

    function handleCreateNewEvent(): void {
        router.push("/new_event");
    }

    function handleClick(): void {
        // Placeholder for future actions
        console.log("Button clicked!");
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
