import { getIdToken, userPool } from "@/lib/cognito";
import { createPaymentIntent } from "@/services/payment_services";
import { createTicket } from "@/services/ticket_services";
import { useStripe } from "@stripe/stripe-react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    SafeAreaView,
    Text,
    View,
} from "react-native";
import { styles } from "./styles/payment.style";
import { colors } from "./styles/themes";

export default function PaymentScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const router = useRouter();
    const params = useLocalSearchParams();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ title: "Pagamento" });
    }, [navigation]);

    const amount = Number(params.amount) || 0;
    const eventId = Number(params.eventId);
    const quantity = Number(params.quantity) || 1;
    const eventName = String(params.eventName);
    const buyerEmail = String(params.buyerEmail);
    const paymentMethod = String(params.paymentMethod || "credit_card");

    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isSheetInitialized, setIsSheetInitialized] = useState(false);

    const getPaymentMethodLabel = (method: string) => {
        const methods: Record<string, string> = {
            credit_card: "💳 Cartão de Crédito",
            debit_card: "💰 Cartão de Débito",
            pix: "🏦 PIX",
            boleto: "📄 Boleto Bancário",
        };
        return methods[method] || "💳 Cartão de Crédito";
    };

    const fetchPaymentSheetParams = async () => {
        try {
            setLoading(true);

            const user = userPool.getCurrentUser();

            if (!user) {
                Alert.alert(
                    "Erro de Autenticação",
                    "Você precisa estar logado para realizar pagamentos."
                );
                router.replace("/");
                return null;
            }

            const token = await getIdToken();

            const data = await createPaymentIntent(
                {
                    amount,
                    eventId,
                    paymentMethod,
                },
                token
            );

            const secret = data.paymentIntent.client_secret;
            setClientSecret(secret);
            return secret;
        } catch (error: any) {
            if (
                error.name === "AuthenticationError" ||
                error.message === "Sessão expirada" ||
                error.message === "Nenhum usuário autenticado."
            ) {
                Alert.alert(
                    "Sessão Expirada",
                    "Sua sessão expirou. Por favor, faça login novamente.",
                    [
                        {
                            text: "OK",
                            onPress: () => router.replace("/"),
                        },
                    ]
                );
            } else {
                Alert.alert(
                    "Erro no Pagamento",
                    error.message ||
                        "Não foi possível iniciar o pagamento. Tente novamente."
                );
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    const initializePaymentSheet = async (secret: string) => {
        try {
            const { error } = await initPaymentSheet({
                merchantDisplayName: "APAE - Associação de Pais e Amigos",
                paymentIntentClientSecret: secret,
                defaultBillingDetails: {
                    name: buyerEmail,
                },
                allowsDelayedPaymentMethods: false,
            });

            if (error) {
                Alert.alert(
                    "Erro na Inicialização",
                    `Código: ${error.code}\n${error.message}`
                );
                setIsSheetInitialized(false);
            } else {
                setIsSheetInitialized(true);
            }
        } catch (error: any) {
            Alert.alert("Erro", "Falha ao preparar o pagamento.");
            setIsSheetInitialized(false);
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
            if (error.code === "Canceled") {
                Alert.alert(
                    "Cancelado",
                    "O pagamento foi cancelado. Você pode tentar novamente."
                );
            } else {
                Alert.alert(
                    "Erro no Pagamento",
                    `Código: ${error.code}\n${error.message}`
                );
            }
        } else {
            await handleCreateTickets();
        }
    };

    const handleCreateTickets = async () => {
        try {
            const token = await getIdToken();

            const payload = {
                eventId: eventId,
                buyerEmail: buyerEmail,
                quantity: quantity,
            };

            await createTicket(payload, token);

            Alert.alert(
                "🎉 Sucesso!",
                `Pagamento confirmado!\n${quantity} ingresso(s) gerado(s) para ${eventName}.\n\nVerifique seus ingressos na tela principal.`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.replace("/user_events");
                        },
                    },
                ]
            );
        } catch (error: any) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Erro desconhecido";

            Alert.alert(
                "Atenção",
                `Pagamento aprovado, mas houve erro ao gerar os ingressos.\n\nDetalhes: ${errorMessage}\n\nEntre em contato com o suporte.`,
                [
                    {
                        text: "OK",
                        onPress: () => router.back(),
                    },
                ]
            );
        }
    };

    const valorEmReais = (amount / 100).toFixed(2).replace(".", ",");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Pagamento Seguro</Text>

                <View style={styles.eventInfo}>
                    <Text style={styles.eventName}>📅 {eventName}</Text>
                    <Text style={styles.quantityText}>
                        🎫 Quantidade: {quantity} ingresso(s)
                    </Text>
                    <Text style={styles.paymentMethodText}>
                        {getPaymentMethodLabel(paymentMethod)}
                    </Text>
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.label}>Valor Total a Pagar:</Text>
                    <Text style={styles.valor}>R$ {valorEmReais}</Text>
                </View>

                {!isSheetInitialized && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />
                        <Text style={styles.loadingText}>
                            Preparando pagamento seguro...
                        </Text>
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <Button
                        title={loading ? "Processando..." : "Pagar Agora"}
                        onPress={openPaymentSheet}
                        disabled={
                            !clientSecret || !isSheetInitialized || loading
                        }
                        color={colors.button}
                    />
                </View>

                <Text style={styles.disclaimer}>
                    🔒 Pagamento processado com segurança via Stripe
                </Text>
            </View>
        </SafeAreaView>
    );
}
