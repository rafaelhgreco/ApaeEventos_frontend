import Button from "@/components/ATOMIC/atoms/button";
import EventsCard from "@/components/cards/events_card";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Alert, Animated, Text, View } from "react-native";
import { styles } from "./styles/management.style";

export default function ManagementScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

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
}, []);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                bounciness: 6,
                speed: 1.2,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleSignOut = async () => {
        setLoading(true);
        router.push("/");
        Alert.alert("Sucesso", "Logout realizado com sucesso!");
    };

    return (
        <Animated.ScrollView
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
            }}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Seção 1 — Próximos Eventos */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Próximos Eventos</Text>
                <EventsCard />
            </View>

            {/* Seção 2 — Ações Rápidas */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ações Rápidas</Text>

                <View style={styles.quickActionsGrid}>
                    <Button
                        label="Cadastrar Evento"
                        variant="secondary"
                        onPress={() => router.push("/new_event")}
                    />
                    <Button
                        label="Validar Ingresso"
                        variant="secondary"
                        onPress={() => router.push("/qrcode")}
                    />
                    <Button
                        label="Dashboard"
                        variant="secondary"
                        onPress={() => router.push("/dashboard")}
                    />
                    <Button
                        label="Registrar Usuário"
                        variant="secondary"
                        onPress={() => router.push("/admin_register")}
                    />
                </View>
            </View>
        </Animated.ScrollView>
    );
}
