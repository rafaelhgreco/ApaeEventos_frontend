import GenericForm from '@/components/ATOMIC/molecules/form';
import { ThemedView } from '@/components/ThemedView';
import { signUp } from '@/lib/cognito';
import { FormField } from '@/types/molecules';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';

import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { publicRegisterStyles as styles } from '../app/styles/public_register.style';

export default function RegisterScreen() {
  const router = useRouter();

  const translateY = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: '',
  });

  /* ------------------------------
      MOVER FORM AO ABRIR TECLADO
  ------------------------------ */
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: -80,
          speed: 5,
          bounciness: 0,
          useNativeDriver: true,
        }),
      ]).start();
    });

    const hide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          speed: 5,
          bounciness: 0,
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  /* ------------------------------
      HANDLE INPUT
  ------------------------------ */
  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ------------------------------
      SUBMIT
  ------------------------------ */
  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.password) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail e senha.');
      return;
    }

    let telefoneFormatado: string | undefined;

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

  /* ------------------------------
      CAMPOS DO FORM
  ------------------------------ */
  const formFields: FormField[] = [
    {
      type: 'input',
      key: 'nome',
      props: {
        placeholder: 'Nome completo',
        value: formData.nome,
        onChangeText: handleInputChange('nome'),
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
        containerStyle: { marginTop: 20 },
      },
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120, // garante que inputs nunca fiquem atrás do teclado
          }}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={styles.container}>
            {/* FORM SUBINDO */}
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
    </SafeAreaView>
  );
}
