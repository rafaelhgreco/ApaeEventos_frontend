import { chartConfig, screenWidth, styles, themeColors } from '@/app/styles/dashboard.style';

import DashboardTabs from '@/components/dashboard/DashboardTabs';
import EventSelect from '@/components/dashboard/EventSelect';
import { useDashboard } from '@/hooks/use-dashboard';

import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  const [tab, setTab] = useState<'geral' | 'evento'>('geral');

  const {
    chartData,
    loading,
    eventsList,
    selectedEvent,
    selectedEventId,
    setSelectedEventId,
    checkins,
  } = useDashboard();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Dashboard 🎛️' });
  }, [navigation]);

  useEffect(() => {
    if (tab === 'evento' && eventsList.length > 0 && !selectedEventId) {
      setSelectedEventId(eventsList[0].event_id);
    }
  }, [tab, eventsList, selectedEventId, setSelectedEventId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <DashboardTabs onChange={setTab} />

        {/* ================================================= */}
        {/*                 VISÃO GERAL                      */}
        {/* ================================================= */}
        {tab === 'geral' && (
          <View style={styles.container}>
            <Text style={styles.title}>Resumo de Todos os Eventos</Text>

            {/* --- CARDS --- */}
            <View style={styles.cardsRow}>
              <View style={styles.cardSmall}>
                <Text style={styles.cardLabel}>Total Emitidos</Text>
                <Text style={styles.cardValue}>
                  {eventsList.reduce((acc, e) => acc + (e.tickets_issued || 0), 0)}
                </Text>
              </View>

              <View style={styles.cardSmall}>
                <Text style={styles.cardLabel}>Total Usados</Text>
                <Text style={styles.cardValue}>
                  {Number(eventsList.reduce((acc, e) => acc + (e.tickets_used || 0), 0))}
                </Text>
              </View>
            </View>

            {/* --- GRÁFICO GLOBAL (melhor com barras) --- */}
            <View style={styles.card}>
              {loading || !chartData?.labels?.length ? (
                <View style={styles.placeholderContainer}>
                  <ActivityIndicator size="large" color={themeColors.accent} />
                  <Text style={styles.placeholderText}>Carregando dados...</Text>
                </View>
              ) : (
                <BarChart
                  data={chartData}
                  width={screenWidth - 64}
                  height={300}
                  chartConfig={chartConfig}
                  verticalLabelRotation={45}
                  fromZero
                  yAxisLabel=""
                  yAxisSuffix=""
                  style={styles.chart}
                />
              )}
            </View>
          </View>
        )}

        {/* ================================================= */}
        {/*                VISÃO POR EVENTO                  */}
        {/* ================================================= */}
        {tab === 'evento' && selectedEvent && (
          <View style={styles.container}>
            {/* SELETOR DE EVENTO */}
            <EventSelect
              events={eventsList}
              selectedId={selectedEventId}
              onChange={(id: number) => setSelectedEventId(id)}
            />

            <Text style={styles.title}>{selectedEvent.event_name}</Text>

            {/* --- CARDS DETALHES --- */}
            <View style={styles.cardsRow}>
              <View style={styles.cardSmall}>
                <Text style={styles.cardLabel}>Emitidos</Text>
                <Text style={styles.cardValue}>{selectedEvent.tickets_issued}</Text>
              </View>

              <View style={styles.cardSmall}>
                <Text style={styles.cardLabel}>Usados</Text>
                <Text style={styles.cardValue}>{selectedEvent.tickets_used}</Text>
              </View>

              <View style={styles.cardSmall}>
                <Text style={styles.cardLabel}>Check-ins</Text>
                <Text style={styles.cardValue}>{checkins?.unique_tickets_scanned || 0}</Text>
              </View>
            </View>

            {/* --- GRÁFICO DO EVENTO --- */}
            <View style={styles.card}>
              {loading ? (
                <View style={styles.placeholderContainer}>
                  <ActivityIndicator size="large" color={themeColors.accent} />
                  <Text style={styles.placeholderText}>Carregando dados...</Text>
                </View>
              ) : !chartData.labels.length ? (
                <View style={styles.placeholderContainer}>
                  <Text style={styles.placeholderText}>Nenhum check-in registrado ainda</Text>
                </View>
              ) : (
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
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
