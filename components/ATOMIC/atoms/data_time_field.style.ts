import { StyleSheet } from "react-native";
import { border, colors, font, paddings } from "../../../app/styles/themes";

export const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        fontSize: font.sizeMedium,
        marginBottom: paddings.small,
        color: colors.text,
    },
    dateField: {
        paddingVertical: paddings.large,
        paddingHorizontal: paddings.large,
        borderRadius: border.radiusLarge,
        justifyContent: "center",
        alignItems: "flex-start",
        borderWidth: 1,
        backgroundColor: colors.backgroundLight,
        borderColor: colors.borderLight,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 1.7,
        overflow: "visible",
    },
    dateText: {
        color: "#000",
        fontSize: font.sizeMedium,
        fontWeight: "500",
    },
});
