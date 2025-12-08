import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

interface TimelinePoint {
  dia: string;
  scans: number;
}

interface Props {
  timeline: TimelinePoint[];
}

export default function CheckinsTimelineChart({ timeline }: Props) {
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: timeline.map((t) => t.dia.substring(5)),
      axisLabel: { color: '#555', rotate: 45 },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#555' },
    },
    series: [
      {
        data: timeline.map((t) => t.scans),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        areaStyle: {
          color: 'rgba(79,70,229,0.25)',
        },
        lineStyle: {
          width: 4,
          color: '#4F46E5',
        },
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
    </html>
  `;

  return (
    <View style={{ height: 300 }}>
      <WebView originWhitelist={['*']} source={{ html }} javaScriptEnabled domStorageEnabled />
    </View>
  );
}
