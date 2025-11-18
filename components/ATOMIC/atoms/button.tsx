import React from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { colors } from "../../../app/styles/themes";
import { ButtonProps } from "../../../types/atoms";
import { styles } from "./button.style";

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
        const baseStyle: ViewStyle[] = [
            styles.button,
            styles[`button_${variant}`] || styles.button_primary, // fallback seguro
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
            styles[`buttonText_${variant}`] || styles.buttonText_primary, // fallback seguro
            styles[`buttonText_${size}`],
            textStyle,
        ];
    };

    const spinnerColor =
        variant === "outline"
            ? colors.primary
            : (styles[`buttonText_${variant}`] as any)?.color || "#fff";

    return (
        <TouchableOpacity
            style={[...getButtonStyle(), containerStyle]}
            disabled={disabled || loading}
            {...touchableOpacityProps}
        >
            {loading ? (
                <ActivityIndicator color={spinnerColor} size="small" />
            ) : (
                <Text style={getTextStyle()}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
