import { StyleSheet } from "react-native";
import { colors, paddings, border, font, shadows } from "@/src/styles/themes";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: paddings.large,
        backgroundColor: colors.background,
    },

    /* -----------------------------
       BANNER DO EVENTO
    ------------------------------ */
    banner: {
        width: "100%",
        height: 220,
        borderRadius: border.radiusLarge,
        marginBottom: paddings.large,
        backgroundColor: colors.backgroundDark,
        ...shadows,
    },

    /* -----------------------------
       CARD PRINCIPAL
    ------------------------------ */
    box: {
        padding: paddings.large,
        backgroundColor: colors.backgroundLight,
        borderRadius: border.radiusLarge,
        marginBottom: paddings.large,
        ...shadows,
        shadowOpacity: 0.08,
        elevation: 4,
    },

    title: {
        fontSize: font.sizeExtraLarge,
        fontWeight: "800",
        color: colors.primary,
        marginBottom: paddings.small,
    },

    subtitle: {
        fontSize: font.sizeMedium,
        fontWeight: "600",
        color: colors.secondary,
        marginBottom: paddings.small,
    },

    date: {
        fontSize: font.sizeDefault,
        color: colors.textSecondary,
        marginBottom: paddings.small,
    },

    description: {
        fontSize: font.sizeDefault,
        color: colors.text,
        lineHeight: 22,
        marginTop: paddings.small,
    },

    /* -----------------------------
       LINHA DE INFO (ÍCONES)
    ------------------------------ */
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: paddings.small,
    },

    /* -----------------------------
       ERRO
    ------------------------------ */
    error: {
        color: colors.error,
        textAlign: "center",
        marginTop: paddings.large * 2,
        fontSize: font.sizeLarge,
        fontWeight: "600",
    },

    /* -----------------------------
       INPUTS E EDIÇÃO
    ------------------------------ */
    label: {
        fontSize: font.sizeDefault,
        fontWeight: "600",
        color: colors.text,
        marginTop: paddings.medium,
        marginBottom: paddings.xs,
    },

    input: {
        borderWidth: 1,
        borderColor: colors.borderLight,
        borderRadius: border.radiusMedium,
        padding: paddings.medium,
        fontSize: font.sizeDefault,
        color: colors.text,
        backgroundColor: colors.backgroundLight,
    },

    /* -----------------------------
       CHIPS
    ------------------------------ */
    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginTop: paddings.small,
    },

    chip: {
        backgroundColor: colors.backgroundLight,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },

    chipText: {
        fontSize: font.sizeSmall,
        color: colors.text,
    },

    priceChip: {
        backgroundColor: colors.successLight,
        borderColor: colors.success,
    },

    priceChipText: {
        fontSize: font.sizeSmall,
        fontWeight: "700",
        color: colors.successDark,
    },

    /* -----------------------------
       BOTÕES
    ------------------------------ */
    buttonBox: {
        marginTop: paddings.large,
        gap: paddings.medium,
    },
});

export default styles;
