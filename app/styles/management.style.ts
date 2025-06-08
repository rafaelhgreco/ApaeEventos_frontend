import { StyleSheet } from "react-native";
import { colors, paddings } from "../styles/themes"; // ajuste o caminho conforme o seu projeto

export const styles = StyleSheet.create({
    scrollContent: {
        padding: paddings.extraLarge,
        paddingBottom: 40, // espaço extra para scroll no final
    },
    innerContainer: {
        alignItems: "flex-start", // ou "flex-start" dependendo do layout
    },
    text: {
        fontSize: 20,
        color: colors.primary,
        marginBottom: 20,
        fontWeight: "600",
    },
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        padding: paddings.extraLarge,
    },
    error: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
    },
    greetingContainer: {
        marginTop: 20,
    },
    greeting: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFF8",
    },
    buttonContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: paddings.extraLarge,
    },
});

export default styles;
