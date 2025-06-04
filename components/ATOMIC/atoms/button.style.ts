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

    // Variants
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

    // Sizes
    button_small: {
        paddingHorizontal: paddings.medium * 1.5, // 12
        paddingVertical: paddings.small * 3, // 12
        minHeight: 32,
    },
    button_medium: {
        paddingHorizontal: paddings.large, // 16
        paddingVertical: paddings.medium * 1.5, // 12
        minHeight: 44,
    },
    button_large: {
        paddingHorizontal: paddings.extraLarge, // 24
        paddingVertical: paddings.large, // 16
        minHeight: 52,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    // Text styles
    buttonText: {
        fontWeight: "500",
    },
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
