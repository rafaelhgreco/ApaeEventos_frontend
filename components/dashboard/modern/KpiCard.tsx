import { styles, themeColors } from '@/src/styles/dashboard.style';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: keyof typeof Feather.glyphMap;
}

export default function KpiCard({ label, value, icon }: KpiCardProps) {
  return (
    <View style={styles.kpiCard}>
      <Feather name={icon} size={22} color={themeColors.accent} />
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
    </View>
  );
}
