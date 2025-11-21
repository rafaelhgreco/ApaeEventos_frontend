// app/_layout.tsx
// eslint-disable-next-line import/no-unresolved
import { STRIPE_PUBLISHABLE_KEY } from '@env';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authEvents } from '@/lib/authEvents';
import { getUserName } from '@/lib/cognito';

/* --------------------------------------------------------
    SAUDAÇÃO DINÂMICA
-------------------------------------------------------- */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function RootLayout() {
  const [userName, setUserName] = useState<string | null>(null);

  const router = useRouter();
  const segments = useSegments();
  const canGoBack = segments.length > 1;

  /* --------------------------------------------------------
      CARREGAR NOME E ATUALIZAR AUTOMATICAMENTE
  -------------------------------------------------------- */
  useEffect(() => {
    const load = async () => {
      const name = await getUserName();
      setUserName(name);
    };

    load();

    // atualiza nome no header quando troca de usuário
    const sub = authEvents.addListener(load);
    return () => sub.remove();
  }, []);

  /* --------------------------------------------------------
      LAYOUT
  -------------------------------------------------------- */
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerTitle: '',
            headerShadowVisible: false,

            // Header custom em SafeAreaView para respeitar notch
            header: () => (
              <SafeAreaView edges={['top']} style={styles.header}>
                {/* BOTÃO DE VOLTAR */}
                {canGoBack ? (
                  <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ChevronLeft size={28} color="#1f2937" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.backButtonInvisible} />
                )}

                {/* TEXTO: Saudação + Nome */}
                <Text style={styles.greeting}>{getGreeting()}</Text>
                <Text style={styles.name}>{userName || 'Carregando...'}</Text>
              </SafeAreaView>
            ),
          }}
        >
          {/* Telas principais */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <StatusBar style="dark" />
      </ThemeProvider>
    </StripeProvider>
  );
}

/* --------------------------------------------------------
    STYLES
-------------------------------------------------------- */
const styles = StyleSheet.create({
  header: {
    height: 85,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  backButton: {
    padding: 4,
    marginRight: 4,
  },

  // mantém alinhamento perfeito mesmo sem botão de voltar
  backButtonInvisible: {
    width: 36,
  },

  greeting: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    textTransform: 'capitalize',
  },
});
