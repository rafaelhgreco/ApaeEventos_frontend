import GenericForm from "@/components/ATOMIC/molecules/form";
import { getCurrentUserEmail, getIdToken } from "@/lib/cognito";
import { getUserEvents } from "@/services/event_services";
import { FormField } from "@/types/molecules";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { styles } from "./styles/ticket.style";

export default function TicketsScreen() {
    const [formData, setFormData] = useState({
        eventId: "",
        quantity: "1",
        paymentMethod: "credit_card", // Método padrão
    });
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const { eventId } = useLocalSearchParams();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ title: "Carrinho" });
    }, [navigation]);

    useEffect(() => {
        if (eventId) {
            setFormData((prev) => ({ ...prev, eventId: String(eventId) }));
            fetchEventDetails(eventId);
        }
    }, [eventId]);

    const fetchEventDetails = async (id: string | string[]) => {
        try {
            const token = await getIdToken();
            const events = await getUserEvents(token);
            const found = events.find((e: any) => e.id === Number(id));
            setEvent(found || null);
        } catch (error) {
            Alert.alert(
                "Erro",
                "Não foi possível carregar detalhes do evento."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleProceedToPayment = async () => {
        try {
            const buyerEmail = await getCurrentUserEmail();

            if (!buyerEmail) {
                Alert.alert(
                    "Erro",
                    "Usuário não autenticado. Faça login novamente."
                );
                router.replace("/");
                return;
            }

            const quantity = Number(formData.quantity);

            if (quantity < 1) {
                Alert.alert("Erro", "A quantidade deve ser maior que zero.");
                return;
            }

            if (!formData.paymentMethod) {
                Alert.alert("Erro", "Selecione um método de pagamento.");
                return;
            }

            const ticketPrice = Number(event?.ticket_price || 0);
            const totalInReais = ticketPrice * quantity;
            const totalInCents = Math.round(totalInReais * 100);

            router.push({
                pathname: "/payment",
                params: {
                    amount: totalInCents,
                    eventId: formData.eventId,
                    quantity: quantity,
                    eventName: event?.nome,
                    buyerEmail: buyerEmail,
                    paymentMethod: formData.paymentMethod,
                },
            });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível processar a compra.");
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Carregando evento...</Text>
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Evento não encontrado</Text>
            </View>
        );
    }

    const ticketPrice = Number(event?.ticket_price || 0);
    const quantity = Number(formData.quantity) || 1;
    const total = (ticketPrice * quantity).toFixed(2);

    const paymentMethods = [
        { label: "💳 Cartão de Crédito", value: "credit_card" },
        // You can add more payment methods here
    ];

    const formFields: FormField[] = [
        {
            type: "input",
            key: "quantity",
            props: {
                label: "Quantidade de ingressos",
                placeholder: "Ex: 1",
                keyboardType: "numeric",
                value: formData.quantity,
                onChangeText: handleInputChange("quantity"),
            },
        },
        {
            type: "select",
            key: "paymentMethod",
            props: {
                label: "Método de Pagamento",
                placeholder: "Selecione o método de pagamento",
                value: formData.paymentMethod,
                options: paymentMethods,
                onValueChange: handleInputChange("paymentMethod"),
            },
        },
        {
            type: "button",
            key: "submit",
            props: {
                label: "Ir para Pagamento",
                onPress: handleProceedToPayment,
                variant: "primary",
                containerStyle: { marginTop: 16 },
            },
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.eventCard}>
                <Text style={styles.eventTitle}>{event?.nome}</Text>
                <Text style={styles.eventSubtitle}>📍 {event?.local}</Text>
                <Text style={styles.eventDate}>
                    🗓️ {new Date(event?.data).toLocaleDateString("pt-BR")}
                </Text>
            </View>

            <View style={styles.priceBox}>
                <Text style={styles.priceText}>
                    Valor Unitário:{" "}
                    <Text style={styles.priceValue}>
                        R$ {ticketPrice.toFixed(2)}
                    </Text>
                </Text>
                <Text style={styles.totalText}>
                    Total: <Text style={styles.totalValue}>R$ {total}</Text>
                </Text>
            </View>

            <GenericForm
                title="Finalize sua compra"
                fields={formFields}
                titleStyle={styles.formTitle}
            />
        </ScrollView>
    );
}
