import ReadQrCode from "@/components/qrcode/scan_qrcode";
import ValidateQRCode from "@/components/qrcode/validate_qrcode";
import { useNavigation } from "expo-router";
import { QrCode, ScanLine } from "lucide-react-native";
import React, { useLayoutEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles/qrcode.styles";

export default function QrCodeScreen() {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Gerenciar Ingressos",
        });
    }, [navigation]);

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#F9FAFB" }}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Gerenciamento de Ingressos</Text>

            {/* CARD — Leitura */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <ScanLine size={26} color={styles.icon.color} />
                    <Text style={styles.cardTitle}>Leitura do QR Code</Text>
                </View>

                <Text style={styles.subTitle}>
                    Use a câmera para validar o ingresso imediatamente.
                </Text>

                <ReadQrCode />
            </View>

            {/* CARD — Verificação */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <QrCode size={26} color={styles.icon.color} />
                    <Text style={styles.cardTitle}>Verificação de Ingresso</Text>
                </View>

                <Text style={styles.subTitle}>
                    Confira se o ingresso já foi utilizado ou continua ativo.
                </Text>

                <ValidateQRCode />
            </View>
        </ScrollView>
    );
}
