import { StyleSheet } from "react-native";
import { border, colors, font, paddings } from "../../app/styles/themes";

export const styles = StyleSheet.create({
    title: {
        fontSize: font.sizeExtraLarge * 1.2,
        color: colors.primary,
        fontWeight: "700",
        textAlign: "center",
        marginTop: paddings.large * 1.5,
        marginBottom: paddings.large * 1.5,
        paddingHorizontal: paddings.large,
    },
    subTitle: {
        fontSize: font.sizeMedium * 1.1,
        color: colors.primary,
        textAlign: "center",
        marginBottom: paddings.large * 2,
        paddingHorizontal: paddings.large,
        lineHeight: font.sizeMedium,
    },
    container: {
        marginHorizontal: paddings.large,
        padding: paddings.large,
        backgroundColor: colors.backgroundLight,
        borderRadius: border.radiusLarge,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: paddings.large,
    },
});
