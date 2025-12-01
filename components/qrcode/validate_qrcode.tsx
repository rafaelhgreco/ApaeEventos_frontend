import Button from '@/components/ATOMIC/atoms/button';
import { ThemedView } from '@/components/ThemedView';
import { checkQRCodeValidity } from '@/services/qr_code_services';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { XCircle } from 'lucide-react-native';

import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Modal, Text, TouchableOpacity, View } from 'react-native';

import styles from '@/src/styles/scan_qrcode.style';

export default function ValidateQRCode() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  async function openCamera() {
    const { granted } = await requestPermission();
    if (!granted) {
      return Alert.alert('Permissão', 'Habilite o uso da câmera.');
    }

    setProcessing(false);
    qrLock.current = false;
    setModalIsVisible(true);
  }

  async function handleScan(data: string) {
    if (qrLock.current) return;

    qrLock.current = true;
    setProcessing(true);

    try {
      const result = await checkQRCodeValidity(data);

      setModalIsVisible(false);
      setProcessing(false);

      if (result.valid) {
        Alert.alert('✔️ Válido', 'Ingresso ainda não utilizado.');
      } else {
        Alert.alert('⚠️ Já usado', result.message || 'Este ingresso já foi utilizado.');
      }
    } catch (error: any) {
      setProcessing(false);
      Alert.alert('Erro', error.message || 'Falha ao verificar ingresso.');
    }
  }

  return (
    <ThemedView style={styles.container}>
      <Button label="Verificar Ingresso" onPress={openCamera} variant="secondary" />

      <Modal visible={modalIsVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (data && !qrLock.current && !processing) {
                handleScan(data);
              }
            }}
          />

          {/* Moldura */}
          <View style={styles.scanFrameContainer}>
            <View style={styles.scanFrame} />
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={() => setModalIsVisible(false)}>
            <XCircle size={42} color="#fff" />
          </TouchableOpacity>

          {processing && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Verificando...</Text>
            </View>
          )}
        </View>
      </Modal>
    </ThemedView>
  );
}
