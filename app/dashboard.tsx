import auth from "@react-native-firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Alert, Dimensions, ScrollView, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const API_URL = "http://35.247.231.143:3000"; // ajuste para seu backend

// Interfaces dos dados
interface EventData {
    id: string;
    nome: string;
    data: string;
    local: string;
    capacidade: number;
    bannerUrl: string;
}

interface ReportData {
    total: number;
    usados: number;
}

export const getUserEvents = async (token: string): Promise<EventData[]> => {
    const response = await axios.get(`${API_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getEventReport = async (
    eventId: string,
    token: string
): Promise<ReportData> => {
    const response = await axios.get(`${API_URL}/report/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export default function EventsChart() {
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState<{
        labels: string[];
        usados: number[];
        total: number[];
    }>({
        labels: [],
        usados: [],
        total: [],
    });

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                setLoading(true);
                try {
                    const token = await auth().currentUser?.getIdToken();
                    if (!token) {
                        Alert.alert("Erro", "Usuário não autenticado.");
                        setLoading(false);
                        return;
                    }

                    const events = await getUserEvents(token);

                    // Para cada evento, buscar relatório
                    const reportsPromises = events.map((ev) =>
                        getEventReport(ev.id, token)
                    );
                    const reports = await Promise.all(reportsPromises);

                    // Montar dados para o gráfico
                    const labels = events.map((e) => e.nome);
                    const usados = reports.map((r) => r.usados);
                    const total = reports.map((r) => r.total);

                    setChartData({ labels, usados, total });
                } catch (error) {
                    console.error(error);
                    Alert.alert("Erro", "Falha ao carregar dados.");
                } finally {
                    setLoading(false);
                }
            };

            loadData();
        }, [])
    );

    // Configuração do gráfico
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: { borderRadius: 16 },
    };

    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>
            <Text
                style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
                Relatório de Ingressos por Evento
            </Text>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <>
                    <Text style={{ marginBottom: 8 }}>Ingressos Usados</Text>
                    <BarChart
                        data={{
                            labels: chartData.labels,
                            datasets: [{ data: chartData.usados }],
                        }}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={chartConfig}
                        verticalLabelRotation={45}
                        fromZero
                        yAxisLabel={""}
                        yAxisSuffix={""}
                    />

                    <Text style={{ marginTop: 24, marginBottom: 8 }}>
                        Ingressos Totais
                    </Text>
                    <BarChart
                        data={{
                            labels: chartData.labels,
                            datasets: [{ data: chartData.total }],
                        }}
                        width={screenWidth - 32}
                        height={220}
                        chartConfig={{
                            ...chartConfig,
                            color: (opacity = 1) =>
                                `rgba(40, 167, 69, ${opacity})`,
                        }} // cor verde
                        verticalLabelRotation={45}
                        fromZero
                        yAxisLabel={""}
                        yAxisSuffix={""}
                    />
                </>
            )}
        </ScrollView>
    );
}
