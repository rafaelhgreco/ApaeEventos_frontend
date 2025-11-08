import { StyleSheet } from "react-native";
import { border, borderWidth, colors, font, paddings, shadows } from "./themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: paddings.large,
    },
    searchContainer: {
        padding: paddings.medium,
        backgroundColor: colors.backgroundLight,
        borderBottomWidth: borderWidth.thin,
        borderBottomColor: colors.borderLight,
        ...shadows,
    },
    listContent: {
        padding: paddings.medium,
    },
    card: {
        marginBottom: paddings.large,
        borderRadius: border.radiusLarge,
        backgroundColor: colors.backgroundLight,
        overflow: "hidden",
        ...shadows,
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        minHeight: 280,
    },
    cardHighlight: {
        marginLeft: paddings.small,
        borderLeftWidth: borderWidth.thick,
        borderLeftColor: colors.terceary,
        shadowOpacity: 0.15,
        elevation: 6,
    },
    eventBanner: {
        width: "100%",
        height: 160,
        backgroundColor: colors.borderLight,
    },
    eventBannerPlaceholder: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
    },
    bannerIcon: {
        fontSize: 48,
        opacity: 0.3,
        color: colors.text,
    },
    eventContent: {
        padding: paddings.medium,
    },
    eventTitle: {
        fontSize: font.sizeLarge,
        fontWeight: "700",
        color: colors.primary,
        marginBottom: paddings.small,
        lineHeight: font.sizeLarge * 1.3,
    },
    eventLocation: {
        fontSize: font.sizeMedium,
        color: colors.text,
        marginBottom: paddings.small,
        flexDirection: "row",
        alignItems: "center",
    },
    eventDate: {
        fontSize: font.sizeSmall,
        color: colors.text,
        flexDirection: "row",
        alignItems: "center",
    },
    eventMetadata: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: paddings.medium,
        paddingTop: paddings.medium,
        borderTopWidth: borderWidth.thin,
        borderTopColor: colors.borderLight,
    },
    eventCapacity: {
        fontSize: font.sizeSmall,
        color: colors.text,
    },
    eventPrice: {
        fontSize: font.sizeMedium,
        fontWeight: "600",
        color: colors.success,
    },
    loadingText: {
        marginTop: paddings.medium,
        fontSize: font.sizeMedium,
        color: colors.text,
    },
    errorIcon: {
        fontSize: 64,
        marginBottom: paddings.medium,
    },
    error: {
        color: colors.error,
        fontSize: font.sizeMedium,
        textAlign: "center",
        marginBottom: paddings.large,
        paddingHorizontal: paddings.large,
        fontWeight: "500",
    },
    retryButton: {
        backgroundColor: colors.button,
        paddingHorizontal: paddings.extraLarge,
        paddingVertical: paddings.medium,
        borderRadius: border.radiusMedium,
        ...shadows,
    },
    retryButtonText: {
        color: colors.backgroundLight,
        fontSize: font.sizeMedium,
        fontWeight: "600",
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: paddings.medium,
    },
    emptyTitle: {
        fontSize: font.sizeLarge,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: paddings.small,
        textAlign: "center",
    },
    emptySubtitle: {
        fontSize: font.sizeSmall,
        color: colors.text,
        textAlign: "center",
        paddingHorizontal: paddings.extraLarge,
        lineHeight: font.sizeSmall * 1.5,
    },
});
