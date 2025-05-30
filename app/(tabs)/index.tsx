import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { getFirebaseAuth } from "@/firebase/firebase";
import { FormField } from "@/types/molecules";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { styles } from "../styles/index.style";

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
        setError(null);
        try {
            await auth.signInWithEmailAndPassword(
                formData.email,
                formData.password
            );
            const currentUser = auth.currentUser;

            if (currentUser) {
                const userDoc = await firestore()
                    .collection("users")
                    .doc(currentUser.uid)
                    .get();

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const role = userData?.role;

                    if (role === "atendente") {
                        router.push("/scan_qrcode");
                    } else {
                        router.push("/management");
                    }
                } else {
                    Alert.alert("Erro", "Função do usuário não encontrada.");
                }
            }
            Alert.alert("Sucesso", "Login realizado com sucesso!");
            setFormData({ email: "", password: "" });
        } catch (err: any) {
            if (
                err.code === "auth/invalid-email" ||
                err.code === "auth/wrong-password"
            ) {
                Alert.alert(
                    "E-mail ou senha inválidos",
                    "Por favor, verifique seu e-mail e senha e tente novamente."
                );
                return;
            } else if (err.code === "auth/user-not-found") {
                Alert.alert(
                    "Usuário não encontrado",
                    "Nenhum usuário encontrado com o e-mail informado. Por favor, verifique e tente novamente."
                );
            } else {
                Alert.alert(
                    "Erro ao fazer login",
                    "Ocorreu um erro ao tentar fazer login. Verifique se já tem um cadastro."
                );
                return;
            }
        } finally {
            setLoading(false);
        }
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
                <Image
                    style={styles.reactLogo}
                    source={require("@/assets/images/partial-react-logo.png")}
                />
            }
        >
            <View style={styles.titleContainer}>
                <ThemedText type="title">Apae Eventos</ThemedText>
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
