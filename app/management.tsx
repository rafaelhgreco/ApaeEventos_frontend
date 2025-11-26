import { QuickActionCard } from '@/components/ATOMIC/molecules/quick_action_card';
import { EventCarouselCard } from '@/components/cards/event_carousel_card';
import { useEvents } from '@/hooks/useEvents';
import { getIdToken } from '@/lib/cognito';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { BarChart3, CalendarPlus, QrCode, UserPlus } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles/management.style';

export default function ManagementScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { events, fetchEvents, loading, error } = useEvents();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const token = await getIdToken();
          await fetchEvents(token);
        } catch (e) {
          console.log('Erro ao carregar eventos:', e);
        }
      };

      load();
    }, [fetchEvents]),
  );

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        bounciness: 6,
        speed: 1.2,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // -------------------------------------------------------------
  // 🔥 FILTRAR SÓ EVENTOS FUTUROS (INCLUINDO HOJE) + ORDENAR
  // -------------------------------------------------------------
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = [...events]
    .filter((ev) => {
      if (!ev.data) return false;
      const evDate = new Date(ev.data + 'T00:00:00');
      return evDate.getTime() >= today.getTime();
    })
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  // Próximo evento
  const nextEvent = upcomingEvents[0];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <ScrollView
            contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
          >
            {/* HEADER */}
            <View>
              <Text style={styles.headerTitle}>Gerenciamento</Text>
              <Text style={styles.headerSubtitle}>Painel Administrativo</Text>
            </View>

            {/* AÇÕES RÁPIDAS */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ações Rápidas</Text>

              <View style={styles.quickActionsGrid}>
                <QuickActionCard
                  label="Cadastrar"
                  icon={CalendarPlus}
                  color="#2980b9"
                  onPress={() => router.push('/new_event')}
                />
                <QuickActionCard
                  label="Validar"
                  icon={QrCode}
                  color="#27ae60"
                  onPress={() => router.push('/qrcode')}
                />
                <QuickActionCard
                  label="Dashboard"
                  icon={BarChart3}
                  color="#8e44ad"
                  onPress={() => router.push('/dashboard')}
                />
                <QuickActionCard
                  label="Registrar"
                  icon={UserPlus}
                  color="#c0392b"
                  onPress={() => router.push('/admin_register')}
                />
              </View>
            </View>

            {/* CARROSSEL */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Próximos Eventos</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carousel}
              >
                {loading && <Text style={{ padding: 10 }}>Carregando...</Text>}
                {error && <Text style={{ color: 'red', padding: 10 }}>{error}</Text>}
                {!loading && upcomingEvents.length === 0 && (
                  <Text style={{ padding: 10 }}>Nenhum evento futuro encontrado</Text>
                )}

                {upcomingEvents.map((ev) => (
                  <EventCarouselCard key={ev.id} event={ev} highlight={ev.id === nextEvent?.id} />
                ))}
              </ScrollView>

              {/* VER TODOS */}
              <TouchableOpacity
                style={{
                  marginTop: 16,
                  paddingVertical: 12,
                  backgroundColor: '#0ea5e9',
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onPress={() => router.push('/list_all_events')}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                  Ver todos os eventos
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
