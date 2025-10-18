import Button from "@/components/ATOMIC/atoms/button";
import EventsCard from "@/components/cards/events_card";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, Animated, Dimensions, View } from "react-native";
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
                    variant="primary"
                    size="small"
                    onPress={handleSignOut}
                    loading={loading}
                />
            ),
        });
    }, [navigation]);

    const handleSignOut = async () => {
        setLoading(true);
        setError(null);
        Alert.alert("Sucesso", "Logout realizado com sucesso!");
    };

    return (
        <Animated.ScrollView
            contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
        >
            <View style={styles.innerContainer}>
                <EventsCard />
            </View>
        </Animated.ScrollView>
    );
}
