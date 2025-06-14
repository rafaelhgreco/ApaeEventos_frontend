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
    },
    errorText: {
        color: colors.error,
        fontSize: font.sizeSmall,
        marginTop: paddings.small,
    },
    shadowWrapper: {
        borderRadius: border.radiusLarge,
        backgroundColor: colors.backgroundLight,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        overflow: "visible",
    },
    inputInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: colors.borderLight,
        borderWidth: 1,
        borderRadius: border.radiusLarge,
        paddingHorizontal: paddings.large,
        minHeight: 48,
        backgroundColor: "transparent", // importante!
    },
});
