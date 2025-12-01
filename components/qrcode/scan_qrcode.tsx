import Button from '@/components/ATOMIC/atoms/button';
import { ThemedView } from '@/components/ThemedView';
import { validateQRCode } from '@/services/qr_code_services';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { XCircle } from 'lucide-react-native';

import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from '@/src/styles/scan_qrcode.style';

export default function ReadQrCode() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [, requestPermission] = useCameraPermissions();
  const [processing, setProcessing] = useState(false);

  const qrLock = useRef(false);

  async function openCamera() {
    const { granted } = await requestPermission();

    if (!granted) {
      return Alert.alert('Permissão necessária', 'Ative o uso da câmera.');
    }

    qrLock.current = false;
    setProcessing(false);
    setModalIsVisible(true);
  }

  async function handleScan(data: string) {
    if (qrLock.current) return;

    qrLock.current = true;
    setProcessing(true);

    try {
      const result = await validateQRCode(data);

      setModalIsVisible(false);
      setProcessing(false);

      if (result.success) {
        Alert.alert('Sucesso 🎉', 'Ingresso validado!');
      } else {
        Alert.alert('Atenção ⚠️', result.message || 'Erro ao validar');
      }
    } catch (error: any) {
      setProcessing(false);
      Alert.alert('Erro', error.message || 'Falha ao validar ingresso');
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Button label="Ler QR Code" onPress={openCamera} />

      <Modal visible={modalIsVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (!processing && data && !qrLock.current) {
                handleScan(data);
              }
            }}
          />

          {/* Moldura */}
          <View style={styles.scanFrameContainer}>
            <View style={styles.scanFrame} />
          </View>

          {/* Botão fechar */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalIsVisible(false)}>
            <XCircle size={42} color="#fff" />
          </TouchableOpacity>

          {processing && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Validando...</Text>
            </View>
          )}
        </View>
      </Modal>
    </ThemedView>
  );
}
