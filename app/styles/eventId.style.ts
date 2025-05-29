import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: "#f5f8fc",
    },
    box: {
        padding: 24,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1f2937", // cinza escuro moderno
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#3b82f6", // azul vivo
        marginBottom: 6,
    },
    date: {
        fontSize: 16,
        color: "#6b7280", // cinza médio
        fontStyle: "italic",
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#374151", // texto principal
    },
    error: {
        color: "#dc2626", // vermelho forte
        textAlign: "center",
        marginTop: 40,
        fontSize: 16,
        fontWeight: "500",
    },
    buttonBox: {
        padding: 16,
        gap: 16,
    },
});

export default styles;
