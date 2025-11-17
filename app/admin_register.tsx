import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { signUp } from "@/lib/cognito";
import { FormField } from "@/types/molecules";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { styles } from "./styles/register.style";

/**
 * AdminRegisterScreen allows administrators to create new users with
 * optional roles. To ensure good keyboard behaviour, the form is
 * wrapped in a KeyboardAvoidingView and ScrollView, and an
 * Animated.View shifts the form up slightly when an input field gains
 * focus. This mirrors the behaviour added to the login and public
 * register screens, providing a consistent, fluid experience when
 * entering data. After successful registration the form is reset and
 * a success message is displayed.
 */
export default function AdminRegisterScreen() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // Animated value to translate the form when an input is focused.
  const translateY = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Cadastro de Usuário (Admin)",
    });
  }, [navigation]);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    const { nome, email, password, telefone, role } = formData;

    if (!email || !password || !nome) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha nome, e-mail e senha antes de continuar."
      );
      return;
    }

    // Format phone number if provided
    let telefoneFormatado: string | undefined = undefined;
    if (telefone.trim() !== "") {
      const telefoneNumerico = telefone.replace(/\D/g, "");
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
    const roleToSend = role.trim() === "" ? undefined : role.trim();

    setLoading(true);
    try {
      await signUp(
        nome.trim(),
        email.trim(),
        password,
        telefoneFormatado,
        roleToSend
      );
      const msgGrupo = roleToSend
        ? `Usuário adicionado ao grupo "${roleToSend}".`
        : "Usuário adicionado ao grupo padrão (default).";
      Alert.alert(
        "Sucesso",
        `Usuário ${nome} cadastrado com sucesso.\n${msgGrupo}`
      );
      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        password: "",
        role: "",
      });
    } catch (err: any) {
      console.error("Erro ao criar usuário:", err);
      Alert.alert("Erro", err.message || "Falha ao criar usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      password: "",
      role: "",
    });
  };

  // Base form fields
  const formFields: FormField[] = [
    {
      type: "input",
      key: "nome",
      props: {
        label: "Nome Completo",
        placeholder: "Digite o nome completo",
        value: formData.nome,
        onChangeText: handleInputChange("nome"),
        leftIcon: <Icon name="person-outline" color="#007AFF" size={20} />,
      },
    },
    {
      type: "input",
      key: "email",
      props: {
        label: "E-mail",
        placeholder: "Digite o e-mail",
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
        label: "Telefone com DDD",
        placeholder: "Ex: 19981234567",
        value: formData.telefone,
        onChangeText: handleInputChange("telefone"),
        keyboardType: "phone-pad",
        leftIcon: <Icon name="call-outline" color="#007AFF" size={20} />,
      },
    },
    {
      type: "input",
      key: "password",
      props: {
        label: "Senha",
        placeholder: "Digite a senha",
        value: formData.password,
        onChangeText: handleInputChange("password"),
        isPassword: true,
        leftIcon: <Icon name="lock-closed-outline" color="#007AFF" size={20} />,
      },
    },
    {
      type: "select",
      key: "role",
      props: {
        title: "Função do Usuário",
        options: [
          { label: "Usuário Comum (Default)", value: "" },
          { label: "Atendente", value: "staff" },
          { label: "Administrador", value: "admin" },
        ],
        selectedValue: formData.role,
        onValueChange: handleInputChange("role"),
      },
    },
    {
      type: "button",
      key: "submitSignUp",
      props: {
        label: loading ? "Cadastrando..." : "Cadastrar Usuário",
        onPress: handleSignUp,
        variant: "primary",
        containerStyle: { marginTop: 16 },
      },
    },
    {
      type: "button",
      key: "reset",
      props: {
        label: "Limpar Campos",
        onPress: handleReset,
        variant: "outline",
        containerStyle: { marginTop: 8 },
      },
    },
  ];

  // Map over fields to add focus handlers to input fields. For the select
  // and button types, we leave them unchanged.
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/logo_apae.png")}
            style={styles.reactLogo}
          />
        </View>
      }
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={120}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={{ flex: 1 }}>
            <Animated.View style={{ transform: [{ translateY }] }}>
              <GenericForm
                title="Cadastro de Usuário (Admin)"
                fields={fieldsWithFocusHandlers}
                // Use registerForm style for consistent spacing
                containerStyle={styles.registerForm}
              />
            </Animated.View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
}