import GenericForm from '@/components/ATOMIC/molecules/form';
import { ThemedView } from '@/components/ThemedView';
import { signUp } from '@/lib/cognito';
import { FormField } from '@/types/molecules';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { publicRegisterStyles as styles } from '../app/styles/public_register.style';

export default function RegisterScreen() {
  const router = useRouter();
  const translateY = useRef(new Animated.Value(0)).current;

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: '',
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.password) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail e senha.');
      return;
    }

    let telefoneFormatado: string | undefined = undefined;

    if (formData.telefone.trim() !== '') {
      const tel = formData.telefone.replace(/\D/g, '');
      if (tel.length < 10 || tel.length > 11) {
        Alert.alert('Telefone inválido', 'Digite com DDD. Ex: 19981234567');
        return;
      }
      telefoneFormatado = `+55${tel}`;
    }

    try {
      await signUp(
        formData.nome.trim(),
        formData.email.trim(),
        formData.password,
        telefoneFormatado,
      );

      Alert.alert('Conta criada!', 'Você já pode fazer login.');
      router.push({
        pathname: '/',
        params: { email: formData.email.trim() },
      });
    } catch (err: any) {
      Alert.alert('Erro no cadastro', err.message || 'Tente novamente.');
    }
  };

  // 🎭 Animação de subir o form ao focar no input
  const formFields: FormField[] = [
    {
      type: 'input',
      key: 'nome',
      props: {
        placeholder: 'Nome completo',
        value: formData.nome,
        onChangeText: handleInputChange('nome'),
        onFocus: () =>
          Animated.spring(translateY, {
            toValue: -40,
            useNativeDriver: true,
          }).start(),
        onBlur: () =>
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start(),
      },
    },
    {
      type: 'input',
      key: 'email',
      props: {
        placeholder: 'E-mail',
        autoCapitalize: 'none',
        keyboardType: 'email-address',
        value: formData.email,
        onChangeText: handleInputChange('email'),
      },
    },
    {
      type: 'input',
      key: 'telefone',
      props: {
        placeholder: 'Telefone com DDD (opcional)',
        keyboardType: 'phone-pad',
        value: formData.telefone,
        onChangeText: handleInputChange('telefone'),
      },
    },
    {
      type: 'input',
      key: 'password',
      props: {
        placeholder: 'Senha',
        isPassword: true,
        value: formData.password,
        onChangeText: handleInputChange('password'),
      },
    },
    {
      type: 'button',
      key: 'submit',
      props: {
        label: 'Criar Conta',
        onPress: handleSubmit,
        variant: 'primary',
        containerStyle: { marginTop: 16 },
      },
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={120}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <ThemedView style={styles.container}>
          <View style={styles.bannerContainer}>
            <Image source={require('@/assets/images/logo_apae.png')} style={styles.bannerImage} />
          </View>

          <Animated.View style={[styles.formWrapper, { transform: [{ translateY }] }]}>
            <GenericForm
              title="Criar Conta"
              fields={formFields}
              titleStyle={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 12,
                textAlign: 'center',
              }}
            />
          </Animated.View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
