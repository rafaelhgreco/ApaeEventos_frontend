import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { getUserRole, signIn } from "@/lib/cognito";
import { FormField } from "@/types/molecules";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { styles } from "../styles/index.style";

export default function HomeScreen() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // 🧩 LOGIN
    const handleSignIn = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await signIn(formData.email, formData.password);
            const token = result.session.getIdToken().getJwtToken();
            console.log("Token JWT:", token);

            // 🔍 Obtém a role do usuário logado
            const role = await getUserRole();
            console.log("Função do usuário:", role);

            Alert.alert("Sucesso", `Login realizado com sucesso! (${role})`);

            // 🚀 Redireciona com base no grupo
            if (role === "admin") {
                router.replace("/management");
            } else if (role === "staff") {
                router.replace("/management");
            } else {
                router.replace("/management");
            }
        } catch (err: any) {
            console.error("Erro no login Cognito:", err);
            setError(err.message);
            Alert.alert("Erro no login", err.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    // 🧭 OUTRAS FUNÇÕES
    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRegister = () => {
        router.push("/public_register");
    };

    const handleConfirmAccount = () => {
        router.push("../confirm_register");
    };

    const handleReset = () => {
        setFormData({ email: "", password: "" });
        setError(null);
    };

    // 🧱 CAMPOS DO FORMULÁRIO
    const formFields: FormField[] = [
        {
            type: "input",
            key: "email",
            props: {
                placeholder: "Digite seu e-mail",
                value: formData.email,
                onChangeText: handleInputChange("email"),
                keyboardType: "email-address",
                autoCapitalize: "none",
            },
        },
        {
            type: "input",
            key: "password",
            props: {
                placeholder: "Digite sua senha",
                value: formData.password,
                onChangeText: handleInputChange("password"),
                isPassword: true,
                leftIcon: (
                    <Icon
                        name="lock-closed-outline"
                        color="#007AFF"
                        size={20}
                    />
                ),
            },
        },
        {
            type: "button",
            key: "submitSignIn",
            props: {
                label: loading ? "Entrando..." : "Iniciar sessão",
                onPress: handleSignIn,
                variant: "primary",
                containerStyle: {
                    marginTop: 16,
                    backgroundColor: "#FF9800",
                },
            },
        },
        {
            type: "button",
            key: "submitSignUp",
            props: {
                label: "Fazer Cadastro",
                onPress: handleRegister,
                variant: "primary",
                containerStyle: { marginTop: 16 },
            },
        },
        {
            type: "button",
            key: "confirmAccount",
            props: {
                label: "Confirmar Conta",
                onPress: handleConfirmAccount,
                variant: "outline",
                containerStyle: {
                    marginTop: 8,
                    borderColor: "#007AFF",
                },
                textStyle: {
                    color: "#007AFF",
                },
            },
        },
        {
            type: "button",
            key: "reset",
            props: {
                label: "Limpar",
                onPress: handleReset,
                variant: "outline",
                containerStyle: { marginTop: 8 },
            },
        },
    ];

    // 🧭 INTERFACE
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
                <View style={styles.loginForm}>
                    <GenericForm title="Login" fields={formFields} />
                    {error && (
                        <Text
                            style={{
                                color: "red",
                                marginTop: 12,
                                textAlign: "center",
                                fontSize: 14,
                            }}
                        >
                            {error}
                        </Text>
                    )}
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}
