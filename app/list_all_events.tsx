import SearchInput from "@/components/ATOMIC/atoms/search_input";
import { EventItem } from "@/components/cards/event_item";
import { getUserEvents } from "@/services/event_services";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Event } from "../src/domain/events";

type RootStackParamList = {
    EventDetails: { eventId: number };
};

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");
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

    const filteredEvents = events.filter((event) =>
        event.nome.toLowerCase().includes(search.toLowerCase())
    );

    const handleEventPress = (eventId: number) => {
        router.push(`/event/${eventId}`);
    };

    if (loading)
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    if (error) return <Text style={styles.error}>{error}</Text>;

    return (
        <View style={styles.container}>
            <View style={{ padding: 16 }}>
                <SearchInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Buscar eventos por nome..."
                />
            </View>
            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleEventPress(item.id)}
                    >
                        <EventItem event={item} />
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginTop: 40,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});
