import GenericForm from '@/components/ATOMIC/molecules/form';
import { getCurrentUserEmail, getIdToken } from '@/lib/cognito';
import { getUserEvents } from '@/services/event_services';
import { FormField } from '@/types/molecules';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, View } from 'react-native';
import { colors } from '@/src/styles/themes';
import { styles } from '@/src/styles/ticket.style';

export default function TicketsScreen() {
  const [formData, setFormData] = useState({
    eventId: '',
    quantity: '1',
    paymentMethod: 'credit_card',
  });

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { eventId } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Comprar Ingressos' });
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
    } catch {
      Alert.alert('Erro', 'Falha ao carregar informações do evento.');
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
        Alert.alert('Erro', 'Sessão expirada. Faça login novamente.');
        router.replace('/');
        return;
      }

      const quantity = Number(formData.quantity);
      if (quantity < 1) {
        Alert.alert('Erro', 'A quantidade deve ser pelo menos 1.');
        return;
      }

      const ticketPrice = Number(event?.ticket_price || 0);
      const totalInCents = Math.round(ticketPrice * quantity * 100);

      router.push({
        pathname: '/payment',
        params: {
          amount: totalInCents,
          eventId: formData.eventId,
          quantity,
          eventName: event?.nome,
          buyerEmail,
          paymentMethod: formData.paymentMethod,
        },
      });
    } catch {
      Alert.alert('Erro', 'Não foi possível processar sua compra.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando evento...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Evento não encontrado.</Text>
      </View>
    );
  }

  const ticketPrice = Number(event.ticket_price);
  const quantity = Number(formData.quantity) || 1;
  const total = (ticketPrice * quantity).toFixed(2);

  const paymentMethods = [{ label: '💳 Cartão de Crédito', value: 'credit_card' }];

  const formFields: FormField[] = [
    {
      type: 'input',
      key: 'quantity',
      props: {
        label: 'Quantidade',
        placeholder: 'Ex: 1',
        keyboardType: 'numeric',
        value: formData.quantity,
        onChangeText: handleInputChange('quantity'),
      },
    },
    {
      type: 'select',
      key: 'paymentMethod',
      props: {
        title: 'Método de Pagamento',
        selectedValue: formData.paymentMethod,
        options: paymentMethods,
        onValueChange: handleInputChange('paymentMethod'),
      },
    },
    {
      type: 'button',
      key: 'submit',
      props: {
        label: 'Continuar para Pagamento',
        onPress: handleProceedToPayment,
        variant: 'primary',
        containerStyle: { marginTop: 16 },
      },
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* CARD DO EVENTO */}
      <View style={styles.eventCard}>
        <Image source={{ uri: event.bannerUrl }} style={styles.banner} resizeMode="cover" />

        <View style={styles.eventInfoBox}>
          <Text style={styles.eventTitle}>{event.nome}</Text>
          <Text style={styles.eventSubtitle}>📍 {event.local}</Text>
          <Text style={styles.eventDate}>
            🗓️ {new Date(event.data).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>

      {/* RESUMO DO VALOR */}
      <View style={styles.priceBox}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Ingresso</Text>
          <Text style={styles.priceValue}>R$ {ticketPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Quantidade</Text>
          <Text style={styles.priceValue}>{quantity}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {total}</Text>
        </View>
      </View>

      <GenericForm title="Finalizar Compra" fields={formFields} titleStyle={styles.formTitle} />
    </ScrollView>
  );
}
