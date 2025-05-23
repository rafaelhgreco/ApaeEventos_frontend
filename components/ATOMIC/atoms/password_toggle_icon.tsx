import { colors } from "@/styles/themes";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

interface PasswordToggleIconProps {
    visible: boolean;
    onPress: () => void;
}

export const PasswordToggleIcon: React.FC<PasswordToggleIconProps> = ({
    visible,
    onPress,
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Feather
                name={visible ? "eye" : "eye-off"}
                size={20}
                color={colors.text}
            />
        </TouchableOpacity>
    );
};
