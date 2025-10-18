import React, { useState } from "react";
import {
    StyleProp,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import Icon from "../atoms/icon";
import { styles } from "./input.style"; // importe seu styles com StyleSheet

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isPassword?: boolean;
    secureTextEntry?: boolean;
}

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
                containerStyle={{ marginLeft: 8 }}
            />
        );
    };

    const renderLeftIcon = () => {
        if (!leftIcon) return null;
        return <View style={{ marginRight: 8 }}>{leftIcon}</View>;
    };

    const renderRightIcon = () => {
        if (isPassword) {
            return renderPasswordIcon();
        }
        if (!rightIcon) return null;
        return <View style={{ marginLeft: 8 }}>{rightIcon}</View>;
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={[styles.shadowWrapper]}>
                <View style={[styles.inputInnerContainer]}>
                    {renderLeftIcon()}

                    <TextInput
                        {...textInputProps}
                        style={[styles.inputIcon, inputStyle]}
                        secureTextEntry={isSecureEntry}
                        placeholderTextColor="#999"
                    />

                    {renderRightIcon()}
                </View>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default Input;
