import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    footer: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 8,
    },
    modal: {
        flex: 1,
        backgroundColor: "#000",
    },
    cameraView: {
        flex: 1,
    },
    scanTip: {
        position: "absolute",
        top: 40,
        alignSelf: "center",
        backgroundColor: "#ffffffee",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 17,
        fontWeight: "500",
        color: "#222",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
    },
});

export default styles;
