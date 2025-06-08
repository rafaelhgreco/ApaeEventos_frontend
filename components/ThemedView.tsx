import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
};

export function ThemedView({
    style,
    lightColor = "#fff",
    ...otherProps
}: ThemedViewProps) {
    return (
        <View
            style={[{ backgroundColor: lightColor }, style]}
            {...otherProps}
        />
    );
}
