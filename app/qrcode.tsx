import ReadQrCode from "@/components/qrcode/scan_qrcode";
import ValidateQRCode from "@/components/qrcode/validate_qrcode";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles/qrcode.styles";

export default function QrCodeScreen() {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Gerenciar Ingressos",
        });
    }, [navigation]);
    return (
        <View>
            <Text style={styles.title}>Gerenciador de Ingressos</Text>
            <View style={styles.container}>
                <Text style={styles.subTitle}>
                    Acesse o QR Code para validar os ingressos.
                </Text>
                <ReadQrCode />
            </View>
            <View style={styles.container}>
                <Text style={styles.subTitle}>
                    Verifique se os ingressos já estão sendo utilizados.
                </Text>
                <ValidateQRCode />
            </View>
        </View>
    );
}
