import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
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
import * as Themes from "../styles/themes";

export default function RegisterScreen() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const auth: FirebaseAuthTypes.Module = getFirebaseAuth();

    const router = useRouter();

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

    const handleSignUp = async () => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await auth.createUserWithEmailAndPassword(
                formData.email,
                formData.password
            );
            Alert.alert("Sucesso", "Conta criada com sucesso!");
            setFormData({ email: "", password: "" });
            router.push("/");
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                Alert.alert(
                    "E-mail já cadastrado",
                    "O e-mail informado já está em uso. Por favor, tente outro."
                );
                return;
            } else if (err.code === "auth/invalid-email") {
                Alert.alert(
                    "E-mail inválido",
                    "O e-mail informado não é válido. Por favor, verifique e tente novamente."
                );
                return;
            } else if (err.code === "auth/weak-password") {
                Alert.alert(
                    "Senha fraca",
                    "A senha informada é muito fraca. Por favor, escolha uma senha mais forte."
                );
                return;
            } else {
                Alert.alert("Erro ao criar conta", "Tente novamente!");
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Realizar Cadastro</ThemedText>
            </ThemedView>
            <ThemedView>
                <Text>Digite seus dados abaixo.</Text>
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
    registerForm: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: Themes.border.radiusMedium,
    },
});
