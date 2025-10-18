import React, { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { colors } from "./styles/themes";

export default function CombinedEventsChart() {
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: {
            data: number[];
            color: (opacity: number) => string;
            strokeWidth?: number;
        }[];
        legend?: string[];
    }>({
        labels: [],
        datasets: [],
    });

    const colors = {
        background: "#F4F6F8",
        card: "#FFFFFF",
        textPrimary: "#2C3E50",
        textSecondary: "#8A8A8A",
        accent: "#3498DB",
        green: "rgba(46, 204, 113, 1.0)",
        blue: "rgba(52, 152, 219, 1.0)",
        shadow: "#000",
    };

    const newChartConfig = {
        backgroundGradientFrom: colors.card,
        backgroundGradientTo: colors.card,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(142, 142, 142, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: colors.accent,
        },
    };

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
        },
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Tendência de Ingressos</Text>
                    <Text style={styles.subtitle}>
                        Análise de ingressos gerados x Usados por evento
                    </Text>

                    <View style={styles.card}>
                        {loading ? (
                            <View style={styles.placeholderContainer}>
                                <ActivityIndicator
                                    size="large"
                                    color={colors.accent}
                                />
                                <Text style={styles.placeholderText}>
                                    Carregando dados...
                                </Text>
                            </View>
                        ) : chartData.labels.length > 0 ? (
                            <LineChart
                                data={chartData}
                                width={screenWidth - 64} // Ajustado para o padding do card
                                height={300}
                                chartConfig={newChartConfig}
                                verticalLabelRotation={45}
                                fromZero
                                bezier
                                style={styles.chart}
                            />
                        ) : (
                            <View style={styles.placeholderContainer}>
                                <Text style={styles.placeholderText}>
                                    Nenhum dado de evento para exibir.
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
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
        color: colors.primary,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: colors.primary,
        textAlign: "center",
        marginBottom: 24,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
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
        color: colors.secondary,
        textAlign: "center",
    },
});
