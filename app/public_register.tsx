import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { signUp } from "@/lib/cognito";
import { FormField } from "@/types/molecules";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso! Verifique seu e-mail para confirmar."
      );
      router.replace("/");
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <View style={styles.container}>
          <Image
            style={styles.reactLogo}
            source={require("@/assets/images/logo_apae.png")}
          />
        </View>
      }
    >
      <ThemedView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          >
            <GenericForm title="Criar Conta" fields={formFields} />
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </ParallaxScrollView>
  );
}
