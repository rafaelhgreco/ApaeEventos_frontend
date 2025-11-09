import { createPaymentIntent } from "@/services/payment_services";
import { createTicket } from "@/services/ticket_services";
import { useStripe } from "@stripe/stripe-react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "./use-auth";

interface PaymentParams {
    amount: number;
    eventId: number;
    quantity: number;
    eventName: string;
    buyerEmail: string;
    paymentMethod: string;
}

interface UsePaymentController {
    handleOpenPaymentSheet: () => Promise<void>;
    handleCreateTickets: () => Promise<void>;
    handleFetchPaymentSheetParams: () => Promise<string | null>;
    handleInitializePaymentSheet: (secret: string) => Promise<void>;
}

interface UsePaymentReturn {
    controller: UsePaymentController;
    loading: boolean;
    clientSecret: string | null;
    isSheetInitialized: boolean;
    params: PaymentParams;
    valorEmReais: string;
    paymentMethodLabel: string;
}

export const usePayment = (): UsePaymentReturn => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const router = useRouter();
    const searchParams = useLocalSearchParams();
    const navigation = useNavigation();

    const { controller: authController } = useAuth();

    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isSheetInitialized, setIsSheetInitialized] = useState(false);

    const params: PaymentParams = {
        amount: Number(searchParams.amount) || 0,
        eventId: Number(searchParams.eventId),
        quantity: Number(searchParams.quantity) || 1,
        eventName: String(searchParams.eventName),
        buyerEmail: String(searchParams.buyerEmail),
        paymentMethod: String(searchParams.paymentMethod || "credit_card"),
    };

    const getPaymentMethodLabel = (method: string): string => {
        const methods: Record<string, string> = {
            credit_card: "💳 Cartão de Crédito",
            debit_card: "💰 Cartão de Débito",
            pix: "🏦 PIX",
            boleto: "📄 Boleto Bancário",
        };
        return methods[method] || "💳 Cartão de Crédito";
    };

    const paymentMethodLabel = getPaymentMethodLabel(params.paymentMethod);
    const valorEmReais = (params.amount / 100).toFixed(2).replace(".", ",");

    useLayoutEffect(() => {
        navigation.setOptions({ title: "Pagamento" });
    }, [navigation]);

    const controller: UsePaymentController = {
        handleFetchPaymentSheetParams: async () => {
            try {
                setLoading(true);

                // Usar o controller de autenticação para obter o token
                const token = await authController.handleGetToken();

                if (!token) {
                    return null;
                }

                const data = await createPaymentIntent(
                    {
                        amount: params.amount,
                        eventId: params.eventId,
                        paymentMethod: params.paymentMethod,
                    },
                    token
                );

                const secret = data.paymentIntent.client_secret;
                setClientSecret(secret);
                return secret;
            } catch (error: any) {
                Alert.alert(
                    "Erro no Pagamento",
                    error.message ||
                        "Não foi possível iniciar o pagamento. Tente novamente."
                );
                return null;
            } finally {
                setLoading(false);
            }
        },

        handleInitializePaymentSheet: async (secret: string) => {
            try {
                const { error } = await initPaymentSheet({
                    merchantDisplayName: "APAE - Associação de Pais e Amigos",
                    paymentIntentClientSecret: secret,
                    defaultBillingDetails: {
                        name: params.buyerEmail,
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
        },

        handleOpenPaymentSheet: async () => {
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
                await controller.handleCreateTickets();
            }
        },

        handleCreateTickets: async () => {
            try {
                const token = await authController.handleGetToken();

                if (!token) {
                    return;
                }

                const payload = {
                    eventId: params.eventId,
                    buyerEmail: params.buyerEmail,
                    quantity: params.quantity,
                };

                await createTicket(payload, token);

                Alert.alert(
                    "🎉 Sucesso!",
                    `Pagamento confirmado!\n${params.quantity} ingresso(s) gerado(s) para ${params.eventName}.\n\nVerifique seus ingressos na tela principal.`,
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
        },
    };

    useEffect(() => {
        async function initPayment() {
            const secret = await controller.handleFetchPaymentSheetParams();
            if (secret) {
                await controller.handleInitializePaymentSheet(secret);
            }
        }
        initPayment();
    }, []);

    return {
        controller,
        loading,
        clientSecret,
        isSheetInitialized,
        params,
        valorEmReais,
        paymentMethodLabel,
    };
};
