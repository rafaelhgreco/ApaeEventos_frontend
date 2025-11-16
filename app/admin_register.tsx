import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { signUp } from "@/lib/cognito";
import { FormField } from "@/types/molecules";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Alert, View } from "react-native";
import { styles } from "./styles/register.style";

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

  // Verifica se os campos obrigatórios estão preenchidos
  if (!email || !password || !nome) {
    Alert.alert("Campos obrigatórios", "Preencha nome, e-mail e senha antes de continuar.");
    return;
  }

  // 🧩 Valida e formata o telefone apenas se não estiver vazio
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

  // Envia vazio se o telefone não foi fornecido
  const roleToSend = role.trim() === "" ? undefined : role.trim();

  setLoading(true);
  try {
    await signUp(
      nome.trim(),
      email.trim(),
      password,
      telefoneFormatado, // Envia telefoneFormatado ou undefined
      roleToSend
    );

    const msgGrupo = roleToSend
      ? `Usuário adicionado ao grupo "${roleToSend}".`
      : "Usuário adicionado ao grupo padrão (default).";

    Alert.alert(
      "Sucesso",
      `Usuário ${nome} cadastrado com sucesso.\n${msgGrupo}`
    );

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
      <ThemedView>
        <GenericForm
          title="Cadastro de Usuário (Admin)"
          fields={formFields}
          style={styles.registerForm}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}
