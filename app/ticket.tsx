import GenericForm from "@/components/ATOMIC/molecules/form";
import { getCurrentUserEmail, getIdToken } from "@/lib/cognito";
import { getUserEvents } from "@/services/event_services";
import { createTicket } from "@/services/ticket_services";
import { FormField } from "@/types/molecules";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { styles } from "./styles/ticket.style";

export default function TicketsScreen() {
  const [formData, setFormData] = useState({
    eventId: "",
    quantity: "1",
  });
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const { eventId } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Comprar Ingresso" });
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
      console.error("❌ Erro ao buscar evento:", error);
      Alert.alert("Erro", "Não foi possível carregar detalhes do evento.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = async () => {
    setProcessing(true);
    try {
      const token = await getIdToken();
      const buyerEmail = await getCurrentUserEmail();

      if (!token || !buyerEmail) {
        Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
        return;
      }

      const payload = {
        eventId: Number(
          Array.isArray(formData.eventId)
            ? formData.eventId[0]
            : formData.eventId
        ),
        buyerEmail,
        quantity: Number(formData.quantity) || 1,
      };

      console.log("📦 Payload enviado:", payload);

      console.log("📤 Enviando para API:", JSON.stringify(payload, null, 2));

      const response = await createTicket(payload, token);

      Alert.alert(
        "✅ Ingresso Gerado!",
        `Foram gerados ${payload.quantity} ingresso(s).\nCódigo: ${
          response.tickets?.[0]?.code || response.code
        }\n\nAcesse seus ingressos para visualizar o QR Code.`
      );

      setFormData({ eventId: "", quantity: "1" });
    } catch (error: any) {
      console.error("❌ Erro ao gerar ticket:", error);
      Alert.alert(
        "Erro",
        error?.response?.data?.error || "Falha ao gerar ingresso."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando evento...</Text>
      </View>
    );

  const ticketPrice = Number(event?.ticket_price || 0);
  const quantity = Number(formData.quantity) || 1;
  const total = (ticketPrice * quantity).toFixed(2);

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
      type: "button",
      key: "submit",
      props: {
        label: processing ? "Gerando..." : "Confirmar Compra",
        onPress: submitForm,
        variant: "primary",
        containerStyle: { marginTop: 16 },
        loading: processing,
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
          💰 Valor Unitário:{" "}
          <Text style={styles.priceValue}>R$ {ticketPrice.toFixed(2)}</Text>
        </Text>
        <Text style={styles.totalText}>
          🧾 Total: <Text style={styles.totalValue}>R$ {total}</Text>
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
