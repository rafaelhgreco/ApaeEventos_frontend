#!/bin/bash
# Script para executar testes do Maestro com limpeza prévia

# Garante que o script rode a partir da pasta do projeto (onde o script está)
cd "$(dirname "$0")"

echo "🧹 Matando processos antigos do Maestro..."
# Mata o processo específico e qualquer java rodando maestro
pkill -9 -f "maestro.cli.AppKt" 2>/dev/null || true

echo "🧹 Limpando port forwards do ADB..."
adb forward --remove-all

echo "🔄 Reiniciando ADB server..."
adb kill-server
sleep 2
adb start-server

echo "⏳ Aguardando dispositivo conectar..."
# Esta linha é CRUCIAL: espera o emulador estar realmente pronto
adb wait-for-device

echo "📱 Verificando dispositivos..."
adb devices

echo "🎯 Executando testes do Maestro..."
# "$@" repassa os argumentos (ex: o nome do arquivo .yaml)
maestro test "$@"
