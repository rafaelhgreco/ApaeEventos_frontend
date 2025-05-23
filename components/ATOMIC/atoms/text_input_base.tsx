import { border, colors, paddings } from "@/styles/themes";
import React from "react";
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

interface TextInputBaseProps extends TextInputProps {
    rightElement?: React.ReactNode;
    containerStyle?: ViewStyle;
}

export const TextInputBase: React.FC<TextInputBaseProps> = ({
    style,
    rightElement,
    containerStyle,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor={colors.text}
                {...props}
            />
            {rightElement && (
                <View style={styles.rightElement}>{rightElement}</View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.primary,
        paddingHorizontal: paddings.medium,
        borderRadius: border.radiusMedium,
        marginBottom: paddings.large,
    },
    input: {
        flex: 1,
        paddingVertical: paddings.medium,
        fontSize: 16,
        color: colors.text,
    },
    rightElement: {
        paddingLeft: paddings.small,
    },
});
