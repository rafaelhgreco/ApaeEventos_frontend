import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9", // fundo claro suave
    },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginTop: 40, // espaçamento acima para destaque
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        // sombra para iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // elevação para Android
        elevation: 3,
    },
});

export default styles;
