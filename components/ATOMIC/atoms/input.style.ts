import { StyleSheet } from "react-native";
import { border, colors, font, paddings } from "../../../app/styles/themes";

export const styles = StyleSheet.create({
    container: {
        marginBottom: paddings.large,
    },
    label: {
        fontSize: font.sizeMedium,
        fontWeight: "600",
        color: colors.text,
        marginBottom: paddings.medium,
    },
    inputIcon: {
        flex: 1,
        fontSize: font.sizeMedium,
        color: colors.text,
        paddingVertical: 12,
        // marginLeft and marginRight should be set dynamically in the component
    },
    errorText: {
        color: colors.error,
        fontSize: font.sizeSmall,
        marginTop: paddings.small,
    },
});

export const inputContainerStyle = (hasError: boolean) => ({
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: hasError ? colors.error : colors.borderLight,
    borderRadius: border.radiusMedium,
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: paddings.large,
    minHeight: 48,
});
