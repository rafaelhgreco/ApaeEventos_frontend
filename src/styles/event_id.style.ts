import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 24,
    },
    card: {
        backgroundColor: "#fff",
        width: "90%",
        padding: 20,
        borderRadius: 12,
        marginBottom: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    label: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
    },
    value: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2e7d32", // verde escuro
    },
});
