import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },
    eventCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    eventTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 6,
    },
    eventSubtitle: {
        fontSize: 16,
        color: "#3B82F6",
        marginBottom: 4,
    },
    eventDate: {
        fontSize: 16,
        color: "#6B7280",
    },
    priceBox: {
        backgroundColor: "#E5F3FF",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
    },
    priceText: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.primary,
    },
    priceValue: {
        fontWeight: "700",
        color: colors.primary,
    },
    totalText: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.primary,
        marginTop: 8,
    },
    totalValue: {
        fontWeight: "700",
        color: colors.success,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
    },
    loadingText: {
        fontSize: 18,
        color: "#6B7280",
        marginTop: 12,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 16,
    },
});
