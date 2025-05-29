import EventsCard from "@/components/cards/events_card";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles/management.style";

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
