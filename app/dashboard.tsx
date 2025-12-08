import { styles } from '@/src/styles/dashboard.style';

import DashboardTabs from '@/components/dashboard/DashboardTabs';
import EventSelect from '@/components/dashboard/EventSelect';

import CheckinsTimelineChart from '@/components/dashboard/charts/CheckinsTimelineChart';
import DonutChart from '@/components/dashboard/charts/DonutChart';

// ⭐ NOVOS COMPONENTES MODERNOS
import KpiCard from '@/components/dashboard/modern/KpiCard';
import NextEventCard from '@/components/dashboard/modern/NextEventCard';
import SystemStatus from '@/components/dashboard/modern/SystemStatus';
import TopEventsList from '@/components/dashboard/modern/TopEventsList';
import TrendingSparkline from '@/components/dashboard/modern/TrendingSparkline';

import { useDashboard } from '@/hooks/use-dashboard';

import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function DashboardScreen() {
  const [tab, setTab] = useState<'geral' | 'evento'>('geral');

  const {
    loading,
    eventsList,
    selectedEvent,
    selectedEventId,
    setSelectedEventId,
    checkins,
    timeline,
  } = useDashboard();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Dashboard 🎛️' });
  }, [navigation]);

  // Auto-seleciona um evento quando a aba muda para "evento"
  useEffect(() => {
    if (tab === 'evento' && eventsList.length > 0 && !selectedEventId) {
      setSelectedEventId(eventsList[0].event_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, eventsList, selectedEventId]);

  const totalIssued = eventsList.reduce((acc, e) => acc + (e.tickets_issued || 0), 0);
  const totalUsed = eventsList.reduce((acc, e) => acc + (e.tickets_used || 0), 0);
  const globalUsageRate = totalIssued > 0 ? Math.round((totalUsed / totalIssued) * 100) : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <DashboardTabs onChange={setTab} />

        {/* ================================================= */}
        {/*                 VISÃO GERAL                      */}
        {/* ================================================= */}
        {tab === 'geral' && (
          <View style={styles.container}>
            {/* ⭐ HERO DO PRÓXIMO EVENTO */}
            <NextEventCard events={eventsList} />

            {/* ⭐ KPIs BONITOS */}
            <View style={styles.kpiRow}>
              <KpiCard label="Total Emitidos" value={totalIssued} icon="tag" />
              <KpiCard label="Total Usados" value={totalUsed} icon="check-circle" />
              <KpiCard label="Utilização" value={`${globalUsageRate}%`} icon="activity" />
            </View>

            {/* ⭐ MINI TENDÊNCIA */}
            <TrendingSparkline events={eventsList} />

            {/* ⭐ RANKING DE EVENTOS */}
            <TopEventsList events={eventsList} />

            {/* ⭐ STATUS DO SISTEMA */}
            <SystemStatus events={eventsList} />

            {/* ⭐ DONUT GLOBAL */}
            <View style={[styles.card, { marginTop: 20 }]}>
              {loading ? (
                <View style={styles.placeholderContainer}>
                  <ActivityIndicator size="large" color="#6D28D9" />
                </View>
              ) : (
                <DonutChart issued={totalIssued} used={totalUsed} />
              )}
            </View>
          </View>
        )}

        {/* ================================================= */}
        {/*                VISÃO POR EVENTO                  */}
        {/* ================================================= */}
        {tab === 'evento' && selectedEvent && (
          <View style={styles.container}>
            <EventSelect
              events={eventsList}
              selectedId={selectedEventId}
              onChange={(id: number) => setSelectedEventId(id)}
            />

            <Text style={styles.title}>{selectedEvent.event_name}</Text>

            {/* ⭐ KPIs MODERNOS */}
            <View style={styles.kpiRow}>
              <KpiCard label="Emitidos" value={selectedEvent.tickets_issued} icon="tag" />

              <KpiCard label="Usados" value={selectedEvent.tickets_used} icon="check-circle" />

              <KpiCard
                label="Check-ins"
                value={checkins?.unique_tickets_scanned || 0}
                icon="user-check"
              />
            </View>

            {/* ⭐ GRAFICO TIMELINE CHECK-INS */}
            <View style={styles.card}>
              {loading ? (
                <View style={styles.placeholderContainer}>
                  <ActivityIndicator size="large" color="#6D28D9" />
                  <Text style={styles.placeholderText}>Carregando dados...</Text>
                </View>
              ) : timeline.length === 0 ? (
                <View style={styles.placeholderContainer}>
                  <Text style={styles.placeholderText}>Nenhum check-in registrado ainda</Text>
                </View>
              ) : (
                <CheckinsTimelineChart timeline={timeline} />
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
