import { StyleSheet } from "react-native";
import { colors } from "./themes";
export const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: colors.primary,
        marginBottom: 20,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 20,
        padding: 16,
    },
    subTitle: {
        fontSize: 16,
        color: colors.text,
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 16,
    },
    container: {
        margin: 16,
        padding: 16,
    },
});
