import { StyleSheet } from "react-native";
import { colors, paddings } from "../../../app/styles/themes";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: paddings.large,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: paddings.extraLarge,
        textAlign: "center",
    },
});
