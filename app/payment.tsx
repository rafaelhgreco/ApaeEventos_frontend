import React from "react";
import {
    ActivityIndicator,
    Button,
    SafeAreaView,
    Text,
    View,
} from "react-native";
import { usePayment } from "../hooks/use-payment";
import { styles } from "./styles/payment.style";
import { colors } from "./styles/themes";

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
                <Text style={styles.title}>Pagamento Seguro</Text>

                <View style={styles.eventInfo}>
                    <Text style={styles.eventName}>📅 {params.eventName}</Text>
                    <Text style={styles.quantityText}>
                        🎫 Quantidade: {params.quantity} ingresso(s)
                    </Text>
                    <Text style={styles.paymentMethodText}>
                        {paymentMethodLabel}
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
                        onPress={controller.handleOpenPaymentSheet}
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
