import { StyleSheet } from "react-native";
import { border, borderWidth, colors, font, paddings, shadows } from "./themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: paddings.large,
        backgroundColor: colors.background,
    },
    card: {
        backgroundColor: colors.backgroundLight,
        borderRadius: border.radiusLarge,
        padding: paddings.extraLarge,
        width: "100%",
        maxWidth: 400,
        ...shadows,
    },
    title: {
        fontSize: font.sizeExtraLarge,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
        marginBottom: paddings.medium,
    },
    eventInfo: {
        backgroundColor: colors.background,
        padding: paddings.medium,
        borderRadius: border.radiusMedium,
        marginBottom: paddings.medium,
        borderWidth: borderWidth.thin,
        borderColor: colors.borderLight,
    },
    eventName: {
        fontSize: font.sizeMedium,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: paddings.small,
    },
    quantityText: {
        fontSize: font.sizeSmall,
        color: colors.text,
        marginBottom: paddings.small,
    },
    paymentMethodText: {
        fontSize: font.sizeSmall,
        color: colors.primary,
        fontWeight: "500",
    },
    priceContainer: {
        alignItems: "center",
        marginBottom: paddings.extraLarge,
        paddingVertical: paddings.medium,
    },
    label: {
        fontSize: font.sizeMedium,
        color: colors.text,
        marginBottom: paddings.small,
    },
    valor: {
        fontSize: font.sizeExtraLarge * 1.5,
        fontWeight: "bold",
        color: colors.success,
    },
    loadingContainer: {
        marginVertical: paddings.large,
        alignItems: "center",
    },
    loadingText: {
        marginTop: paddings.medium,
        fontSize: font.sizeSmall,
        color: colors.text,
    },
    buttonContainer: {
        marginTop: paddings.medium,
        marginBottom: paddings.medium,
    },
    disclaimer: {
        fontSize: font.sizeSmall - 2,
        color: colors.text,
        textAlign: "center",
        marginTop: paddings.small,
        opacity: 0.7,
    },
});
