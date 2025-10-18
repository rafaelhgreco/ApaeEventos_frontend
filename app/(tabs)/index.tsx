import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { FormField } from "@/types/molecules";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "../styles/index.style";

export default function HomeScreen() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSignIn = async () => {
        // setLoading(true);
        // setError(null);
        router.push("/management");
    };

    const handleRegister = () => {
        router.push("/register");
    };

    const handleReset = () => {
        setFormData({ email: "", password: "" });
        setError(null);
    };

    const formFields: FormField[] = [
        {
            type: "input",
            key: "email",
            props: {
                label: "E-mail",
                placeholder: "Digite seu e-mail",
                value: formData.email,
                onChangeText: handleInputChange("email"),
                keyboardType: "email-address",
                autoCapitalize: "none",
                editable: !loading,
            },
        },
        {
            type: "input",
            key: "password",
            props: {
                label: "Senha",
                placeholder: "Digite sua senha",
                value: formData.password,
                onChangeText: handleInputChange("password"),
                isPassword: true,
                editable: !loading,
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
                disabled: loading,
                containerStyle: {
                    marginTop: 16,
                    backgroundColor: "#FF9800",
                },
            },
        },
        {
            type: "button",
            key: "submitSingUp",
            props: {
                label: "Solicitar uma Conta",
                onPress: handleRegister,
                variant: "primary",
                disabled: loading,
                containerStyle: {
                    marginTop: 16,
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
                disabled: loading,
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
                        style={styles.reactLogo}
                        source={require("@/assets/images/logo_apae.png")}
                    />
                </View>
            }
        >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Apae Eventos</Text>
                <HelloWave />
            </View>

            <View style={styles.stepContainer}>
                <Text>Olá, seja bem-vindo(a)!</Text>
            </View>

            <View style={styles.loginForm}>
                <GenericForm
                    title="Faça login na sua conta"
                    fields={formFields}
                />
            </View>
        </ParallaxScrollView>
    );
}
