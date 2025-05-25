import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { ButtonProps } from "../../../types/atoms";

const Button: React.FC<ButtonProps> = ({
    label,
    variant = "primary",
    size = "medium",
    loading = false,
    containerStyle,
    textStyle,
    disabled,
    ...touchableOpacityProps
}) => {
    const getButtonStyle = () => {
        const baseStyle: Array<ViewStyle> = [
            // Import ViewStyle from 'react-native'
            styles.button,
            styles[`button_${variant}`],
            styles[`button_${size}`],
        ];
        if (disabled || loading) {
            baseStyle.push(styles.buttonDisabled);
        }
        return baseStyle;
    };

    const getTextStyle = () => {
        return [
            styles.buttonText,
            styles[`buttonText_${variant}`],
            styles[`buttonText_${size}`],
        ];
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), containerStyle]}
            disabled={disabled || loading}
            {...touchableOpacityProps}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === "outline" ? "#007AFF" : "#fff"}
                    size="small"
                />
            ) : (
                <Text style={[getTextStyle(), textStyle]}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    // Variants
    button_primary: {
        backgroundColor: "#007AFF",
    },
    button_secondary: {
        backgroundColor: "#6c757d",
    },
    button_outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#007AFF",
    },

    // Sizes
    button_small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 32,
    },
    button_medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 44,
    },
    button_large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 52,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    // Text styles
    buttonText: {
        fontWeight: "600",
        fontSize: 16,
    },
    buttonText_primary: {
        color: "#fff",
    },
    buttonText_secondary: {
        color: "#fff",
    },
    buttonText_outline: {
        color: "#007AFF",
    },
    buttonText_small: {
        fontSize: 14,
    },
    buttonText_medium: {
        fontSize: 16,
    },
    buttonText_large: {
        fontSize: 18,
    },
});

export default Button;
