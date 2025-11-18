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
<View style={styles.actionItem}>
    <Button
        label="Cadastrar Evento"
        variant="dark"
        containerStyle={{ width: "100%", height: 60}}
        onPress={() => router.push("/new_event")}
    />
</View>

<View style={styles.actionItem}>
    <Button
        label="Validar Ingresso"
        variant="dark"
        containerStyle={{ width: "100%", height: 60 }}
        onPress={() => router.push("/qrcode")}
    />
</View>

<View style={styles.actionItem}>
    <Button
        label="Dashboard"
        variant="dark"
        containerStyle={{ width: "100%", height: 60 }}
        onPress={() => router.push("/dashboard")}
    />
</View>

<View style={styles.actionItem}>
    <Button
        label="Registrar Usuário"
        variant="dark"
        containerStyle={{ width: "100%", height: 60}}
        onPress={() => router.push("/admin_register")}
    />
</View>
</View>
            </View>
        </Animated.ScrollView>
    );
}
