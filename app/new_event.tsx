import Button from '@/components/ATOMIC/atoms/button';
import GenericForm from '@/components/ATOMIC/molecules/form';
import { getIdToken, getUserRole } from '@/lib/cognito';
import { createEvent, uploadBannerService } from '@/services/event_services';
import { FormField } from '@/types/molecules';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function NewEventScreen() {
  const [formData, setFormData] = useState({
    nome: '',
    data: new Date(),
    local: '',
    capacity: '',
    ticket_price: '',
    starts_at: new Date(),
    bannerUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState<Record<string, boolean>>({});

  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Criar Evento' });
  }, [navigation]);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDatePicker = (key: string, visible: boolean) => {
    setShowDatePicker((prev) => ({ ...prev, [key]: visible }));
  };

  const handleDateChange = (field: string) => (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, [field]: selectedDate }));
    }
    toggleDatePicker(field, false);
  };

  // ============================
  // 🔥 UPLOAD DE BANNER
  // ============================
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) return;

      const asset = result.assets[0];
      const fileName = asset.uri.split('/').pop()!;
      const mime = asset.mimeType || 'image/jpeg';

      const form = new FormData();
      form.append('file', {
        uri: asset.uri,
        name: fileName,
        type: mime,
      } as any);

      setUploadingBanner(true);

      const token = await getIdToken();
      if (!token) return Alert.alert('Erro', 'Usuário não autenticado.');

      const upload = await uploadBannerService(form, token);

      setFormData((prev) => ({ ...prev, bannerUrl: upload.url }));
    } catch (err) {
      Alert.alert('Erro', 'Falha ao enviar o banner.');
    } finally {
      setUploadingBanner(false);
    }
  };

  // ============================
  // 🔥 SUBMIT
  // ============================
  const submitForm = async () => {
    try {
      if (!formData.nome || !formData.local || !formData.capacity || !formData.ticket_price) {
        Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
        return;
      }

      const role = await getUserRole();
      if (role !== 'admin' && role !== 'staff') {
        Alert.alert('Acesso negado', 'Apenas admin/staff podem criar eventos.');
        return;
      }

      const token = await getIdToken();
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const payload = {
        nome: formData.nome,
        local: formData.local,
        data: formData.data.toISOString().split('T')[0],
        starts_at: new Date(formData.starts_at).toISOString(),
        capacity: Number(formData.capacity),
        ticket_price: Number(formData.ticket_price),
        bannerUrl: formData.bannerUrl || null,
        status: 'published' as const, // 🔥 TIPO CORRIGIDO
      };

      setLoading(true);
      await createEvent(payload, token);

      Alert.alert('Sucesso', 'Evento criado com sucesso!');
      router.back();
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Erro ao criar evento.');
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // 🔥 CAMPOS DO FORM
  // ============================
  const formFields: FormField[] = [
    {
      key: 'nome',
      type: 'input',
      props: {
        label: 'Nome do Evento *',
        placeholder: 'Ex: Festa Junina APAE',
        value: formData.nome,
        onChangeText: handleInputChange('nome'),
      },
    },
    {
      key: 'local',
      type: 'input',
      props: {
        label: 'Local *',
        placeholder: 'Digite o local',
        value: formData.local,
        onChangeText: handleInputChange('local'),
      },
    },
    {
      key: 'data',
      type: 'date',
      props: {
        label: 'Data *',
        value: formData.data,
        mode: 'date',
        onChange: handleDateChange('data'),
      },
    },
    {
      key: 'starts_at',
      type: 'date',
      props: {
        label: 'Horário *',
        value: formData.starts_at,
        mode: 'time',
        onChange: handleDateChange('starts_at'),
      },
    },
    {
      key: 'capacity',
      type: 'number',
      props: {
        label: 'Capacidade *',
        placeholder: 'Número máximo de pessoas',
        value: formData.capacity,
        keyboardType: 'numeric',
        onChangeText: handleInputChange('capacity'),
      },
    },
    {
      key: 'ticket_price',
      type: 'number',
      props: {
        label: 'Preço (R$) *',
        placeholder: 'Ex: 10.00',
        value: formData.ticket_price,
        keyboardType: 'decimal-pad',
        onChangeText: handleInputChange('ticket_price'),
      },
    },
    {
      key: 'banner',
      type: 'custom',
      props: {
        render: () => (
          <View style={{ marginBottom: 20 }}>
            <Button
              label={uploadingBanner ? 'Enviando...' : 'Selecionar Banner'}
              variant="secondary"
              onPress={handlePickImage}
            />

            {formData.bannerUrl && (
              <Image
                source={{ uri: formData.bannerUrl }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 12,
                  marginTop: 10,
                }}
              />
            )}
          </View>
        ),
      },
    },
    {
      key: 'submit',
      type: 'button',
      props: {
        label: loading ? 'Cadastrando...' : 'Cadastrar Evento',
        onPress: submitForm,
        variant: 'primary',
      },
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        <GenericForm
          title="Cadastro de Novo Evento"
          fields={formFields}
          titleStyle={{
            fontSize: 26,
            fontWeight: '800',
            marginBottom: 16,
            textAlign: 'center',
          }}
          showDatePicker={showDatePicker}
          toggleDatePicker={toggleDatePicker}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
