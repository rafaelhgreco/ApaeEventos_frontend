import { useLocalSearchParams } from "expo-router";

import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getFirebaseAuth } from "../../firebase/firebase"; // Adjust the import path as necessary
import { getEventReport, ReportData } from "../../services/report_services";
import { styles } from "./event_id.style";

export default function ReportScreen() {
    const [report, setReport] = useState<ReportData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const { eventId } = useLocalSearchParams();

    useEffect(() => {
        const fetchReport = async () => {
            console.log("Iniciando fetch do relatório...");
            try {
                if (!eventId) {
                    console.warn("eventId não definido.");
                    setError("ID do evento não encontrado.");
                    setLoading(false);
                    return;
                }

                const id = Array.isArray(eventId) ? eventId[0] : eventId;
                console.log("ID do evento ajustado:", id);

                const user = getFirebaseAuth().currentUser;
                const token = await user?.getIdToken();

                if (!token) {
                    console.warn("Usuário não autenticado.");
                    setError("Usuário não autenticado.");
                    setLoading(false);
                    return;
                }

                const data = await getEventReport(id, token);
                console.log("Dados do relatório:", data);
                setReport(data);
            } catch (error) {
                console.error("Erro ao carregar relatório:", error);
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
            <Text style={styles.title}>📊 Relatório do Evento</Text>
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
