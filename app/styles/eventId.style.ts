import { StyleSheet } from "react-native";
import { border, colors, font } from "../../app/styles/themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: colors.background,
    },
    box: {
        padding: 24,
        backgroundColor: colors.backgroundLight,
        borderRadius: border.radiusLarge,
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
        color: "#1f2937",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#3b82f6",
        marginBottom: 6,
    },
    date: {
        fontSize: font.sizeLarge,
        color: "#6b7280",
        fontStyle: "italic",
        marginBottom: 16,
    },
    description: {
        fontSize: font.sizeLarge,
        lineHeight: 24,
        color: "#374151",
    },
    error: {
        color: "#dc2626",
        textAlign: "center",
        marginTop: 40,
        fontSize: font.sizeLarge,
        fontWeight: "500",
    },
    buttonBox: {
        padding: 16,
        gap: 16,
    },
});

export default styles;
