import { StyleSheet } from "react-native";
import { colors, paddings } from "../styles/themes"; // ajuste o caminho conforme o seu projeto

export const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    text: {
        fontSize: 20,
        color: colors.primary,
        marginBottom: 20,
        fontWeight: "600", // 'semibold' não é um valor válido em RN, usar '600' ou 'bold'
    },
    buttonContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: paddings.extraLarge,
    },
});

export default styles;
