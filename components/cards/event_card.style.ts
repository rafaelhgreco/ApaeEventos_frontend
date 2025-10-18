import { Dimensions, StyleSheet } from "react-native";
import { border, colors } from "../../app/styles/themes"; // ajuste o caminho conforme sua estrutura

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: Dimensions.get("window").height * 0.3,
        width: 350,
        maxHeight: 250,
        backgroundColor: "#fff",
        borderRadius: border.radiusLarge,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    actionsBox: {
        marginTop: 10,
        flex: 1,
        padding: 20,
        width: 350,
        maxHeight: 250,
        borderRadius: border.radiusLarge,
    },
    buttonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: "48%",
        marginBottom: 10,
        minHeight: 100,
    },
    button: {
        width: "100%",
        height: 100,
        borderRadius: border.radiusMedium,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 1.7,
        overflow: "visible",
    },
    buttonEvent: {
        backgroundColor: "green",
    },
    buttonDashboard: {
        backgroundColor: "orange",
    },
    buttonReports: {
        backgroundColor: "gray",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
    link: {
        fontSize: 16,
        fontWeight: "bold",
        color: "green",
        textDecorationLine: "underline",
    },
    linkBox: {
        padding: 10,
        alignSelf: "flex-end",
    },
    eventItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
});
