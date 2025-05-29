import SearchInput from "@/components/ATOMIC/atoms/search_input";
import { EventItem } from "@/components/cards/event_item";
import { useEvents } from "@/hooks/useEvents";
import auth from "@react-native-firebase/auth";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles/list_all_events.style";

type RootStackParamList = {
    EventDetails: { eventId: number };
};

export default function EventsPage() {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { events, fetchEvents, loading, error } = useEvents();

    // const fetchUserEvents = async () => {
    //     try {
    //         const token = await auth().currentUser?.getIdToken();
    //         if (!token) {
    //             Alert.alert("Erro", "Usuário não autenticado.");
    //             return;
    //         }

    //         const eventos = await getUserEvents(token);
    //         setEvents(eventos);
    //     } catch (error) {
    //         console.error("Erro ao buscar eventos:", error);
    //         Alert.alert("Erro", "Não foi possível carregar os eventos.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserEvents();
    // }, []);

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
