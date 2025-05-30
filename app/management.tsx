import Button from "@/components/ATOMIC/atoms/button";
import EventsCard from "@/components/cards/events_card";
import { getFirebaseAuth } from "@/firebase/firebase";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { styles } from "./styles/management.style";

export default function ManagementScreen() {
    const navigation = useNavigation();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    label="Logout"
                    variant="outline"
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
        const auth: FirebaseAuthTypes.Module = getFirebaseAuth();
        try {
            await auth.signOut();
            Alert.alert("Sucesso", "Logout realizado com sucesso!");
            router.push("/");
        } catch (err: any) {
            console.error("Erro ao fazer logout:", err);
            setError(err.message || "Erro ao fazer logout.");
        } finally {
            setLoading(false);
        }
    };
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
