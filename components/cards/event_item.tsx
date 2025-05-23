import { paddings } from "@/styles/themes";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
interface Event {
    id: number;
    name: string;
    date: Date;
    location: string;
}

export const EventItem: React.FC<{ event: Event }> = ({ event }) => {
    return (
        <View style={styles.eventItem}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventData}>
                Data:{" "}
                {format(event.date, "dd 'de' MMMM 'de' yyyy, HH:mm", {
                    locale: ptBR,
                })}
            </Text>
            <Text style={styles.eventLocal}>Local: {event.location}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    eventsBox: {
        height: Dimensions.get("window").height * 0.3,
        width: 400,
    },
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
        color: "#333",
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
    eventItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        padding: paddings.small,
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
