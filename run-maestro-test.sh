#!/bin/bash
# Script para executar testes do Maestro com limpeza prévia

echo "🧹 Matando processos antigos do Maestro..."
pkill -9 -f "maestro.cli.AppKt" 2>/dev/null || true

echo "🧹 Limpando port forwards do ADB..."
adb forward --remove-all

echo "🔄 Reiniciando ADB server..."
adb kill-server
sleep 1
adb start-server
sleep 2

echo "📱 Verificando dispositivos..."
adb devices

echo "🎯 Executando testes do Maestro..."
cd /home/rafael/Documents/Projects/ApaeEventos_frontend
maestro test "$@"
