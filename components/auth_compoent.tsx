import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getFirebaseAuth } from "../firebase/firebase";

const AuthScreen: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false); // Para alternar entre Login e Registro

    const auth = getFirebaseAuth(); // Obtém a instância de autenticação

    const handleAuth = async () => {
        setLoading(true);
        try {
            if (isRegistering) {
                // Lógica de Registro
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert(
                    "Sucesso",
                    "Conta criada e login efetuado com sucesso!"
                );
            } else {
                // Lógica de Login
                await signInWithEmailAndPassword(auth, email, password);
                Alert.alert("Sucesso", "Login efetuado com sucesso!");
            }
        } catch (error: any) {
            console.error("Erro de autenticação:", error.code, error.message);
            let errorMessage = "Ocorreu um erro. Tente novamente.";

            // Mapeamento de erros comuns do Firebase
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "Este e-mail já está em uso.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Formato de e-mail inválido.";
                    break;
                case "auth/weak-password":
                    errorMessage = "A senha deve ter pelo menos 6 caracteres.";
                    break;
                case "auth/user-not-found":
                    errorMessage =
                        "Usuário não encontrado. Verifique suas credenciais.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Senha incorreta.";
                    break;
                case "auth/too-many-requests":
                    errorMessage =
                        "Muitas tentativas de login. Tente novamente mais tarde.";
                    break;
                default:
                    errorMessage = `Erro: ${error.message}`;
                    break;
            }
            Alert.alert("Erro de Autenticação", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isRegistering ? "Criar Conta" : "Login"}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleAuth}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        {isRegistering ? "Registrar" : "Entrar"}
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsRegistering(!isRegistering)}
            >
                <Text style={styles.switchButtonText}>
                    {isRegistering
                        ? "Já tenho uma conta? Faça login"
                        : "Não tenho uma conta? Crie uma"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        width: "100%",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    input: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: "100%",
        backgroundColor: "#6200EE",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    switchButton: {
        marginTop: 10,
        padding: 10,
    },
    switchButtonText: {
        color: "#6200EE",
        fontSize: 16,
    },
});

export default AuthScreen;
