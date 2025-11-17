import { themeColors } from "@/app/styles/dashboard.style";
import { getIdToken } from "@/lib/cognito";
import { getEventReport, getUserEvents } from "@/services/chart_services";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        color: (opacity: number) => string;
        strokeWidth?: number;
    }[];
    legend?: string[];
}

interface UseDashboardController {
    loadChartData: () => Promise<void>;
}

interface UseDashboardReturn {
    controller: UseDashboardController;
    chartData: ChartData;
    loading: boolean;
}

export const useDashboard = (): UseDashboardReturn => {
    const [loading, setLoading] = useState<boolean>(true);
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [],
    });

    const loadChartData = async () => {
        try {
            setLoading(true);
            const token = await getIdToken();

            if (!token) {
                Alert.alert("Erro", "Você precisa estar autenticado");
                return;
            }

            const events = await getUserEvents(token);

            if (!events || events.length === 0) {
                setChartData({ labels: [], datasets: [] });
                return;
            }

            const labels: string[] = [];
            const totalData: number[] = [];
            const usedData: number[] = [];

            for (const event of events) {
                try {
                    const report = await getEventReport(event.id, token);
                    labels.push(event.nome.substring(0, 10));
                    totalData.push(report.total || 0);
                    usedData.push(report.usados || 0);
                } catch (error: any) {
                    if (error.response?.status === 404) {
                        console.log(
                            `ℹ️ Evento ${event.id} (${event.nome}) não tem relatório ainda`
                        );
                        labels.push(event.nome.substring(0, 10));
                        totalData.push(0);
                        usedData.push(0);
                    } else {
                        console.error(
                            `❌ Erro ao buscar relatório do evento ${event.id}:`,
                            error.message
                        );
                        labels.push(event.nome.substring(0, 10));
                        totalData.push(0);
                        usedData.push(0);
                    }
                }
            }

            if (labels.length === 0) {
                setChartData({ labels: [], datasets: [] });
                return;
            }

            const hasData =
                totalData.some((val) => val > 0) ||
                usedData.some((val) => val > 0);

            setChartData({
                labels,
                datasets: [
                    {
                        data: hasData ? totalData : totalData.map(() => 0.1),
                        color: (opacity = 1) =>
                            themeColors.blue.replace("1.0", `${opacity}`),
                        strokeWidth: 2,
                    },
                    {
                        data: hasData ? usedData : usedData.map(() => 0.1),
                        color: (opacity = 1) =>
                            themeColors.green.replace("1.0", `${opacity}`),
                        strokeWidth: 2,
                    },
                ],
                legend: ["Total Gerados", "Usados"],
            });
        } catch (error) {
            console.error("❌ Erro ao carregar dados do gráfico:", error);
            Alert.alert(
                "Erro",
                "Não foi possível carregar os dados do gráfico"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadChartData();
    }, []);

    const controller: UseDashboardController = {
        loadChartData,
    };

    return {
        controller,
        chartData,
        loading,
    };
};
