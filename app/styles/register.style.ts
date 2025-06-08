import { StyleSheet } from "react-native";
import { border } from "./themes";

export const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        width: 518,
        height: 316,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#001122",
    },
    registerForm: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: border.radiusMedium,
    },
});
