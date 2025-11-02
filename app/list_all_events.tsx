import SearchInput from "@/components/ATOMIC/atoms/search_input";
import { EventItem } from "@/components/cards/event_item";
import { getIdToken, userPool } from "@/lib/cognito";
import { getUserEvents } from "@/services/event_services";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Event } from "../src/domain/events";
import { styles } from "./styles/list_all_events.style";

export default function EventsPage() {
    const [search, setSearch] = useState("");
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Todos os eventos",
        });
    }, [navigation]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);

            const user = userPool.getCurrentUser();

            if (!user) {
                Alert.alert(
                    "Erro",
                    "Usuário não autenticado. Faça login novamente."
                );
                router.replace("../login");
                return;
            }

            const token = await getIdToken();
            const eventsData = await getUserEvents(token);

            setEvents(eventsData);
        } catch (error: any) {
            const errorMessage = error.message || "Erro ao carregar eventos";
            setError(errorMessage);

            if (
                error.name === "AuthenticationError" ||
                error === "Nenhum usuário autenticado."
            ) {
                Alert.alert(
                    "Sessão expirada",
                    "Sua sessão expirou. Por favor, faça login novamente.",
                    [
                        {
                            text: "OK",
                            onPress: () => router.replace("../login"),
                        },
                    ]
                );
            } else {
                Alert.alert("Erro", errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = events.filter((event) =>
        event.nome.toLowerCase().includes(search.toLowerCase())
    );

    const handleEventPress = (eventId: number) => {
        router.push(`/event/${eventId}`);
    };

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

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
