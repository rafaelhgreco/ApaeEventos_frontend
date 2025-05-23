// import { useEventStore } from "@/stores/event_store";

import { useEventStore } from "@/src/infrastructure/stores/event_store";
import { colors } from "@/styles/themes";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { EventItem } from "./event_item";

export default function EventsCard() {
    const { events, loading, fetchEvents } = useEventStore();

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

    function handleClick(): void {
        console.log("Cadastrar Evento");
        // Implementar a lógica para cadastrar um evento
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
                {/* <Link href="/register" style={styles.linkBox}>
                    <Text style={styles.link}>Ver todos os eventos</Text>
                </Link> */}
            </View>
            <View>
                {/* <View style={styles.actionsBox}>
                    <SubmitButton
                        label="Cadastrar Evento"
                        onClick={handleClick}
                    ></SubmitButton>
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.button,
    },
    // eventsBox: {
    //     height: Dimensions.get("window").height * 0.3,
    //     width: 400,
    // },
    actionsBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: 200,
        height: 200,
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
    eventItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    eventName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    eventData: {
        fontSize: 14,
        color: "#777",
    },
    eventLocal: {
        fontSize: 14,
        color: "#777",
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
