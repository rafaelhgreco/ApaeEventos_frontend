import { StyleSheet } from "react-native";
import {
    border,
    borderWidth,
    colors,
    font,
    paddings,
} from "../../../app/styles/themes";

export const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        fontSize: font.sizeMedium,
        marginBottom: paddings.small,
        color: colors.text,
    },
    dateField: {
        borderWidth: borderWidth.thin,
        borderColor: colors.borderLight,
        padding: paddings.large,
        borderRadius: border.radiusMedium,
        justifyContent: "center",
        backgroundColor: colors.backgroundLight,
    },
});
