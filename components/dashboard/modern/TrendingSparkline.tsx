import { styles } from '@/src/styles/dashboard.style';
import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface EventSummary {
  tickets_issued: number;
}

interface TrendingSparklineProps {
  events: EventSummary[];
}

export default function TrendingSparkline({ events }: TrendingSparklineProps) {
  if (!events || events.length === 0) return null;

  const data = events.map((e) => Number(e.tickets_issued));

  const option = {
    xAxis: { type: 'category', show: false, data: data.map((_, i) => i + 1) },
    yAxis: { show: false },
    series: [
      {
        data,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#6366F1', width: 3 },
        areaStyle: { color: 'rgba(99,102,241,0.25)' },
      },
    ],
  };

  const html = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
        <style>body{margin:0;padding:0}</style>
      </head>
      <body>
        <div id="c" style="height:120px;width:100%"></div>
        <script>
          const chart = echarts.init(document.getElementById('c'));
          chart.setOption(${JSON.stringify(option)});
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Tendência de Emissão</Text>
      <WebView
        originWhitelist={['*']}
        style={{ height: 120 }}
        scrollEnabled={false}
        source={{ html }}
      />
    </View>
  );
}
