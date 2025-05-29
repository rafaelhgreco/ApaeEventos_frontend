import React from "react";
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { ButtonProps } from "../../../types/atoms";
import { styles } from "./button.style"; // Adjust the import path as necessary

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

export default Button;
