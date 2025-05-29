import { StyleSheet } from "react-native";
import { border, colors, paddings } from "../styles/themes";

export const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: paddings.medium, // gap não é suportado no RN, vou sugerir margem nos itens se quiser
    },
    stepContainer: {
        // gap não é suportado, veja comentário acima
        marginBottom: paddings.medium,
    },
    reactLogo: {
        height: 178,
        width: 290,
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    loginForm: {
        flex: 1,
        justifyContent: "center",
        padding: paddings.large,
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: border.radiusMedium,
    },
});
