import Button from "@/components/ATOMIC/atoms/button";
import { ThemedView } from "@/components/ThemedView";
import { getAuth } from "@react-native-firebase/auth";
import axios from "axios";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Alert, Modal, View } from "react-native";
import styles from "./styles/scan_qrcode.style";

export default function ReadQrCodeScreen() {
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
            const currentUser = getAuth().currentUser;
            if (!currentUser) {
                return Alert.alert("Erro", "Usuário não autenticado");
            }

            const token = await currentUser.getIdToken();

            const response = await axios.post(
                `http://35.247.231.143:3000/scan/${data}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 && response.data.success) {
                Alert.alert("Sucesso", "Ingresso validado com sucesso!");
            } else {
                Alert.alert(
                    "Atenção",
                    response.data.message ||
                        "Não foi possível validar o ingresso."
                );
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert(
                "Erro",
                error?.response?.data?.message || "Falha ao validar ingresso"
            );
        }
    }

    return (
        <ThemedView style={styles.container}>
            <Button label="Ler QRCode" onPress={handleOpenCamera} />

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
function auth() {
    throw new Error("Function not implemented.");
}
