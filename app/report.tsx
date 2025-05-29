import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getEventReport, ReportData } from "../services/report_services";

export default function ReportScreen() {
    const { eventId } = useLocalSearchParams<{ eventId: string }>();
    const [report, setReport] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            if (!eventId) return;
            try {
                const data = await getEventReport(eventId);
                setReport(data);
            } catch (error) {
                console.error("Erro ao carregar relatório:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [eventId]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!report) {
        return (
            <View style={styles.container}>
                <Text>Erro ao carregar dados do relatório.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatório do Evento</Text>
            <Text style={styles.text}>
                Total de Ingressos: {report.totalTickets}
            </Text>
            <Text style={styles.text}>
                Ingressos Usados: {report.usedTickets}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        marginBottom: 8,
    },
});
