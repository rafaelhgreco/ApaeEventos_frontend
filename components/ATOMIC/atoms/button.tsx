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
    disabled = false,
    containerStyle,
    textStyle,
    ...props
}) => {
    const getButtonStyle = (): ViewStyle[] => {
        const base: ViewStyle[] = [
            styles.buttonBase,
            styles[`button_${variant}`],
            styles[`button_${size}`],
        ];

        if (disabled || loading) base.push(styles.buttonDisabled);

        return base;
    };

    const getTextStyle = () => [
        styles.textBase,
        styles[`text_${variant}`],
        styles[`text_${size}`],
        textStyle,
    ];

    const spinnerColor =
        variant === "outline" ? colors.primary : styles[`text_${variant}`]?.color;

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[...getButtonStyle(), containerStyle]}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color={spinnerColor} />
            ) : (
                <Text style={getTextStyle()}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
