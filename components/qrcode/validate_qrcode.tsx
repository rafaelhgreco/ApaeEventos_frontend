import Button from "@/components/ATOMIC/atoms/button";
import { ThemedView } from "@/components/ThemedView";
import { checkQRCodeValidity } from "@/services/qr_code_services";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Alert, Modal, View } from "react-native";
import styles from "../../app/styles/scan_qrcode.style";

export default function ValidateQRCode() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const qrCodeLock = useRef(false);

    async function handleOpenCamera() {
        try {
            const { granted } = await requestPermission();
            if (!granted) {
                return Alert.alert("Câmera", "Habilite o uso da câmera.");
            }

            setModalIsVisible(true);
            qrCodeLock.current = false;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleQRCodeRead(data: string) {
        setModalIsVisible(false);
        qrCodeLock.current = true;

        try {
            const result = await checkQRCodeValidity(data);

            if (result.valid) {
                Alert.alert(
                    "Sucesso",
                    "Ingresso válido e ainda não utilizado!"
                );
            } else {
                Alert.alert(
                    "Ingresso já utilizado",
                    result.message || "Este ingresso já foi usado."
                );
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert(
                "Erro",
                error.message || "Falha ao verificar o ingresso."
            );
        }
    }

    return (
        <ThemedView style={styles.container}>
            <Button
                label="Verificar Ingresso"
                onPress={handleOpenCamera}
                variant="secondary"
            />

            <Modal visible={modalIsVisible} style={{ flex: 1 }}>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    onBarcodeScanned={({ data }) => {
                        if (data && !qrCodeLock.current) {
                            qrCodeLock.current = true;
                            handleQRCodeRead(data);
                        }
                    }}
                />

                <View style={styles.footer}>
                    <Button
                        label="Cancelar"
                        onPress={() => setModalIsVisible(false)}
                    />
                </View>
            </Modal>
        </ThemedView>
    );
}
