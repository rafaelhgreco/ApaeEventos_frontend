// App.tsx
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import AuthScreen from "../../components/auth_compoent";
import {
    getFirebaseAuth,
    initializeFirebaseApp,
} from "../../firebase/firebase";

export default function TesteScreen() {
    const [user, setUser] = React.useState<any>(null); // Estado para armazenar o usuário logado

    useEffect(() => {
        initializeFirebaseApp(); // Inicializa o Firebase aqui

        const auth = getFirebaseAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(
                "Auth state changed:",
                currentUser ? currentUser.email : "No user"
            );
        });

        return () => unsubscribe(); // Limpa o listener ao desmontar
    }, []);

    // Função para lidar com o logout
    const handleLogout = async () => {
        try {
            const auth = getFirebaseAuth();
            await signOut(auth);
            Alert.alert("Sucesso", "Você foi desconectado.");
        } catch (error: any) {
            console.error("Erro ao fazer logout:", error);
            Alert.alert(
                "Erro",
                `Não foi possível desconectar: ${error.message}`
            );
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <View style={styles.loggedInContainer}>
                    <Text style={styles.title}>Bem-vindo, {user.email}!</Text>
                    <Text style={styles.subtitle}>
                        Você está logado com sucesso.
                    </Text>
                    {/* Adicione o botão de Logout aqui */}
                    <Button
                        title="Sair da Conta"
                        onPress={handleLogout}
                        color="#FF6347"
                    />
                    {/* Aqui você renderizaria o conteúdo principal do seu app */}
                </View>
            ) : (
                <AuthScreen />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    loggedInContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: "center",
        color: "#666",
    },
});
