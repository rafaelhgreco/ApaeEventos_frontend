import { StyleSheet } from "react-native";
import { colors, font, paddings } from "@/src/styles/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: paddings.large,
        backgroundColor: colors.background,
    },

    title: {
        fontSize: font.sizeExtraLarge,
        fontWeight: "700",
        color: colors.primary,
        marginBottom: paddings.large,
    },

    groupTitle: {
        fontSize: font.sizeLarge,
        fontWeight: "700",
        color: colors.primary,
        marginBottom: paddings.small,
    },

    groupDescription: {
        fontSize: font.sizeSmall,
        color: colors.text,
        marginBottom: paddings.medium,
        opacity: 0.7,
    },

    descriptionText: {
        marginTop: 4,
        fontSize: font.sizeSmall,
        color: colors.text,
        opacity: 0.6,
    },
});
