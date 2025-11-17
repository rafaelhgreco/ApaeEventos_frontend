import {
    chartConfig,
    screenWidth,
    styles,
    themeColors,
} from "@/app/styles/dashboard.style";
import { useDashboard } from "@/hooks/use-dashboard";
import { useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function CombinedEventsChart() {
    const { chartData, loading } = useDashboard();
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({ title: "Dashboard Eventos" });
    }, [navigation]);

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
                                    color={themeColors.accent}
                                />
                                <Text style={styles.placeholderText}>
                                    Carregando dados...
                                </Text>
                            </View>
                        ) : chartData.labels.length > 0 ? (
                            <LineChart
                                data={chartData}
                                width={screenWidth - 64}
                                height={300}
                                chartConfig={chartConfig}
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
