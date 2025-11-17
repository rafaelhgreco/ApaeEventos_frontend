import { Dimensions, StyleSheet } from "react-native";

export const themeColors = {
    background: "#F4F6F8",
    card: "#FFFFFF",
    primary: "#2C3E50",
    secondary: "#8A8A8A",
    accent: "#3498DB",
    green: "rgba(46, 204, 113, 1.0)",
    blue: "rgba(52, 152, 219, 1.0)",
    shadow: "#000",
};

export const chartConfig = {
    backgroundGradientFrom: themeColors.card,
    backgroundGradientTo: themeColors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(142, 142, 142, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: themeColors.accent,
    },
};

export const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: themeColors.background,
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: themeColors.primary,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: themeColors.primary,
        textAlign: "center",
        marginBottom: 24,
    },
    card: {
        backgroundColor: themeColors.card,
        borderRadius: 16,
        padding: 16,
        shadowColor: themeColors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        minHeight: 350,
        justifyContent: "center",
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    placeholderText: {
        marginTop: 16,
        fontSize: 16,
        color: themeColors.secondary,
        textAlign: "center",
    },
});
