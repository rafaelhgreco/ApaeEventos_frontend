import { getIdToken } from "@/lib/cognito";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getEventReport, ReportData } from "../../services/report_services";
import { styles } from "./event_id.style";

export default function ReportScreen() {
    const [report, setReport] = useState<ReportData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { eventId } = useLocalSearchParams();
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Relatório do Evento",
        });
    }, [navigation]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                if (!eventId) {
                    console.warn("eventId não definido.");
                    setError("ID do evento não encontrado.");
                    setLoading(false);
                    return;
                }

                const id = Array.isArray(eventId) ? eventId[0] : eventId;
                const numericId = parseInt(id, 10);

                const token = await getIdToken();

                if (!token) {
                    setError("Usuário não autenticado.");
                    setLoading(false);
                    return;
                }

                const data = await getEventReport(numericId, token);
                setReport(data);
            } catch (error) {
                setError("Erro ao carregar relatório.");
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
            <Text style={styles.title}>📊 Dados do evento</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Total de Ingressos</Text>
                <Text style={styles.value}>{report.total}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Ingressos Usados</Text>
                <Text style={styles.value}>{report.usados}</Text>
            </View>
        </View>
    );
}
