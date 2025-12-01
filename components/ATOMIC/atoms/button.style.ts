import { StyleSheet } from "react-native";
import {
    border,
    colors,
    font,
    shadows,
} from "@/src/styles/themes";

export const styles = StyleSheet.create({
    /* ----------------------------------------
       BASE DO BOTÃO
    ----------------------------------------- */
    buttonBase: {
        borderRadius: border.radiusLarge, // 12px
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    /* ----------------------------------------
       VARIANTS
    ----------------------------------------- */

    // 🎯 PRIMARY (mais destaque)
    button_primary: {
        backgroundColor: colors.primary,
        borderWidth: 0,
        ...shadows,
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },

    // 🟩 SECONDARY (ainda sólido, menos destaque)
    button_secondary: {
        backgroundColor: colors.secondary,
        borderWidth: 0,
        ...shadows,
        shadowOpacity: 0.10,
        shadowRadius: 5,
        elevation: 2,
    },

    // 🪄 OUTLINE — agora bonito, leve e elegante
    button_outline: {
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: colors.primary,
        shadowOpacity: 0,
        elevation: 0,
    },

    // 🌑 DARK
    button_dark: {
        backgroundColor: "#1f2937",
        borderWidth: 0,
        ...shadows,
        shadowOpacity: 0.10,
        elevation: 2,
    },

    /* ----------------------------------------
       SIZES
    ----------------------------------------- */

    button_small: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        minHeight: 40,
    },

    button_medium: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        minHeight: 48,
    },

    button_large: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        minHeight: 56,
    },

    /* ----------------------------------------
       DISABLED
    ----------------------------------------- */
    buttonDisabled: {
        opacity: 0.5,
    },

    /* ----------------------------------------
       TEXT BASE
    ----------------------------------------- */
    textBase: {
        fontWeight: "600",
        textAlign: "center",
        textAlignVertical: "center",
    },

    /* TEXT VARIANTS */
    text_primary: {
        color: colors.backgroundLight,
        fontSize: font.sizeDefault,
    },

    text_secondary: {
        color: colors.backgroundLight,
        fontSize: font.sizeDefault,
    },

    text_outline: {
        color: colors.primary,
        fontSize: font.sizeDefault,
        fontWeight: "700",
    },

    text_dark: {
        color: "#ffffff",
        fontSize: font.sizeDefault,
    },

    /* ----------------------------------------
       TEXT SIZES
    ----------------------------------------- */
    text_small: {
        fontSize: font.sizeSmall,
    },
    text_medium: {
        fontSize: font.sizeDefault,
    },
    text_large: {
        fontSize: font.sizeMedium,
    },
});
