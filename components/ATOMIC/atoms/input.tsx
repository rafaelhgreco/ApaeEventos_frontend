import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { InputProps } from "../../../types/atoms";
import Icon from "../atoms/icon";

const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    inputStyle,
    leftIcon,
    rightIcon,
    isPassword = false,
    secureTextEntry,
    ...textInputProps
}) => {
    const [isSecureEntry, setIsSecureEntry] = useState(
        isPassword || secureTextEntry
    );

    const togglePasswordVisibility = () => {
        setIsSecureEntry(!isSecureEntry);
    };

    const renderPasswordIcon = () => {
        if (!isPassword) return null;

        return (
            <Icon
                name={isSecureEntry ? "eye-off" : "eye"}
                size={20}
                color="#666"
                onPress={togglePasswordVisibility}
                containerStyle={styles.passwordIcon}
            />
        );
    };

    const renderLeftIcon = () => {
        if (!leftIcon) return null;
        return <View style={styles.leftIcon}>{leftIcon}</View>;
    };

    const renderRightIcon = () => {
        // Se é um campo de senha, prioriza o ícone de mostrar/ocultar
        if (isPassword) {
            return renderPasswordIcon();
        }

        if (!rightIcon) return null;
        return <View style={styles.rightIcon}>{rightIcon}</View>;
    };

    const getInputContainerStyle = () => {
        return [
            styles.inputContainer,
            error ? styles.inputContainerError : null,
        ];
    };

    const getInputStyle = () => {
        let baseStyle = [styles.input];
        if (leftIcon)
            baseStyle.push({ ...styles.input, ...styles.inputWithLeftIcon });
        if (rightIcon || isPassword)
            baseStyle.push({ ...styles.input, ...styles.inputWithRightIcon });
        return baseStyle;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={getInputContainerStyle()}>
                {renderLeftIcon()}

                <TextInput
                    style={[getInputStyle(), inputStyle]}
                    placeholderTextColor="#999"
                    secureTextEntry={isSecureEntry}
                    {...textInputProps}
                />

                {renderRightIcon()}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        minHeight: 48,
    },
    inputContainerError: {
        borderColor: "#e74c3c",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        paddingVertical: 12,
    },
    inputWithLeftIcon: {
        marginLeft: 8,
    },
    inputWithRightIcon: {
        marginRight: 8,
    },
    leftIcon: {
        marginRight: 4,
    },
    rightIcon: {
        marginLeft: 4,
    },
    passwordIcon: {
        marginLeft: 4,
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 14,
        marginTop: 4,
    },
});

export default Input;
