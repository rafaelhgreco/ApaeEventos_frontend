import { StyleSheet } from "react-native";
import { border } from "@/src/styles/themes";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2c3e50",
        marginBottom: 12,
    },

eventCard: {
    backgroundColor: "#fff",
    borderRadius: border.radiusLarge,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",

    minHeight: 160,   // 🔥 altura mínima, NÃO fixa
    overflow: "hidden",
},
    banner: {
        width: "100%",
        height: 110,        // 🔥 banner menor e proporcional
        borderRadius: 10,
        marginBottom: 8,
        backgroundColor: "#e5e5e5",
    },

    infoBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },

    infoText: {
        fontSize: 13,
        color: "#374151",
        fontWeight: "500",
    },

    errorText: {
        color: "#dc2626",
        textAlign: "center",
        fontSize: 16,
        marginVertical: 8,
    },

    buttonViewDetails: {
        marginTop: "auto",     // mantém o botão no final
        paddingTop: 4,
    },

    linkContainer: {
        marginTop: 10,
        alignItems: "center",
        marginBottom: 10,
    },

    linkBox: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#eef6ee",
    },

    link: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1c7c1b",
    },
});
