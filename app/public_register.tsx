import GenericForm from "@/components/ATOMIC/molecules/form";
import { ThemedView } from "@/components/ThemedView";
import { signUp } from "@/lib/cognito";
import { FormField } from "@/types/molecules";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { styles } from "../app/styles/index.style";

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    telefone: "",
  });

  const translateY = useRef(new Animated.Value(0)).current;

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.password) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha nome, e-mail e senha antes de continuar."
      );
      return;
    }

    let telefoneFormatado: string | undefined = undefined;

    if (formData.telefone.trim() !== "") {
      const telefoneNumerico = formData.telefone.replace(/\D/g, "");

      if (telefoneNumerico.length < 10 || telefoneNumerico.length > 11) {
        Alert.alert(
          "Telefone inválido",
          "Informe um número com DDD. Ex: 19981234567"
        );
        return;
      }

      telefoneFormatado = `+55${telefoneNumerico}`;

      if (!/^\+55\d{10,11}$/.test(telefoneFormatado)) {
        Alert.alert(
          "Telefone inválido",
          "O número precisa estar no formato +55DDDNÚMERO."
        );
        return;
      }
    }

    try {
      await signUp(
        formData.nome.trim(),
        formData.email.trim(),
        formData.password,
        telefoneFormatado
      );

      Alert.alert("Sucesso", "Conta criada com sucesso!");

      // ✅ Redireciona automaticamente para tela de login
      router.push({
        pathname: "/",
        params: { email: formData.email.trim() },
      });
    } catch (err: any) {
      console.error("Erro no cadastro Cognito:", err);
      Alert.alert(
        "Erro no cadastro",
        err.message || "Tente novamente mais tarde."
      );
    }
  };

  const formFields: FormField[] = [
    {
      type: "input",
      key: "nome",
      props: {
        placeholder: "Nome completo",
        value: formData.nome,
        onChangeText: handleInputChange("nome"),
      },
    },
    {
      type: "input",
      key: "email",
      props: {
        placeholder: "E-mail",
        value: formData.email,
        onChangeText: handleInputChange("email"),
        keyboardType: "email-address",
        autoCapitalize: "none",
      },
    },
    {
      type: "input",
      key: "telefone",
      props: {
        placeholder: "Telefone com DDD (opcional)",
        value: formData.telefone,
        onChangeText: handleInputChange("telefone"),
        keyboardType: "phone-pad",
      },
    },
    {
      type: "input",
      key: "password",
      props: {
        placeholder: "Senha",
        value: formData.password,
        onChangeText: handleInputChange("password"),
        isPassword: true,
      },
    },
    {
      type: "button",
      key: "submit",
      props: {
        label: "Criar Conta",
        onPress: handleSubmit,
        variant: "primary",
        containerStyle: { marginTop: 16 },
      },
    },
  ];

  // Add focus/blur handlers to animate the form when inputs are selected.
  const fieldsWithFocusHandlers: FormField[] = formFields.map((field) => {
    if (field.type === "input") {
      return {
        ...field,
        props: {
          ...field.props,
          onFocus: () => {
            Animated.spring(translateY, {
              toValue: -40,
              useNativeDriver: true,
            }).start();
          },
          onBlur: () => {
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          },
        },
      };
    }
    return field;
  });

return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image style={styles.reactLogo} source={require('@/assets/images/logo_apae.png')} />
          </View>
          {/* form animado */}
          <Animated.View style={{ transform: [{ translateY }] }}>
            <View style={styles.loginForm}>
              <GenericForm title="Criar Conta" fields={fieldsWithFocusHandlers} />
            </View>
          </Animated.View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}