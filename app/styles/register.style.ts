import { StyleSheet } from "react-native";

/**
 * Styles for the admin and public register screens. The registerForm
 * no longer centers its content vertically; instead it starts near
 * the top, allowing KeyboardAvoidingView and ScrollView to push
 * the content up when necessary. The container retains centered
 * alignment for the header image, while the reactLogo maintains
 * its large dimensions.
 */
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
        justifyContent: "flex-start", // allow content to start at the top
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "black",
        marginBottom: 16,
    },
});