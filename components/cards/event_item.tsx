import { Event } from "@/src/domain/events";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./event_item.style";

export const EventItem: React.FC<{ event: Event }> = ({ event }) => {
    return (
        <View style={styles.eventItem}>
            <Text style={styles.eventName}>{event.nome}</Text>
            <Text style={styles.eventData}>
                Data:{" "}
                {format(event.data, "dd 'de' MMMM 'de' yyyy, HH:mm", {
                    locale: ptBR,
                })}
            </Text>
            <Text style={styles.eventLocal}>Local: {event.local}</Text>
        </View>
    );
};
