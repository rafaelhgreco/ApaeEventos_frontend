import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getFirebaseAuth } from "@/firebase/firebase";
import { FormField } from "@/types/molecules";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import * as Themes from "../../styles/themes";
export default function HomeScreen() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const auth: FirebaseAuthTypes.Module = getFirebaseAuth();

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                console.log("Usuário logado:", currentUser.email);
            } else {
                console.log("Nenhum usuário logado.");
            }
            setLoading(false);
        });

        return subscriber;
    }, []);

    const handleSignIn = async () => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await auth.signInWithEmailAndPassword(
                formData.email,
                formData.password
            );
            Alert.alert("Sucesso", "Login realizado com sucesso!");
            setFormData({ email: "", password: "" });
            router.push("/explore");
        } catch (err: any) {
            console.error("Erro ao fazer login:", err);
            let errorMessage = "Erro ao fazer login.";
            if (err.code === "auth/invalid-email") {
                errorMessage = "Formato de e-mail inválido.";
            } else if (err.code === "auth/user-not-found") {
                errorMessage =
                    "Usuário não encontrado. Verifique e-mail e senha.";
            } else if (err.code === "auth/wrong-password") {
                errorMessage = "Senha incorreta. Tente novamente.";
            } else if (err.code === "auth/too-many-requests") {
                errorMessage =
                    "Muitas tentativas falhas. Tente novamente mais tarde.";
            } else {
                errorMessage = err.message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRegister = () => {
        router.push("/register");
    };

    const handleReset = () => {
        setFormData({ email: "", password: "" });
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
                label: "Realizar Cadastro",
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
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Apae Eventos</ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView>
                <Text>Olá, seja bem-vindo(a)!</Text>
            </ThemedView>
            <ThemedView>
                <GenericForm
                    title="Faça login na sua conta"
                    fields={formFields}
                    style={styles.loginForm}
                />
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    loginForm: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: Themes.border.radiusMedium,
    },
});
