import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { FormField } from "@/types/molecules";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, View } from "react-native";
import { styles } from "../styles/index.style";

export default function HomeScreen() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async () => {
        setLoading(true);
        setError(null);
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        router.push("/management");
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRegister = () => {
        router.push("/explore");
    };

    const handleReset = () => {
        setFormData({ email: "", password: "" });
    };

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
                label: "Iniciar sessão",
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
            key: "submitSingUp",
            props: {
                label: "Solicitar uma Conta",
                onPress: handleRegister,
                variant: "primary",
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
            <ThemedView>
                <View style={styles.loginForm}>
                    <GenericForm title="Login" fields={formFields} />
                </View>
            </ThemedView>
        </ParallaxScrollView>
    );
}
