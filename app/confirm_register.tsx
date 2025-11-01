import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { confirmSignUp } from "@/lib/cognito";
import { FormField } from "@/types/molecules";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function ConfirmRegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.code) {
      Alert.alert("Atenção", "Preencha o e-mail e o código de verificação.");
      return;
    }

    try {
      await confirmSignUp(formData.email.trim(), formData.code.trim());
      Alert.alert("Sucesso", "Conta confirmada! Agora você pode fazer login.");
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Código inválido ou expirado.");
    }
  };

  const formFields: FormField[] = [
    {
      type: "input",
      key: "email",
      props: {
        placeholder: "E-mail",
        value: formData.email,
        onChangeText: handleInputChange("email"),
      },
    },
    {
      type: "input",
      key: "code",
      props: {
        placeholder: "Código de verificação",
        value: formData.code,
        onChangeText: handleInputChange("code"),
        keyboardType: "number-pad",
      },
    },
    {
      type: "button",
      key: "submit",
      props: {
        label: "Confirmar conta",
        onPress: handleSubmit,
        variant: "primary",
        containerStyle: { marginTop: 16 },
      },
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<View style={{ height: 100 }} />}
    >
      <ThemedView>
        <View style={{ padding: 16 }}>
          <GenericForm title="Confirmar Cadastro" fields={formFields} />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
