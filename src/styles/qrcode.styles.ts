import { StyleSheet } from "react-native";
import { border, colors, font, paddings } from "@/src/styles/themes";

export const styles = StyleSheet.create({
    title: {
        fontSize: font.sizeExtraLarge * 1.3,
        color: colors.primary,
        fontWeight: "800",
        textAlign: "center",
        marginTop: paddings.large * 1.5,
        marginBottom: paddings.large * 1.5,
        paddingHorizontal: paddings.large,
    },

    card: {
        marginHorizontal: paddings.large,
        padding: paddings.large * 1.3,
        backgroundColor: colors.backgroundLight,
        borderRadius: border.radiusLarge,
        elevation: 6,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,

        marginBottom: paddings.large * 1.5,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: paddings.medium,
    },

    cardTitle: {
        fontSize: font.sizeLarge,
        fontWeight: "700",
        color: colors.textDark,
    },

    subTitle: {
        fontSize: font.sizeMedium * 1.05,
        color: colors.textMuted,
        lineHeight: font.sizeMedium * 1.4,
        marginBottom: paddings.large * 1.8,
        paddingRight: paddings.small,
    },

    icon: {
        color: colors.primary,
    },
});
