import { styles } from '@/app/styles/dashboard.style';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function DashboardTabs({
  onChange,
}: {
  onChange: (tab: 'geral' | 'evento') => void;
}) {
  const [active, setActive] = useState<'geral' | 'evento'>('geral');

  function change(tab: 'geral' | 'evento') {
    setActive(tab);
    onChange(tab);
  }

  return (
    <View style={styles.tabsContainer}>
      {/* Aba 1 — Visão Geral */}
      <Pressable
        style={[styles.tab, active === 'geral' && styles.tabActive]}
        onPress={() => change('geral')}
      >
        <Text style={[styles.tabText, { opacity: active === 'geral' ? 1 : 0.6 }]}>Visão Geral</Text>
      </Pressable>

      {/* Aba 2 — Por Evento */}
      <Pressable
        style={[styles.tab, active === 'evento' && styles.tabActive]}
        onPress={() => change('evento')}
      >
        <Text style={[styles.tabText, { opacity: active === 'evento' ? 1 : 0.6 }]}>Por Evento</Text>
      </Pressable>
    </View>
  );
}
