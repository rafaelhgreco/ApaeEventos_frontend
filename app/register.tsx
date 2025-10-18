import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { FormField } from "@/types/molecules";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles/register.style";

export default function RegisterScreen() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Criar novo usuário",
        });
    }, [navigation]);

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        console.log(formData);
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFormData({ email: "", password: "", nome: "", role: "" });
    };

    const formFields: FormField[] = [
        {
            type: "input",
            key: "nome",
            props: {
                label: "Nome Completo",
                placeholder: "Digite seu nome completo",
                value: formData.nome,
                onChangeText: handleInputChange("nome"),
                leftIcon: (
                    <Icon name="person-outline" color="#007AFF" size={20} />
                ),
            },
        },
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
            type: "select",
            key: "role",
            props: {
                title: "Função",
                options: [
                    { label: "Atendente", value: "Atendente" },
                    { label: "Organizador", value: "Organizador" },
                ],
                selectedValue: formData.role,
                onValueChange: handleInputChange("role"),
            },
        },
        {
            type: "button",
            key: "submitSignUp",
            props: {
                label: "Enviar",
                onPress: handleSignUp,
                variant: "primary",
                containerStyle: { marginTop: 16 },
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
                        source={require("@/assets/images/logo_apae.png")}
                        style={styles.reactLogo}
                    />
                </View>
            }
        >
            <ThemedView style={styles.titleContainer}>
                <Text style={styles.title}>Realizar Cadastro</Text>
            </ThemedView>
            <ThemedView>
                <Text>Digite os dados abaixo.</Text>
            </ThemedView>
            <ThemedView>
                <GenericForm
                    title="Cadastro de Usuário"
                    fields={formFields}
                    style={styles.registerForm}
                />
            </ThemedView>
        </ParallaxScrollView>
    );
}
