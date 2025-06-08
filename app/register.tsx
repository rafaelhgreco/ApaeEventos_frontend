import Icon from "@/components/ATOMIC/atoms/icon";
import GenericForm from "@/components/ATOMIC/molecules/form";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getFirebaseAuth } from "@/firebase/firebase";
import { FormField } from "@/types/molecules";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, Text } from "react-native";
import { styles } from "./styles/register.style";

export default function RegisterScreen() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const auth: FirebaseAuthTypes.Module = getFirebaseAuth();

    const router = useRouter();

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Criar novo usuário",
        });
    }, [navigation]);

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
        setError(null);
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(
                formData.email,
                formData.password
            );

            const uid = userCredential.user.uid;

            await firestore().collection("users").doc(uid).set({
                uid: uid,
                nome: formData.nome,
                email: formData.email,
                role: formData.role,
                createdAt: new Date().toISOString(),
            });

            Alert.alert("Sucesso", "Conta criada com sucesso!");
            setFormData({
                email: "",
                password: "",
                nome: "",
                role: "",
            });
            router.push("/");
        } catch (err: any) {
            if (err.code === "auth/email-already-in-use") {
                Alert.alert(
                    "E-mail já cadastrado",
                    "O e-mail informado já está em uso."
                );
            } else if (err.code === "auth/invalid-email") {
                Alert.alert(
                    "E-mail inválido",
                    "O e-mail informado não é válido."
                );
            } else if (err.code === "auth/weak-password") {
                Alert.alert("Senha fraca", "Escolha uma senha mais forte.");
            } else {
                Alert.alert("Erro ao criar conta", "Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
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
            type: "input",
            key: "role",
            props: {
                label: "Função",
                placeholder: "ex: Atendende",
                value: formData.role,
                onChangeText: handleInputChange("role"),
                leftIcon: (
                    <Icon name="briefcase-outline" color="#007AFF" size={20} />
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
