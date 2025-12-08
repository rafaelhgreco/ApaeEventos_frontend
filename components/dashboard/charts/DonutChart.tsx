import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

interface DonutChartProps {
  issued: number;
  used: number;
}

export default function DonutChart({ issued, used }: DonutChartProps) {
  const percent =
    issued > 0 && used <= issued ? Math.round((used / issued) * 100) : 0;

  const option = {
    tooltip: { trigger: 'item' },
    color: ['#4F46E5', '#E5E5FF'],
    series: [
      {
        name: 'Ingresso',
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          fontSize: 26,
          fontWeight: 'bold',
          formatter: `${percent}%`,
          color: '#4F46E5',
        },
        data: [
          { value: used, name: 'Usados' },
          { value: Math.max(issued - used, 0), name: 'Restantes' },
        ],
      },
    ],
  };

  const html = `
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="margin:0;padding:0;overflow:hidden;">
        <div id="chart" style="width:100%;height:100%;"></div>
        <script>
          var chart = echarts.init(document.getElementById('chart'));
          chart.setOption(${JSON.stringify(option)});
        </script>
      </body>
    </html>`;

  return (
    <View style={{ height: 260 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}
