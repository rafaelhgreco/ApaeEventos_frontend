import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconProps } from "../../../types/atoms";

const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = "#666",
    containerStyle,
    onPress,
    ...touchableProps
}) => {
    if (!onPress) {
        // Ícone não clicável
        return (
            <View style={[styles.iconContainer, containerStyle]}>
                <Ionicons name={name as any} size={size} color={color} />
            </View>
        );
    }

    // Ícone clicável
    return (
        <TouchableOpacity
            style={[styles.iconContainer, containerStyle]}
            onPress={onPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            {...touchableProps}
        >
            <Ionicons name={name as any} size={size} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Icon;
