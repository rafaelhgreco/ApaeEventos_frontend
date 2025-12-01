import { Dimensions, StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    eventsBox: {
        height: Dimensions.get("window").height * 0.3,
        width: 400,
    },
    actionsBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
eventName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
},
eventItem: {
    marginBottom: 8,
},
    eventData: {
        fontSize: 14,
        color: "#777",
    },
    eventLocal: {
        fontSize: 14,
        color: "#777",
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
});
