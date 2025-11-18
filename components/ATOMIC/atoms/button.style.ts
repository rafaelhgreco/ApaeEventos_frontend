import { StyleSheet } from "react-native";
import {
    border,
    borderWidth,
    colors,
    font,
    paddings,
} from "../../../app/styles/themes";

export const styles = StyleSheet.create({
    button: {
        borderRadius: border.radiusMedium,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    // 🔥 VARIANTS
    button_primary: {
        backgroundColor: colors.primary,
        borderWidth: 0,
    },
    button_secondary: {
        backgroundColor: colors.secondary,
        borderWidth: 0,
    },
    button_outline: {
        backgroundColor: "transparent",
        borderWidth: borderWidth.thin,
        borderColor: colors.primary,
    },

    // 🟦 NOVO VARIANT — DARK (azul escuro elegante)
    button_dark: {
        backgroundColor: "#1f2937", // Navy/Slate
        borderWidth: 0,
        borderColor: "#1f2937",
    },

    // SIZES
    button_small: {
        paddingHorizontal: paddings.medium * 1.5,
        paddingVertical: paddings.small * 3,
        minHeight: 32,
    },
    button_medium: {
        paddingHorizontal: paddings.large,
        paddingVertical: paddings.medium * 1.5,
        minHeight: 44,
    },
    button_large: {
        paddingHorizontal: paddings.extraLarge,
        paddingVertical: paddings.large,
        minHeight: 52,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    // TEXT BASE
    buttonText: {
        fontWeight: "500",
        textAlign: "center",   
    textAlignVertical: "center",
    },

    // TEXT VARIANTS
    buttonText_primary: {
        color: colors.backgroundLight,
        fontSize: font.sizeDefault,
    },
    buttonText_secondary: {
        color: colors.backgroundLight,
        fontSize: font.sizeDefault,
    },
    buttonText_outline: {
        color: colors.primary,
        fontSize: font.sizeDefault,
    },

    // 🟦 TEXTO DO VARIANT DARK
    buttonText_dark: {
        color: "#ffffff",
        fontSize: font.sizeDefault,
    },

    // TEXT SIZES
    buttonText_small: {
        fontSize: font.sizeSmall,
    },
    buttonText_medium: {
        fontSize: font.sizeDefault,
    },
    buttonText_large: {
        fontSize: font.sizeMedium,
    },
});
