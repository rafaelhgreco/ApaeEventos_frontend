import Icon from '@/components/ATOMIC/atoms/icon';
import GenericForm from '@/components/ATOMIC/molecules/form';
import { ThemedView } from '@/components/ThemedView';
import { signUp } from '@/lib/cognito';
import { FormField } from '@/types/molecules';

import { useNavigation } from 'expo-router';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles/register.style';

export default function AdminRegisterScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    password: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);

  // 🔥 animações
  const translateY = useRef(new Animated.Value(0));
  const logoOpacity = useRef(new Animated.Value(1));

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastro de Usuário (Admin)',
    });
  }, [navigation]);

  /* ----------------------------------------------------
     ANIMAÇÃO DO TECLADO — LOGO SOME AO ABRIR TECLADO
  ---------------------------------------------------- */
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(logoOpacity.current, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(logoOpacity.current, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  /* ----------------------------------------------------
     HANDLERS
  ---------------------------------------------------- */
  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    const { nome, email, password, telefone, role } = formData;

    if (!email || !password || !nome) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail e senha antes de continuar.');
      return;
    }

    let telefoneFormatado: string | undefined;
    if (telefone.trim()) {
      const tel = telefone.replace(/\D/g, '');
      if (tel.length < 10 || tel.length > 11) {
        Alert.alert('Telefone inválido', 'Digite com DDD. Ex: 19981234567');
        return;
      }
      telefoneFormatado = `+55${tel}`;
    }

    const roleToSend = role.trim() === '' ? undefined : role.trim();

    setLoading(true);
    try {
      await signUp(nome.trim(), email.trim(), password, telefoneFormatado, roleToSend);

      Alert.alert('Sucesso', `Usuário ${nome} cadastrado.\nFunção: ${roleToSend ?? 'Default'}`);

      setFormData({
        nome: '',
        email: '',
        telefone: '',
        password: '',
        role: '',
      });
    } catch (err: any) {
      Alert.alert('Erro', err.message || 'Falha ao criar usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      password: '',
      role: '',
    });
  };

  /* ----------------------------------------------------
     CAMPOS DO FORM
  ---------------------------------------------------- */
  const formFields: FormField[] = [
    {
      type: 'input',
      key: 'nome',
      props: {
        label: 'Nome Completo',
        placeholder: 'Digite o nome completo',
        value: formData.nome,
        onChangeText: handleInputChange('nome'),
        leftIcon: <Icon name="person-outline" color="#007AFF" size={20} />,
      },
    },
    {
      type: 'input',
      key: 'email',
      props: {
        label: 'E-mail',
        placeholder: 'Digite o e-mail',
        value: formData.email,
        onChangeText: handleInputChange('email'),
        keyboardType: 'email-address',
        autoCapitalize: 'none',
      },
    },
    {
      type: 'input',
      key: 'telefone',
      props: {
        label: 'Telefone com DDD',
        placeholder: 'Ex: 19981234567',
        value: formData.telefone,
        onChangeText: handleInputChange('telefone'),
        keyboardType: 'phone-pad',
        leftIcon: <Icon name="call-outline" color="#007AFF" size={20} />,
      },
    },
    {
      type: 'input',
      key: 'password',
      props: {
        label: 'Senha',
        placeholder: 'Digite a senha',
        value: formData.password,
        onChangeText: handleInputChange('password'),
        isPassword: true,
        leftIcon: <Icon name="lock-closed-outline" color="#007AFF" size={20} />,
      },
    },
    {
      type: 'select',
      key: 'role',
      props: {
        title: 'Função do Usuário',
        options: [
          { label: 'Usuário', value: '' },
          { label: 'Atendente', value: 'staff' },
          { label: 'Administrador', value: 'admin' },
        ],
        selectedValue: formData.role,
        onValueChange: handleInputChange('role'),
      },
    },
    {
      type: 'button',
      key: 'submitSignUp',
      props: {
        label: loading ? 'Cadastrando...' : 'Cadastrar Usuário',
        onPress: handleSignUp,
        variant: 'primary',
        containerStyle: { marginTop: 16 },
      },
    },
    {
      type: 'button',
      key: 'reset',
      props: {
        label: 'Limpar Campos',
        onPress: handleReset,
        variant: 'outline',
        containerStyle: { marginTop: 8 },
      },
    },
  ];

  /* ----------------------------------------------------
     INPUTS: animação ao focar
  ---------------------------------------------------- */
  const fieldsWithFocusHandlers: FormField[] = formFields.map((field) => {
    if (field.type === 'input') {
      return {
        ...field,
        props: {
          ...field.props,
          onFocus: () =>
            Animated.spring(translateY.current, {
              toValue: -40,
              useNativeDriver: true,
            }).start(),
          onBlur: () =>
            Animated.spring(translateY.current, {
              toValue: 0,
              useNativeDriver: true,
            }).start(),
        },
      };
    }
    return field;
  });

  /* ----------------------------------------------------
     LAYOUT COMPLETO — SAFE AREA + TECLADO + SCROLL
  ---------------------------------------------------- */
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <ThemedView style={{ flex: 1, paddingHorizontal: 20 }}>
            {/* FORM */}
            <Animated.View style={{ transform: [{ translateY: translateY.current }] }}>
              <GenericForm
                title="Cadastro de Usuário (Admin)"
                fields={fieldsWithFocusHandlers}
                containerStyle={styles.registerForm}
              />
            </Animated.View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
