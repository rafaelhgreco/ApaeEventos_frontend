import { API_BASE_URL } from "@env";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const VALOR_COMPRA_CENTAVOS = 1099; // R$ 10,99

export default function PaymentScreen() {
    // Este hook SÓ FUNCIONA porque o _layout.tsx
    // tem o <StripeProvider>
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isSheetInitialized, setIsSheetInitialized] = useState(false);

    const fetchPaymentSheetParams = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/create-payment-intent`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: VALOR_COMPRA_CENTAVOS }),
                }
            );
            if (!response.ok) throw new Error("Falha na resposta do servidor");

            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
            return clientSecret;
        } catch (e: any) {
            console.error("Erro ao buscar payment intent:", e);
            Alert.alert(
                "Erro",
                `Não foi possível buscar o payment intent: ${e.message}`
            );
            return null;
        }
    };

    const initializePaymentSheet = async (secret: string) => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: "Exemplo Loja Ltda.",
            paymentIntentClientSecret: secret,
        });
        if (error) {
            Alert.alert(`Erro ao inicializar: ${error.code}`, error.message);
            setIsSheetInitialized(false);
        } else {
            setIsSheetInitialized(true);
        }
    };

    useEffect(() => {
        async function initPayment() {
            const secret = await fetchPaymentSheetParams();
            if (secret) {
                await initializePaymentSheet(secret);
            }
        }
        initPayment();
    }, []);

    const openPaymentSheet = async () => {
        if (!clientSecret || !isSheetInitialized) {
            Alert.alert(
                "Aguarde",
                "O formulário de pagamento ainda está sendo preparado."
            );
            return;
        }
        setLoading(true);
        const { error } = await presentPaymentSheet();
        setLoading(false);

        if (error) {
            if (error.code !== "Canceled") {
                Alert.alert(`Erro: ${error.code}`, error.message);
            } else {
                Alert.alert("Cancelado", "Pagamento cancelado pelo usuário.");
            }
        } else {
            Alert.alert("Sucesso", "Seu pagamento foi confirmado!");
            // Aqui, você pode usar o `router` do Expo Routes
            // para navegar de volta para a Home ou para uma tela de sucesso
            // Ex: router.replace('/');
        }
    };

    const valorEmReais = (VALOR_COMPRA_CENTAVOS / 100)
        .toFixed(2)
        .replace(".", ",");

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Valor a Pagar:</Text>
            <Text style={styles.valor}>R$ {valorEmReais}</Text>
            {!isSheetInitialized && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.loadingText}>
                        Preparando pagamento seguro...
                    </Text>
                </View>
            )}
            <Button
                title={loading ? "Processando..." : "Pagar Agora"}
                onPress={openPaymentSheet}
                disabled={!clientSecret || !isSheetInitialized || loading}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    text: { fontSize: 18, color: "#333" },
    valor: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#000",
        marginVertical: 20,
    },
    loadingContainer: { marginVertical: 20, alignItems: "center" },
    loadingText: { marginTop: 10, fontSize: 16, color: "#666" },
});
