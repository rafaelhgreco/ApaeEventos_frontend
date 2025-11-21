import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { usePayment } from '../hooks/use-payment';
import { styles } from './styles/payment.style';
import { colors } from './styles/themes';

export default function PaymentScreen() {
  const {
    controller,
    loading,
    clientSecret,
    isSheetInitialized,
    params,
    valorEmReais,
    paymentMethodLabel,
  } = usePayment();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Título */}
        <Text style={styles.title}>Pagamento Seguro</Text>

        {/* Informações do evento */}
        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>📅 {params.eventName}</Text>
          <Text style={styles.quantityText}>🎫 {params.quantity} ingresso(s)</Text>
          <Text style={styles.paymentMethodText}>{paymentMethodLabel}</Text>
        </View>

        {/* Valor total */}
        <View style={styles.priceContainer}>
          <Text style={styles.label}>Valor Total</Text>
          <Text style={styles.valor}>R$ {valorEmReais}</Text>
        </View>

        {/* Carregando Stripe */}
        {!isSheetInitialized && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Preparando pagamento seguro...</Text>
          </View>
        )}

        {/* Botão custom */}
        <TouchableOpacity
          style={[
            styles.payButton,
            (!clientSecret || !isSheetInitialized || loading) && styles.payButtonDisabled,
          ]}
          onPress={controller.handleOpenPaymentSheet}
          disabled={!clientSecret || !isSheetInitialized || loading}
          activeOpacity={0.8}
        >
          <Text style={styles.payButtonText}>{loading ? 'Processando...' : 'Pagar Agora'}</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>🔒 Pagamento processado com segurança via Stripe</Text>
      </View>
    </SafeAreaView>
  );
}
