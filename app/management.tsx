import Button from "@/components/ATOMIC/atoms/button";
import EventsCard from "@/components/cards/events_card";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import { styles } from "./styles/management.style";

export default function ManagementScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { height } = Dimensions.get("window");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Gerenciador de Eventos",
            headerRight: () => (
                <Button
                    label="Logout"
                    variant="outline"
                    size="small"
                    loading={loading}
                />
            ),
        });
    }, [navigation]);

    return (
        <Animated.ScrollView
            contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.text}>
                    Bem-vindo ao Gerenciador de Eventos
                </Text>
                <EventsCard />
            </View>
        </Animated.ScrollView>
    );
}
