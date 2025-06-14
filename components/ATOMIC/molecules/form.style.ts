import { StyleSheet } from "react-native";
import { colors, paddings } from "../../../app/styles/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: paddings.large,
    },
    title: {
        fontSize: 32,
        fontWeight: "600",
        color: colors.text,
        marginBottom: paddings.extraLarge,
        textAlign: "left",
    },
});
