import EventsCard from "@/components/cards/events_card";
import { colors, paddings } from "@/styles/themes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ManagementScreen() {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Bem-vindo ao Gerenciador de Eventos
                </Text>
                <EventsCard />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: paddings.extraLarge,
    },

    error: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
    },
    greetingContainer: {
        marginTop: 20,
    },
    greeting: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFF8",
    },
    text: {
        fontSize: 20,
        color: colors.primary,
        marginBottom: 20,
        fontWeight: "semibold",
    },
});
