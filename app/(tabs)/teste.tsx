import type { FirebaseAuthTypes } from "@react-native-firebase/auth"; // Importar tipos do Firebase Auth
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { getFirebaseAuth } from "../../firebase/firebase"; // Ajuste o caminho se necessário

export default function TesteScreen() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null); // Tipagem para o usuário do Firebase
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); // Estado para controlar o carregamento
    const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro

    const auth: FirebaseAuthTypes.Module = getFirebaseAuth(); // Obtenha a instância do Auth

    useEffect(() => {
        // Listener para mudanças no estado de autenticação
        const subscriber = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                console.log("Usuário logado:", currentUser.email);
            } else {
                console.log("Nenhum usuário logado.");
            }
            setLoading(false); // Parar o carregamento uma vez que o estado é conhecido
        });

        // Retorna a função de unsubscribe para limpar o listener quando o componente for desmontado
        return subscriber;
    }, []);

    const handleSignUp = async () => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            Alert.alert("Sucesso", "Conta criada com sucesso!");
            setEmail("");
            setPassword("");
        } catch (err: any) {
            console.error("Erro ao criar conta:", err);
            // Mapeie códigos de erro do Firebase para mensagens amigáveis
            let errorMessage = "Erro ao criar conta.";
            if (err.code === "auth/email-already-in-use") {
                errorMessage = "Este e-mail já está em uso.";
            } else if (err.code === "auth/invalid-email") {
                errorMessage = "Formato de e-mail inválido.";
            } else if (err.code === "auth/weak-password") {
                errorMessage = "A senha é muito fraca (mínimo 6 caracteres).";
            } else {
                errorMessage = err.message; // Mensagem genérica do erro
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async () => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await auth.signInWithEmailAndPassword(email, password);
            Alert.alert("Sucesso", "Login realizado com sucesso!");
            setEmail("");
            setPassword("");
        } catch (err: any) {
            console.error("Erro ao fazer login:", err);
            // Mapeie códigos de erro do Firebase para mensagens amigáveis
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
                errorMessage = err.message; // Mensagem genérica do erro
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        try {
            await auth.signOut();
            Alert.alert("Sucesso", "Logout realizado com sucesso!");
        } catch (err: any) {
            console.error("Erro ao fazer logout:", err);
            setError(err.message || "Erro ao fazer logout.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teste de Autenticação Firebase</Text>

            {user ? ( // Se o usuário estiver logado
                <View style={styles.loggedInContainer}>
                    <Text style={styles.loggedInText}>
                        Logado como: {user.email}
                    </Text>
                    <Button
                        title={loading ? "Saindo..." : "Sair"}
                        onPress={handleSignOut}
                        disabled={loading}
                        color="#dc3545" // Cor para o botão de sair
                    />
                </View>
            ) : (
                // Se o usuário não estiver logado, mostra o formulário de login/cadastro
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>Acessar / Criar Conta</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        editable={!loading} // Desabilita input durante o carregamento
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha (mín. 6 caracteres)"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        editable={!loading} // Desabilita input durante o carregamento
                    />

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <View style={styles.buttonContainer}>
                        <Button
                            title={loading ? "Entrando..." : "Entrar"}
                            onPress={handleSignIn}
                            disabled={loading}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={loading ? "Cadastrando..." : "Criar Conta"}
                            onPress={handleSignUp}
                            disabled={loading}
                            color="#28a745" // Cor para o botão de criar conta
                        />
                    </View>

                    {loading && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
        color: "#555",
    },
    formContainer: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 10,
        width: "100%",
    },
    errorText: {
        color: "red",
        marginBottom: 15,
        textAlign: "center",
        fontSize: 14,
    },
    loggedInContainer: {
        backgroundColor: "#e6ffe6",
        padding: 30,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    loggedInText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#28a745",
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject, // Cobre todo o container pai
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8, // Para combinar com o formContainer
    },
});
