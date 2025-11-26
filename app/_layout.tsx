// app/_layout.tsx
// eslint-disable-next-line import/no-unresolved
import { STRIPE_PUBLISHABLE_KEY } from '@env';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { authEvents } from '@/lib/authEvents';
import { getUserName } from '@/lib/cognito';

import { useAuth } from '@/hooks/use-auth';

// 🔥 Chatbot imports
import ChatbotButton from '@/components/chatbot/ChatbotButton';
import { useChatbot } from '@/hooks/useChatbot';

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
  const canGoBack = router.canGoBack();

  const pathname = usePathname();
  const { controller } = useAuth();

  // 👉 Hook global do Chatbot
  const chatbot = useChatbot();

  const isAuthRoute = pathname === '/' || pathname === '/login';

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
              <SafeAreaView edges={['top']} style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                  {canGoBack ? (
                    <TouchableOpacity
                      style={styles.backButtonModern}
                      onPress={() => router.back()}
                      activeOpacity={0.75}
                    >
                      <ChevronLeft size={22} color="#111" strokeWidth={3} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.backButtonPlaceholder} />
                  )}

                  {!isAuthRoute && (
                    <View style={styles.textBlock}>
                      <Text style={styles.greeting}>{getGreeting()}</Text>
                      <Text style={styles.userName}>{userName || 'Carregando...'}</Text>
                    </View>
                  )}
                </View>

                {!isAuthRoute && (
                  <TouchableOpacity
                    onPress={controller.handleLogout}
                    style={styles.logoutButtonModern}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.logoutText}>Sair</Text>
                  </TouchableOpacity>
                )}
              </SafeAreaView>
            ),
          }}
        >
          {/* Telas principais */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        {/* 💬 Botão global do Chatbot */}
        {pathname !== '/' && pathname !== '/login' && <ChatbotButton />}

        <StatusBar style="dark" />
      </ThemeProvider>
    </StripeProvider>
  );
}

/* --------------------------------------------------------
    STYLES
-------------------------------------------------------- */
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // sombra bem elegante e suave — classe premium
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  backButtonModern: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  backButtonPlaceholder: {
    width: 42,
    height: 42,
  },

  textBlock: {
    flexDirection: 'column',
  },

  greeting: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: -2,
    fontWeight: '500',
  },

  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    textTransform: 'capitalize',
  },

  logoutButtonModern: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
